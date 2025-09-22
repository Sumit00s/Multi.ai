"use client";
import { useState } from "react";
import ModelList from "@/shared/ModelList";
import Image from "next/image";
import { Lock } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function AiMultiModel() {
  const [aiModelList, setAiModelList] = useState(ModelList);

  const onToggelChange = (model, value) => {
    setAiModelList((prev) =>
      prev.map((m) => (m.model === model ? { ...m, enable: value } : m))
    );
  };

  return (
    <div className=" flex flex-1 h-[70vh] border-b">
      {aiModelList.map((model, index) => (
        <div
          className={`flex flex-col border-r h-full overflow-auto ${
            model.enable ? "flex-1 min-w-[400px]" : "min-w-[100px]"
          }`}
        >
          <div
            key={index}
            className="flex p-4 border-b w-full h-[70px] items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <Image
                src={model.icon}
                alt={model.model}
                width={24}
                height={24}
              />

              {model.enable && (
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={model.subModel[0].name} />
                  </SelectTrigger>
                  <SelectContent>
                    {model.subModel.map((subModel, index) => (
                      <SelectItem key={index} value={subModel.name}>
                        {subModel.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
            <div>
              <Switch
                checked={model.enable}
                onCheckedChange={(v) => onToggelChange(model.model, v)}
              />
            </div>
          </div>

          {model.premium && model.enable && (
            <div className=" flex items-center justify-center h-full">
              <Button>
                Upgrade to Unlock <Lock />
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
