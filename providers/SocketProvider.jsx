'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
    console.log('🔥 SOCKET PROVIDER VERSION: 2024-11-26-00:12 - MOCK SOCKET ENABLED 🔥');
    // Temporarily disable socket.io to prevent crashes
    // Return a mock socket object with no-op methods
    const mockSocket = {
        on: () => { },
        off: () => { },
        emit: () => { },
        connected: false,
        id: null
    };

    return (
        <SocketContext.Provider value={mockSocket}>
            {children}
        </SocketContext.Provider>
    );
}

export const useSocket = () => {
    const socket = useContext(SocketContext);
    return socket;
};

