import React from "react";

interface ExerciseHeaderProps {
  title: string;
  id: string;
  isLive?: boolean;
}

const ExerciseHeader: React.FC<ExerciseHeaderProps> = ({ title, id, isLive = true }) => {
  return (
    <div
      className="flex w-full max-w-[901px] flex-col overflow-hidden font-bold px-1 py-2 max-md:max-w-full"
    >
      <div
        className="flex items-center gap-2 text-[10px] text-white font-extrabold whitespace-nowrap uppercase tracking-[1.2px]"
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/b8bb6bb551af3fdeb8482a339c72a07ec99203b8?placeholderIfAbsent=true"
          className="aspect-[1] object-contain w-6 self-stretch shrink-0 my-auto"
          alt="Status icon"
        />
        {isLive && (
          <div
            className="text-white self-stretch rounded gap-2.5 bg-[#0EBE75] my-auto px-3 py-1"
          >
            live
          </div>
        )}
      </div>
      <div
        className="text-[#6D7783] overflow-hidden text-sm mt-1"
      >
        ID:{" "}
        <span className="font-normal text-[rgba(109,119,131,1)]">
          {id}
        </span>
      </div>
      <div
        className="text-[#1E2D40] self-stretch gap-1 overflow-hidden text-base whitespace-nowrap mt-1 py-1"
      >
        {title}
      </div>
    </div>
  );
};

export default ExerciseHeader;
