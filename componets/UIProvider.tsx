import {NextUIProvider} from "@nextui-org/react";
import { Toaster } from "sonner";
import {ThemeProvider as NextThemesProvider} from "next-themes";


export default function UIProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NextUIProvider className="w-full h-full">
      <NextThemesProvider attribute="class" defaultTheme="light">
      <Toaster />
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}