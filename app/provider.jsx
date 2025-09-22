"use client";

import React, { useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./_components/AppSidebar";
import AppHeader from "./_components/AppHeader";
import { useUser } from "@clerk/nextjs";
import { db } from "@/config/FirebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function Provider({ children, ...props }) {
  const { user } = useUser();

  useEffect(() => {
    if (user) CreateNewUser();
  }, [user]);

  // Check if user already exists
  const CreateNewUser = async () => {
    const userRefrence = doc(
      db,
      "users",
      user?.primaryEmailAddress?.emailAddress
    );

    const userSnap = await getDoc(userRefrence);

    if (userSnap.exists()) {
      console.log("Existing User");
      return;
    } else {
      const userData = {
        name: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
        remaningMsg: 5,
        createdAt: new Date(),
        credits: 1000,
        plan: "Free",
      };

      await setDoc(userRefrence, userData);
      console.log("New User Data Saved");
    }
  };

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

        <div className="w-full">
          <AppHeader />
          {children}
        </div>
      </SidebarProvider>
    </NextThemesProvider>
  );
}
