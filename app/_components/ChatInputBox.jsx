"use client";

import { Mic, Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import AiMultiModel from "./AiMultiMode";
import { useContext, useEffect, useState } from "react";
import { AiSelectedModelContext } from "@/context/AiSelectedModelContext";
import axios from "axios";

export default function ChatInputBox() {
  const [userInput, setUserInput] = useState();
  const { aiSelectedModels, setAiSelectedModels, messages, setMessages } =
    useContext(AiSelectedModelContext);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    setMessages((prev) => {
      const updated = { ...prev };
      Object.keys(aiSelectedModels).forEach((modelKey) => {
        if (aiSelectedModels[modelKey].enable) {
          updated[modelKey] = [
            ...(updated[modelKey] ?? []),
            { role: "user", content: userInput },
          ];
        }
      });

      return updated;
    });

    const currentInput = userInput;
    setUserInput("");

    // Fetch response from each model
    Object.entries(aiSelectedModels).forEach(
      async ([parentModel, modelInfo]) => {
        if (!modelInfo.modelId || aiSelectedModels[parentModel].enable == false)
          return;

        setMessages((prev) => ({
          ...prev,
          [parentModel]: [
            ...(prev[parentModel] ?? []),
            {
              role: "assistant",
              content: "Thinking...",
              model: parentModel,
              loading: true,
            },
          ],
        }));

        try {
          const result = await axios.post("/api/ai-models", {
            model: modelInfo.modelId,
            msg: [{ role: "user", content: currentInput }],
            parentModel,
          });

          const { aiResponse, model } = result.data;

          setMessages((prev) => {
            const updated = [...(prev[parentModel] ?? [])];
            const loadingIndex = updated.findIndex((m) => m.loading);

            if (loadingIndex !== -1) {
              updated[loadingIndex] = {
                role: "assistant",
                content: aiResponse,
                model,
                loading: false,
              };
            } else {
              updated.push({
                role: "assistant",
                content: aiResponse,
                model,
                loading: false,
              });
            }

            return { ...prev, [parentModel]: updated };
          });
        } catch (err) {
          console.log(err);
          setMessages((prev) => ({
            ...prev,
            [parentModel]: [
              ...(prev[parentModel] ?? []),
              { role: "assistant", content: "Error Fetching response" },
            ],
          }));
        }
      }
    );
  };

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  return (
    <div className=" relative min-h-[80vh]">
      <div>
        <AiMultiModel />
      </div>
      <div className=" fixed bottom-0 flex left-0 w-full justify-center px-4 pb-4">
        <div className="w-full border rounded-xl shadow-md max-w-2xl p-4">
          <input
            type="text"
            placeholder="Ask anything..."
            className=" border-0 outline-none w-full"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
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
                onClick={handleSend}
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
