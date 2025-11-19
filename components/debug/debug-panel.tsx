"use client";

import { useState } from "react";
import { useDebug, LogEntry } from "@/context/DebugContext";
import { Bug, X, Trash2, ChevronDown, ChevronRight, Database, Server, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function DebugPanel() {
  const { logs, isOpen, togglePanel, clearLogs } = useDebug();
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);

  // Only show in development mode
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={togglePanel}
        className="fixed bottom-4 right-4 z-[9999] flex h-12 w-12 items-center justify-center rounded-full bg-black text-white shadow-lg hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X size={20} /> : <Bug size={20} />}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 z-[9999] flex h-[600px] w-[800px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-950"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-blue-500" />
                <h3 className="font-bold text-sm">Data Inspector</h3>
                <span className="rounded-full bg-neutral-200 px-2 py-0.5 text-xs font-medium dark:bg-neutral-800">
                  {logs.length} logs
                </span>
              </div>
              <button
                onClick={clearLogs}
                className="rounded p-1 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                title="Clear logs"
              >
                <Trash2 size={16} />
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar - Log List */}
              <div className="w-1/3 overflow-y-auto border-r border-neutral-200 dark:border-neutral-800">
                {logs.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center p-4 text-center text-neutral-500">
                    <span className="text-xs">No data captured yet</span>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    {logs.map((log) => (
                      <button
                        key={log.id}
                        onClick={() => setSelectedLog(log)}
                        className={cn(
                          "flex flex-col gap-1 border-b border-neutral-100 px-4 py-3 text-left text-sm transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900",
                          selectedLog?.id === log.id &&
                            "bg-blue-50 dark:bg-blue-900/20"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold truncate">{log.source}</span>
                          <span className="text-[10px] text-neutral-400">
                            {new Date(log.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TypeIcon type={log.type} />
                          <span className="text-xs text-neutral-500 capitalize">
                            {log.type}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Main - JSON Viewer */}
              <div className="flex-1 overflow-y-auto bg-neutral-50 p-4 dark:bg-neutral-900/50">
                {selectedLog ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-lg">{selectedLog.source}</h4>
                      <span className="text-xs text-neutral-500">
                        ID: {selectedLog.id}
                      </span>
                    </div>
                    <div className="rounded-lg border border-neutral-200 bg-white p-4 font-mono text-xs dark:border-neutral-800 dark:bg-neutral-950">
                      <pre className="whitespace-pre-wrap break-all">
                        {JSON.stringify(selectedLog.data, null, 2)}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center text-neutral-500">
                    <p>Select a log entry to view details</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function TypeIcon({ type }: { type: string }) {
  switch (type) {
    case "server":
      return <Server size={12} className="text-purple-500" />;
    case "auth":
      return <User size={12} className="text-green-500" />;
    default:
      return <Database size={12} className="text-blue-500" />;
  }
}
