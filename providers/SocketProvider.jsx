'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
    console.log('🔥 SOCKET PROVIDER VERSION: 2024-11-26-14:55 - SOCKET DISABLED (NULL) 🔥');
    // Temporarily disable socket.io to prevent crashes
    // Return null so all socket checks will skip execution
    return (
        <SocketContext.Provider value={null}>
            {children}
        </SocketContext.Provider>
    );
}

export const useSocket = () => {
    const socket = useContext(SocketContext);
    return socket;
};

