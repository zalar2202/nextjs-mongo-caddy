"use client";

import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

type SocketCtx = { socket: Socket | null; connected: boolean };

const SocketContext = createContext<SocketCtx>({ socket: null, connected: false });

export function SocketProvider({ children }: { children: React.ReactNode }) {
  console.log('🔥 SOCKET PROVIDER VERSION: 2024-11-26-15:04 - SOCKET DISABLED (NULL) 🔥');

  // Temporarily disable socket.io to prevent crashes
  // Return null socket to skip all socket-related code
  const value = useMemo<SocketCtx>(() => ({ socket: null, connected: false }), []);

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}

// HOOK
export function useSocket() {
  return useContext(SocketContext);
}

// DEFAULT EXPORT (so adapters using `default` keep working)
export default SocketProvider;
