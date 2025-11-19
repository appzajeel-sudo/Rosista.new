"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface LogEntry {
  id: string;
  timestamp: number;
  source: string;
  data: any;
  type: "server" | "client" | "auth";
}

interface DebugContextType {
  logs: LogEntry[];
  addLog: (source: string, data: any, type?: "server" | "client" | "auth") => void;
  clearLogs: () => void;
  isOpen: boolean;
  togglePanel: () => void;
}

const DebugContext = createContext<DebugContextType | undefined>(undefined);

export function DebugProvider({ children }: { children: ReactNode }) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addLog = useCallback((source: string, data: any, type: "server" | "client" | "auth" = "server") => {
    // Prevent duplicate logs for the same source/data within a short timeframe (simple dedup)
    setLogs((prev) => {
      const lastLog = prev[0];
      if (
        lastLog &&
        lastLog.source === source &&
        JSON.stringify(lastLog.data) === JSON.stringify(data)
      ) {
        return prev;
      }

      const newLog: LogEntry = {
        id: Math.random().toString(36).substring(7),
        timestamp: Date.now(),
        source,
        data,
        type,
      };
      return [newLog, ...prev].slice(0, 50); // Keep last 50 logs
    });
  }, []);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  const togglePanel = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <DebugContext.Provider value={{ logs, addLog, clearLogs, isOpen, togglePanel }}>
      {children}
    </DebugContext.Provider>
  );
}

export function useDebug() {
  const context = useContext(DebugContext);
  if (context === undefined) {
    throw new Error("useDebug must be used within a DebugProvider");
  }
  return context;
}
