import { Mic, Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import AiMultiModel from "./AiMultiMode";

export default function ChatInputBox() {
  return (
    <div className=" relative min-h-screen">
      <div>
        <AiMultiModel />
      </div>
      <div className=" fixed bottom-0 flex left-0 w-full justify-center px-4 pb-4">
        <div className="w-full border rounded-xl shadow-md max-w-2xl p-4">
          <input
            type="text"
            placeholder="Ask anything..."
            className=" border-0 outline-none"
          />
          <div className="mt-3 flex justify-between items-center">
            <Button className=" cursor-pointer" variant={"ghost"} size={"icon"}>
              <Paperclip className="h-5 w-5" />
            </Button>
            <div className="flex gap-5">
              <Button
                className="cursor-pointer"
                variant={"ghost"}
                size={"icon"}
              >
                <Mic className="h-5 w-5" />
              </Button>
              <Button
                className="cursor-pointer hover:bg-[#155eef]"
                size={"icon"}
              >
                <Send className="h-5 w-5 " />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
