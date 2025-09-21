"use client";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Ghost, Moon, Plus, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function AppSidebar() {
  const { theme, setTheme } = useTheme();
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
          <Button className="mt-7 w-full cursor-pointer">
            <Plus /> New Chat
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-3 ml-3">
        <SidebarGroup />
        <h2 className="font-bold text-lg">Chats</h2>
        <p className="text-sm text-gray-300">
          Sing in to interact with multiple LLM's
        </p>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <div className="p-3 mb-10">
          <Button className={"w-full cursor-pointer"} size="lg">
            Sign In
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
