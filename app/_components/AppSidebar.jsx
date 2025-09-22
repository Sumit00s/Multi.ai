"use client";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { UserButton, UserProfile } from "@clerk/clerk-react";
import { SignInButton, useUser } from "@clerk/nextjs";
import { Ghost, Moon, Plus, Sun, Zap } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import CreditProgress from "./CreditProgress";

export default function AppSidebar() {
  const { theme, setTheme } = useTheme();
  const { user } = useUser();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-3">
          <div className=" flex justify-between items-center">
            <div className=" flex items-center justify-center gap-3">
              <Image
                src={"./logo.svg"}
                alt="logo"
                width={60}
                height={60}
                className="w-[40px] h-[40px]"
              />
              <h2 className="font-bold text-xl ml-[-5px]">Multi.ai</h2>
            </div>
            <div>
              {theme == "light" ? (
                <Button
                  variant={"ghost"}
                  className="cursor-pointer"
                  onClick={() => setTheme("dark")}
                >
                  <Sun />
                </Button>
              ) : (
                <Button
                  variant={"ghost"}
                  className="cursor-pointer"
                  onClick={() => setTheme("light")}
                >
                  <Moon />
                </Button>
              )}
            </div>
          </div>
          {user && (
            <Button className="mt-7 w-full cursor-pointer">
              <Plus /> New Chat
            </Button>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="px-3 ml-3">
        <SidebarGroup />
        <h2 className="font-bold text-lg">Chats</h2>
        {!user && (
          <p className="text-sm text-gray-300">
            Sing in to interact with multiple LLM's
          </p>
        )}
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <div className="p-3 mb-10">
          {!user ? (
            <SignInButton mode="modal">
              <Button className={"w-full cursor-pointer"} size="lg">
                Sign In
              </Button>
            </SignInButton>
          ) : (
            <div className="flex flex-col gap-5">
              <CreditProgress />
              <Button className={"w-full"}>
                <Zap /> Upgrade Plan
              </Button>
              <div className=" flex items-center justify-center gap-2">
                <UserButton />
                <p>{user.fullName}</p>
              </div>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
