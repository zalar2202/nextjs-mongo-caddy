'use client';
import React from 'react';
import * as Mod from '@/providers/SocketProvider';

const Passthrough = ({ children }) => <>{children}</>;

const Impl = (Mod && Mod.SocketProvider) || Passthrough;

export default function SocketProviderAdapter({ children }) {
  const Comp = Impl || Passthrough;
  return <Comp>{children}</Comp>;
}
