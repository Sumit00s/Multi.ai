"use client";
import { useContext, useState } from "react";
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
import { AiSelectedModelContext } from "@/context/AiSelectedModelContext";
import { useUser } from "@clerk/nextjs";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";

export default function AiMultiModel() {
  const { user } = useUser();
  const [aiModelList, setAiModelList] = useState(ModelList);
  const { aiSelectedModels, setAiSelectedModels } = useContext(
    AiSelectedModelContext
  );

  const onToggelChange = (model, value) => {
    setAiModelList((prev) =>
      prev.map((m) => (m.model === model ? { ...m, enable: value } : m))
    );
  };

  const onSelectedValue = async (parentModel, value) => {
    setAiSelectedModels((prev) => ({
      ...prev,
      [parentModel]: {
        modelId: value,
      },
    }));

    // Update User Prefrence to Database;
    const docRef = doc(db, "users", user?.primaryEmailAddress?.emailAddress);
    await updateDoc(docRef, {
      selectedModelPref: aiSelectedModels,
    });
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
                <Select
                  defaultValue={aiSelectedModels[model.model].modelId}
                  onValueChange={(value) => onSelectedValue(model.model, value)}
                  disabled={model.premium}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue
                      placeholder={aiSelectedModels[model.model].modelId}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Free</SelectLabel>
                      {model.subModel.map(
                        (subModel, index) =>
                          subModel.premium == false && (
                            <SelectItem key={index} value={subModel.id}>
                              {subModel.name}
                            </SelectItem>
                          )
                      )}
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Premium</SelectLabel>
                      {model.subModel.map(
                        (subModel, index) =>
                          subModel.premium == true && (
                            <SelectItem
                              key={index}
                              value={subModel.name}
                              disabled={subModel.premium}
                            >
                              {subModel.name}{" "}
                              {subModel.premium && <Lock className="h-4 w-4" />}
                            </SelectItem>
                          )
                      )}
                    </SelectGroup>
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
