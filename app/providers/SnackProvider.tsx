"use client";
import React from "react";
import { SnackbarProvider } from "notistack"; // adjust if you use another lib

// This component provides a notification/snackbar context to the app
export function SnackProvider({ children }: { children: React.ReactNode }) {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      autoHideDuration={4000}
    >
      {children}
    </SnackbarProvider>
  );
}

// Default export so adapters can `import Mod from '@/providers/SnackProvider'`
export default SnackProvider;
