import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./_components/AppSidebar";

export default function Provider({ children, ...props }) {
  return (
    <NextThemesProvider
      {...props}
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <AppSidebar />
        <main>
          {" "}
          <SidebarTrigger /> {children}
        </main>
      </SidebarProvider>
    </NextThemesProvider>
  );
}
