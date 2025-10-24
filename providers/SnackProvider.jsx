'use client';

import { SnackbarProvider } from 'notistack';

export function SnackProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
export default SnackProvider;
