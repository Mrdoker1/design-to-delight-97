"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface FormSectionProps {
  children: React.ReactNode;
  className?: string;
}

export const FormSection = React.forwardRef<HTMLDivElement, FormSectionProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex flex-col items-start gap-3 self-stretch relative", className)} {...props}>
        {children}
      </div>
    );
  }
);

FormSection.displayName = "FormSection";

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ label, children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex flex-col items-start self-stretch relative", className)} {...props}>
        <div className="flex flex-col items-start gap-[5px] self-stretch relative">
          <div className="text-[#6D7783] text-sm font-normal leading-[21px] relative">
            {label}
          </div>
          {children}
        </div>
      </div>
    );
  }
);

FormField.displayName = "FormField"; 