"use client";
import React from "react";
import { SnackbarProvider } from "notistack"; // or your own
export function SnackProvider({ children }: { children: React.ReactNode }) {
  return <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>;
}
export default SnackProvider;
