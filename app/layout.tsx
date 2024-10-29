import type { Metadata } from "next";
import "./globals.css";
import UIProvider from "@/componets/UIProvider";


export const metadata: Metadata = {
  title: "Zen: Pomodoro",
  description: "Pomodoro App, simple.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className="w-screen min-h-screen h-screen flex flex-col overflow-hidden">
          <UIProvider>
            {children}
          </UIProvider>
        </body>
    </html>
  );
}
