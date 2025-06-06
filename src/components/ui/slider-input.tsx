"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  showInfo?: boolean;
  className?: string;
}

export const SliderInput = React.forwardRef<HTMLDivElement, SliderInputProps>(
  ({ label, value, onChange, min = 0, max = 100, step = 1, showInfo = false, className, ...props }, ref) => {
    const percentage = ((value - min) / (max - min)) * 100;

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(Number(e.target.value));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.target.value);
      if (newValue >= min && newValue <= max) {
        onChange(newValue);
      }
    };

    return (
      <div ref={ref} className={cn("flex flex-col justify-center items-start gap-4 flex-1", className)} {...props}>
        <div className="flex justify-between items-center self-stretch relative">
          <div className="flex items-center gap-1 self-stretch relative">
            <div className="text-[#6D7783] text-right text-sm font-bold leading-[21px] relative">
              {label}
            </div>
            {showInfo && (
              <div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="info-icon"
                  style={{ width: "16px", height: "16px", position: "relative" }}
                >
                  <path
                    d="M8.00016 1.33398C4.32418 1.33398 1.3335 4.32468 1.3335 8.00065C1.3335 11.6766 4.32418 14.6673 8.00016 14.6673C11.6761 14.6673 14.6668 11.6766 14.6668 8.00065C14.6668 4.32468 11.6761 1.33398 8.00016 1.33398ZM8.00016 2.33398C11.1357 2.33398 13.6668 4.86511 13.6668 8.00065C13.6668 11.1362 11.1357 13.6673 8.00016 13.6673C4.86462 13.6673 2.3335 11.1362 2.3335 8.00065C2.3335 4.86511 4.86462 2.33398 8.00016 2.33398ZM8.00016 4.66732C7.82335 4.66732 7.65378 4.73756 7.52876 4.86258C7.40373 4.9876 7.3335 5.15717 7.3335 5.33398C7.3335 5.51079 7.40373 5.68036 7.52876 5.80539C7.65378 5.93041 7.82335 6.00065 8.00016 6.00065C8.17697 6.00065 8.34654 5.93041 8.47157 5.80539C8.59659 5.68036 8.66683 5.51079 8.66683 5.33398C8.66683 5.15717 8.59659 4.9876 8.47157 4.86258C8.34654 4.73756 8.17697 4.66732 8.00016 4.66732ZM7.99235 6.99349C7.85986 6.99556 7.7336 7.05013 7.64131 7.14523C7.54903 7.24032 7.49826 7.36815 7.50016 7.50065V11.1673C7.49923 11.2336 7.51147 11.2994 7.53617 11.3608C7.56088 11.4223 7.59756 11.4783 7.64408 11.5255C7.6906 11.5727 7.74604 11.6101 7.80717 11.6357C7.8683 11.6613 7.9339 11.6744 8.00016 11.6744C8.06642 11.6744 8.13203 11.6613 8.19316 11.6357C8.25428 11.6101 8.30972 11.5727 8.35624 11.5255C8.40276 11.4783 8.43944 11.4223 8.46415 11.3608C8.48886 11.2994 8.5011 11.2336 8.50016 11.1673V7.50065C8.50112 7.43373 8.48864 7.36729 8.46345 7.30529C8.43826 7.24328 8.40088 7.18696 8.35353 7.13966C8.30617 7.09237 8.2498 7.05506 8.18776 7.02995C8.12572 7.00484 8.05927 6.99244 7.99235 6.99349V6.99349Z"
                    fill="#116EEE"
                  />
                </svg>
              </div>
            )}
          </div>
          <div className="flex w-[65px] h-9 items-center gap-2 border relative px-2 py-2.5 rounded-lg border-solid border-[#DAE1EA]">
            <input
              type="number"
              value={value}
              onChange={handleInputChange}
              min={min}
              max={max}
              step={step}
              className="flex-1 overflow-hidden text-[#1E2D40] text-ellipsis text-base font-normal leading-6 relative gap-2 rounded-lg bg-transparent border-none outline-none"
            />
          </div>
        </div>
        <div className="flex h-1 items-center self-stretch relative bg-white rounded-lg">
          <div 
            className="self-stretch relative bg-[#116EEE] rounded-[4px_0px_0px_4px]" 
            style={{ width: `${percentage}%` }}
          />
          <div className="relative" style={{ marginLeft: '-8px' }}>
            <div
              className="w-4 h-4 bg-[#116EEE] border-[2px] border-white rounded-full shadow-lg cursor-pointer"
              style={{
                boxShadow: "0 2px 8px rgba(17, 110, 238, 0.3), 0 1px 3px rgba(0, 0, 0, 0.1)"
              }}
            />
          </div>
          <div 
            className="self-stretch relative bg-[#E8EAEC] rounded-[0px_4px_4px_0px]" 
            style={{ width: `${100 - percentage}%` }}
          />
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleSliderChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      </div>
    );
  }
);

SliderInput.displayName = "SliderInput"; 