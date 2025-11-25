'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
    const [socket, setSocket] = useState(null);

    const dev = process.env.NODE_ENV !== 'production';

    useEffect(() => {
        let socketInstance;
        if (dev) {
            socketInstance = io('http://localhost:7007');
        } else {
            // Use current origin in production instead of undefined env variable
            socketInstance = io();
        }

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}

export const useSocket = () => {
    const socket = useContext(SocketContext);
    return socket;
};

