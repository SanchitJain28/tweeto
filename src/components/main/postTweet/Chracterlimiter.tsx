import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import React from "react";

export default function Chracterlimiter({
  isAiGenerating,
  characterLimit,
  onChange,
}: {
  isAiGenerating?: boolean;
  characterLimit: number;
  onChange: (value: number) => void;
}) {
  const getPlatformInfo = (limit: number) => {
    if (limit <= 280) return { platform: "Twitter/X", color: "text-blue-600" };
    if (limit <= 500) return { platform: "LinkedIn", color: "text-blue-700" };
    return { platform: "Custom", color: "text-purple-600" };
  };

  const platformInfo = getPlatformInfo(characterLimit);
  return (
    <div>
      <div className="space-y-3 p-4 bg-white/50 rounded-lg border border-purple-100">
        <div className="flex items-center justify-between">
          <Label
            htmlFor="character-limit"
            className="text-sm font-medium text-gray-700"
          >
            Character Limit
          </Label>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-800">
              {characterLimit}
            </span>
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full bg-white ${platformInfo.color}`}
            >
              {platformInfo.platform}
            </span>
          </div>
        </div>
        <Slider
          id="character-limit"
          min={100}
          max={600}
          step={10}
          value={[characterLimit]}
          onValueChange={(value) => onChange(value[0])}
          className="w-full"
          disabled={isAiGenerating}
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>100 (Short)</span>
          <span>280 (Twitter/X)</span>
          <span>500 (LinkedIn)</span>
          <span>600 (Long)</span>
        </div>
      </div>
    </div>
  );
}
