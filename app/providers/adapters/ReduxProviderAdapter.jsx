'use client';
import React from 'react';
import * as Mod from '@/providers/ReduxProvider';

const Passthrough = ({ children }) => <>{children}</>;

const Impl = (Mod && (Mod.default || Mod.ReduxProvider)) || Passthrough;

export default function ReduxProviderAdapter({ children }) {
  const Comp = Impl || Passthrough;
  return <Comp>{children}</Comp>;
}
