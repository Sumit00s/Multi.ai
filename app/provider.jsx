"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./_components/AppSidebar";
import AppHeader from "./_components/AppHeader";
import { useUser } from "@clerk/nextjs";
import { db } from "@/config/FirebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { AiSelectedModelContext } from "@/context/AiSelectedModelContext";
import { DefaultModel } from "@/shared/AiModelsShared";
import { UserDetailContext } from "@/context/UserDetailContext";

export default function Provider({ children, ...props }) {
  const { user } = useUser();

  const [aiSelectedModels, setAiSelectedModels] = useState(DefaultModel);
  const [userDetail, setUserDetail] = useState();

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
      const userInfo = userSnap.data();
      setAiSelectedModels(userInfo?.selectedModelPref);
      setUserDetail(userInfo);
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
      setUserDetail(userData);
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
      <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
        <AiSelectedModelContext.Provider
          value={{ aiSelectedModels, setAiSelectedModels }}
        >
          <SidebarProvider>
            <AppSidebar />

            <div className="w-full">
              <AppHeader />
              {children}
            </div>
          </SidebarProvider>
        </AiSelectedModelContext.Provider>
      </UserDetailContext.Provider>
    </NextThemesProvider>
  );
}
