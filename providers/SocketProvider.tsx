"use client";

import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

type SocketCtx = { socket: Socket | null; connected: boolean };

const SocketContext = createContext<SocketCtx>({ socket: null, connected: false });

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  const value = useMemo<SocketCtx>(() => ({ socket: socketRef.current, connected }), [connected]);

  useEffect(() => {
    // IMPORTANT: must match server & nginx
    const s = io("/", {
      path: "/socket.io",
      transports: ["websocket", "polling"],
      withCredentials: true,
    });

    socketRef.current = s;
    const onConnect = () => setConnected(true);
    const onDisconnect = () => setConnected(false);

    s.on("connect", onConnect);
    s.on("disconnect", onDisconnect);
    s.on("hello", (msg) => {
      // handy to prove the channel is alive
      // console.log("hello:", msg);
    });

    return () => {
      s.off("connect", onConnect);
      s.off("disconnect", onDisconnect);
      s.close();
      socketRef.current = null;
    };
  }, []);

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}

// HOOK
export function useSocket() {
  return useContext(SocketContext);
}

// DEFAULT EXPORT (so adapters using `default` keep working)
export default SocketProvider;
