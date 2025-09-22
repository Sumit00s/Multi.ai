import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function AppHeader() {
  return (
    <div className="p-3 w-full border-b shadow flex justify-between items-center">
      <SidebarTrigger />
    </div>
  );
}
