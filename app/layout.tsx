import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zen: Pomodoro",
  description: "Pomodoro App, simple.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const faviconEmoji = "🍵"; // Cambia este emoji según tus necesidades

  return (
    <html lang="en">
      <head>
        <title>{"Zen: Pomodoro"}</title>
        <meta name="description" content={"Pomodoro App, simple."} />
        <link
          rel="icon"
          href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 32 32%22><text y=%22.9em%22 font-size=%2224%22>${faviconEmoji}</text></svg>`}
        />
      </head>
      <body className="w-screen min-h-screen h-screen flex flex-col overflow-hidden">
        {children}
      </body>
    </html>
  );
}
