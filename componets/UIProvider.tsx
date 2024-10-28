import * as React from "react";

import {NextUIProvider} from "@nextui-org/react";
import { Toaster } from "sonner";

export default function UIProvider({children}: {
    children: React.ReactNode
}) {
  return (
    <NextUIProvider>
      <Toaster />
        {children}
    </NextUIProvider>
  );
}