"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface FormSectionProps {
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const FormSection = React.forwardRef<HTMLDivElement, FormSectionProps>(
  ({ title, action, children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex flex-col items-start gap-3 self-stretch relative", className)} {...props}>
        {title && (
          <div className="flex items-center gap-6 self-stretch relative">
            <div className="text-[#4B5766] text-sm font-normal leading-[21px] relative">
              {title}
            </div>
            <div className="flex-1 h-px relative bg-[#DAE1EA]" />
            {action}
          </div>
        )}
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