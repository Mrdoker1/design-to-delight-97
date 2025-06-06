"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AudioPlayerProps {
  className?: string;
}

export const AudioPlayer = React.forwardRef<HTMLDivElement, AudioPlayerProps>(
  ({ className, ...props }, ref) => {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [progress, setProgress] = React.useState(0);

    const togglePlay = () => {
      setIsPlaying(!isPlaying);
    };

    return (
      <div ref={ref} className={cn("flex flex-col items-start gap-2 self-stretch relative", className)} {...props}>
        <div className="text-[#6D7783] text-sm font-bold leading-[21px] relative">
          Audio Example
        </div>
        <div className="flex items-center gap-4 self-stretch border relative bg-white px-4 py-2.5 rounded-lg border-solid border-[#C8CACB]">
          <button onClick={togglePlay} className="flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="play-icon"
              style={{ width: "24px", height: "24px", position: "relative" }}
            >
              <path
                d="M19.3222 10.7089C20.2259 11.3231 20.2259 12.6769 19.3222 13.2912L7.36656 19.7368C6.35498 20.4243 5 19.685 5 18.4456V5.55438C5 4.31499 6.35498 3.57574 7.36656 4.26323L19.3222 10.7089Z"
                fill="#666E7E"
              />
            </svg>
          </button>
          <div className="flex-1 relative">
            <div
              className="h-[6px] rounded-[60px] bg-[#E9EAEA] relative"
              style={{ width: "100%" }}
            >
              <div
                className="h-full bg-[#116EEE] rounded-[60px] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

AudioPlayer.displayName = "AudioPlayer"; 