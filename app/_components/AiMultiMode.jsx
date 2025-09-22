// "use client";
// import { useContext, useState } from "react";
// import ModelList from "@/shared/ModelList";
// import Image from "next/image";
// import { Loader, Lock, UserRound } from "lucide-react";

// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch";
// import { Button } from "@/components/ui/button";
// import { AiSelectedModelContext } from "@/context/AiSelectedModelContext";
// import { useUser } from "@clerk/nextjs";
// import { doc, updateDoc } from "firebase/firestore";
// import { db } from "@/config/FirebaseConfig";

// const logos = {
//   GPT: "/gpt.png",
//   Gemini: "/gemini.png",
//   DeepSeek: "/deepseek.png",
//   Grok: "/grok.png",
//   Llama: "/llama.png",
//   Cohere: "/cohere.png",
//   Mistral: "/mistral.png",
// };

// export default function AiMultiModel() {
//   const { user } = useUser();
//   const [aiModelList, setAiModelList] = useState(ModelList);
//   const { aiSelectedModels, setAiSelectedModels, messages, setMessages } =
//     useContext(AiSelectedModelContext);

//   const onToggelChange = (model, value) => {
//     setAiModelList((prev) =>
//       prev.map((m) => (m.model === model ? { ...m, enable: value } : m))
//     );
//   };

//   const onSelectedValue = async (parentModel, value) => {
//     setAiSelectedModels((prev) => ({
//       ...prev,
//       [parentModel]: {
//         modelId: value,
//       },
//     }));

//     // Update User Prefrence to Database;
//     const docRef = doc(db, "users", user?.primaryEmailAddress?.emailAddress);
//     await updateDoc(docRef, {
//       selectedModelPref: aiSelectedModels,
//     });
//   };

//   return (
//     <div className=" flex flex-1 h-[70vh] border-b">
//       {aiModelList.map((model, index) => (
//         <div
//           key={model.model}
//           className={`flex flex-col border-r h-full overflow-auto ${
//             model.enable ? "flex-1 min-w-[400px]" : "min-w-[100px]"
//           }`}
//         >
//           <div
//             key={model.model || index}
//             className="flex p-4 border-b w-full h-[70px] items-center justify-between"
//           >
//             <div className="flex items-center gap-4">
//               <Image
//                 src={model.icon}
//                 alt={model.model}
//                 width={24}
//                 height={24}
//               />

//               {model.enable && (
//                 <Select
//                   defaultValue={aiSelectedModels[model.model].modelId}
//                   onValueChange={(value) => onSelectedValue(model.model, value)}
//                   disabled={model.premium}
//                 >
//                   <SelectTrigger className="w-[180px]">
//                     <SelectValue
//                       placeholder={aiSelectedModels[model.model].modelId}
//                     />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectGroup>
//                       <SelectLabel>Free</SelectLabel>
//                       {model.subModel.map(
//                         (subModel, index) =>
//                           subModel.premium == false && (
//                             <SelectItem key={subModel.id} value={subModel.id}>
//                               {subModel.name}
//                             </SelectItem>
//                           )
//                       )}
//                     </SelectGroup>
//                     <SelectGroup>
//                       <SelectLabel>Premium</SelectLabel>
//                       {model.subModel.map(
//                         (subModel, index) =>
//                           subModel.premium == true && (
//                             <SelectItem
//                               key={index}
//                               value={subModel.name}
//                               disabled={subModel.premium}
//                             >
//                               {subModel.name}{" "}
//                               {subModel.premium && <Lock className="h-4 w-4" />}
//                             </SelectItem>
//                           )
//                       )}
//                     </SelectGroup>
//                   </SelectContent>
//                 </Select>
//               )}
//             </div>
//             <div>
//               <Switch
//                 checked={model.enable}
//                 onCheckedChange={(v) => onToggelChange(model.model, v)}
//               />
//             </div>
//           </div>

//           {model.premium && model.enable && (
//             <div className=" flex items-center justify-center h-full">
//               <Button>
//                 Upgrade to Unlock <Lock />
//               </Button>
//             </div>
//           )}

//           {model.enable && (
//             <div className="flex-1 p-4">
//               <div className=" flex-1 p-4 space-y-2">
//                 {messages[model.model]?.map((m, i) => (
//                   <div
//                     key={m.id || i}
//                     className={`p-2 ${
//                       m.role == "user"
//                         ? "bg-black/80 backdrop-blur-md border border-white/10 shadow-md text-white"
//                         : ""
//                     }`}
//                   >
//                     {m.role == "assistant" && (
//                       <Image
//                         src={logos[m.model] || logos[model.model]}
//                         alt={logos[m.model] || logos[model.model]}
//                         width={20}
//                         height={20}
//                         className="rounded-full"
//                       />
//                     )}
//                     <div className=" flex gap-3 items-center">
//                       {m.content == "loading" && (
//                         <>
//                           <Loader className="animate-spin" />
//                           <span>Thinking...</span>
//                         </>
//                       )}
//                       {m.content !== "loading" && (
//                         <h2 className=" flex items-center gap-2">
//                           {m.role == "user" ? (
//                             <UserRound
//                               className="bg-white rounded-full p-2 text-black"
//                               size={30}
//                             />
//                           ) : (
//                             ""
//                           )}{" "}
//                           {m.content}
//                         </h2>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

"use client";
import { useContext, useState, useEffect } from "react";
import ModelList from "@/shared/ModelList";
import Image from "next/image";
import { Loader, Lock, UserRound } from "lucide-react";

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
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Logos map
const logos = {
  GPT: "/gpt.png",
  Gemini: "/gemini.png",
  DeepSeek: "/deepseek.png",
  Grok: "/grok.png",
  Llama: "/llama.png",
  Cohere: "/cohere.png",
  Mistral: "/mistral.png",
};

// TypingText component for typewriter effect
function TypingText({ text, speed = 20 }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    setDisplayedText("");
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayedText}</span>;
}

export default function AiMultiModel() {
  const { user } = useUser();
  const [aiModelList, setAiModelList] = useState(ModelList);
  const { aiSelectedModels, setAiSelectedModels, messages, setMessages } =
    useContext(AiSelectedModelContext);

  const onToggelChange = (model, value) => {
    setAiModelList((prev) =>
      prev.map((m) => (m.model === model ? { ...m, enable: value } : m))
    );

    setAiSelectedModels((prev) => ({
      ...prev,
      [model]: {
        ...(prev?.[model] ?? {}),
        enable: value,
      },
    }));
  };

  const onSelectedValue = async (parentModel, value) => {
    setAiSelectedModels((prev) => ({
      ...prev,
      [parentModel]: {
        modelId: value,
      },
    }));

    // Update User Preference to Database
    const docRef = doc(db, "users", user?.primaryEmailAddress?.emailAddress);
    await updateDoc(docRef, {
      selectedModelPref: aiSelectedModels,
    });
  };

  return (
    <div className="flex flex-1 h-[70vh] border-b">
      {aiModelList.map((model) => (
        <div
          key={model.model}
          className={`flex flex-col border-r h-full overflow-auto ${
            model.enable ? "flex-1 min-w-[400px]" : "min-w-[100px]"
          }`}
        >
          <div className="flex p-4 border-b w-full h-[70px] items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src={model.icon}
                alt={model.model}
                width={24}
                height={24}
              />

              {model.enable && (
                <Select
                  defaultValue={aiSelectedModels[model.model]?.modelId}
                  onValueChange={(value) => onSelectedValue(model.model, value)}
                  disabled={model.premium}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue
                      placeholder={aiSelectedModels[model.model]?.modelId}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Free</SelectLabel>
                      {model.subModel.map(
                        (subModel) =>
                          !subModel.premium && (
                            <SelectItem key={subModel.id} value={subModel.id}>
                              {subModel.name}
                            </SelectItem>
                          )
                      )}
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Premium</SelectLabel>
                      {model.subModel.map(
                        (subModel, index) =>
                          subModel.premium && (
                            <SelectItem
                              key={index}
                              value={subModel.name}
                              disabled={subModel.premium}
                            >
                              {subModel.name} <Lock className="h-4 w-4" />
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
            <div className="flex items-center justify-center h-full">
              <Button>
                Upgrade to Unlock <Lock />
              </Button>
            </div>
          )}

          {model.enable && (
            <div className="flex-1 p-4">
              <div className="flex-1 p-4 space-y-2">
                {messages[model.model]?.map((m, i) => (
                  <div
                    key={m.id || i}
                    className={`p-2 ${
                      m.role === "user"
                        ? "bg-black/80 backdrop-blur-md border border-white/10 shadow-md text-white"
                        : ""
                    }`}
                  >
                    {m.role === "assistant" && (
                      <div className="flex items-center gap-2 mb-1">
                        <Image
                          src={logos[m.model] || logos[model.model]}
                          alt={m.model ?? model.model}
                          width={20}
                          height={20}
                          className="rounded-full"
                        />
                        <span className="text-sm text-gray-400">
                          {m.model ?? model.model}
                        </span>
                      </div>
                    )}
                    <div className="flex gap-3 items-center">
                      {m.content === "loading" && (
                        <>
                          <Loader className="animate-spin" />
                          <span>Thinking...</span>
                        </>
                      )}
                      {m.content !== "loading" && (
                        <div className="flex items-center gap-2">
                          {m.role === "user" && (
                            <UserRound
                              className="bg-white rounded-full p-2 text-black"
                              size={30}
                            />
                          )}
                          {m.role === "assistant" ? (
                            <TypingText text={m.content} speed={20} />
                          ) : (
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {m.content}
                            </ReactMarkdown>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
