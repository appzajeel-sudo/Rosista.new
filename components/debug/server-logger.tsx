"use client";

import { useEffect } from "react";
import { useDebug } from "@/context/DebugContext";

interface ServerLoggerProps {
  source: string;
  data: any;
  type?: "server" | "client" | "auth";
}

export function ServerLogger({ source, data, type = "server" }: ServerLoggerProps) {
  const { addLog } = useDebug();

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      addLog(source, data, type);
    }
  }, [source, data, type, addLog]);

  return null;
}
