import { Progress } from "@/components/ui/progress";

export default function CreditProgress() {
  return (
    <div className="p-3 border rounded-2xl flex flex-col gap-1">
      <h2 className=" font-bold">Free Plan</h2>
      <p className=" text-gray-400">0/5 message Used</p>
      <Progress value={33} />
    </div>
  );
}
