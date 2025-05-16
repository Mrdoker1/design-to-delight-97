import React, { useState } from "react";

interface InstructionFormProps {
  initialInstruction?: string;
  showToUsers?: boolean;
}

const InstructionForm: React.FC<InstructionFormProps> = ({ 
  initialInstruction = "Look, something new!", 
  showToUsers = false 
}) => {
  const [instruction, setInstruction] = useState(initialInstruction);
  const [showInEnglish, setShowInEnglish] = useState(showToUsers);

  const handleInstructionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInstruction(e.target.value);
  };

  const handleShowInEnglishChange = () => {
    setShowInEnglish(!showInEnglish);
  };

  return (
    <div
      className="flex w-full flex-col items-stretch font-normal max-md:max-w-full"
    >
      <div
        className="w-full max-md:max-w-full"
      >
        <div
          className="w-full max-md:max-w-full"
        >
          <label
            className="text-[#6D7783] text-sm"
            htmlFor="instruction"
          >
            Instruction
          </label>
          <div
            className="items-center border border-[color:var(--Neutral-UI-Divider,#DAE1EA)] flex w-full gap-2 text-base text-[#1E2D40] mt-[5px] px-2 py-2.5 rounded-lg border-solid max-md:max-w-full"
          >
            <input
              id="instruction"
              type="text"
              className="text-[#1E2D40] text-ellipsis self-stretch flex-1 shrink basis-[0%] min-w-60 w-full gap-2 overflow-hidden my-auto rounded-lg max-md:max-w-full bg-transparent outline-none"
              value={instruction}
              onChange={handleInstructionChange}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-8 text-sm text-[#6D7783] mt-2">
        <div className="self-stretch flex items-center gap-2 my-auto rounded-[40px]">
          <input
            type="checkbox"
            id="showToUsers"
            className="rounded border border-[color:var(--Utility-Grey-light,#D6DEE6)] self-stretch w-4 shrink-0 h-4 bg-white my-auto border-solid"
            checked={showInEnglish}
            onChange={handleShowInEnglishChange}
          />
          <label
            htmlFor="showToUsers"
            className="text-[#6D7783] self-stretch my-auto cursor-pointer"
          >
            Show to users in English
          </label>
        </div>
      </div>
    </div>
  );
};

export default InstructionForm;
