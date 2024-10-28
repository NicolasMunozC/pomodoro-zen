'use client'

import * as React from "react";

import {NextUIProvider} from "@nextui-org/react";
import { Toaster } from "sonner";
import {ThemeProvider as NextThemesProvider} from "next-themes";


export default function UIProvider({children}: {
    children: React.ReactNode
}) {
  return (
    <NextUIProvider>
      <Toaster />
      <NextThemesProvider attribute="class" defaultTheme="light">
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}