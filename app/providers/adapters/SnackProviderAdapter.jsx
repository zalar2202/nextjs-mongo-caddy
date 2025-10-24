'use client';
import React from 'react';
import * as Mod from '@/providers/SnackProvider';

const Passthrough = ({ children }) => <>{children}</>;

const Impl = (Mod && (Mod.default || Mod.SnackProvider)) || Passthrough;

export default function SnackProviderAdapter({ children }) {
  const Comp = Impl || Passthrough;
  return <Comp>{children}</Comp>;
}
