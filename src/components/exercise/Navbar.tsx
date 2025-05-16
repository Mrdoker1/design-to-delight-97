import React from "react";

const Navbar: React.FC = () => {
  return (
    <header
      className="items-stretch shadow-[0px_2px_8px_0px_rgba(0,0,0,0.10)] flex w-full gap-[40px_91px] flex-wrap bg-white px-[25px] py-3 max-md:max-w-full max-md:pr-5"
      role="banner"
    >
      <div className="flex flex-col overflow-hidden text-sm text-[#666E7E] grow-0 shrink-0 basis-0 w-fit">
        <div className="overflow-hidden px-1">
          <div
            className="text-[#666E7E] font-bold"
          >
            Complete English
          </div>
          <div className="flex items-center gap-1 overflow-hidden font-medium mt-1">
            <div
              className="text-[#666E7E] self-stretch my-auto"
            >
              English ·
            </div>
            <div
              className="text-[#666E7E] self-stretch h-[18px] gap-2 my-auto"
            >
              All languages
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 text-base text-[#252B2F] font-bold flex-wrap grow shrink basis-auto max-md:max-w-full">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/c79b949eedc8dd2b625369d3a0330abc899c5558?placeholderIfAbsent=true"
          className="aspect-[1] object-contain w-6 self-stretch shrink-0 my-auto"
          alt="Course icon"
        />
        <div className="self-stretch flex w-px shrink-0 h-[34px] bg-[#D6DEE6] my-auto rounded-sm" aria-hidden="true" />
        <div className="self-stretch flex min-w-60 items-center gap-2 flex-wrap my-auto max-md:max-w-full">
          <div
            className="self-stretch flex items-center gap-4 my-auto"
          >
            <div className="self-stretch flex items-center gap-4 my-auto">
              <div className="self-stretch my-auto">
                <button
                  className="justify-center items-center flex min-h-12 flex-col bg-[#E8FEF5] px-6 py-3 rounded-[32px] max-md:px-5"
                  aria-label="No issues found"
                >
                  <div className="flex gap-3">
                    <div
                      className="flex flex-col items-center justify-center"
                    >
                      <div className="flex items-center gap-2 justify-center">
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/5e8f09f4f4143ef107c7908a3bb0c73d94448927?placeholderIfAbsent=true"
                          className="aspect-[1] object-contain w-6 self-stretch shrink-0 my-auto"
                          alt="Check icon"
                        />
                        <div
                          className="text-[#252B2F] self-stretch my-auto"
                        >
                          No issues found
                        </div>
                      </div>
                      <div
                        className="flex min-h-0 w-16"
                      />
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div
            className="self-stretch flex items-center gap-4 my-auto"
          >
            <div className="self-stretch my-auto">
              <button
                className="justify-center items-center flex min-h-12 flex-col bg-[#F6FAFD] px-6 py-3 rounded-[32px] max-md:px-5"
                aria-label="Pending changes"
              >
                <div className="flex gap-3">
                  <div
                    className="flex flex-col items-center justify-center"
                  >
                    <div className="flex items-center gap-2 justify-center">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/8174bdf9a3cf7c271713d281c832674429ce117e?placeholderIfAbsent=true"
                        className="aspect-[1] object-contain w-6 self-stretch shrink-0 my-auto"
                        alt="Pending icon"
                      />
                      <div
                        className="text-[#252B2F] self-stretch my-auto"
                      >
                        Pending changes
                      </div>
                    </div>
                    <div
                      className="flex min-h-0 w-16"
                    />
                  </div>
                </div>
              </button>
            </div>
          </div>
          <div
            className="self-stretch text-[#87B6F6] font-medium whitespace-nowrap w-24 my-auto"
          >
            <button
              className="justify-center items-center border-[color:var(--brand-primary-500,#87B6F6)] flex min-h-12 w-full max-w-24 flex-col px-4 py-3 rounded-[32px] border-2 border-solid"
              aria-label="Save changes"
            >
              <div className="flex w-full gap-3">
                <div
                  className="flex w-16 flex-col items-center justify-center"
                >
                  <div
                    className="text-[#87B6F6] self-stretch gap-2"
                  >
                    Save
                  </div>
                  <div
                    className="flex min-h-0 w-full"
                  />
                </div>
              </div>
            </button>
          </div>
          <div
            className="self-stretch text-white font-medium my-auto"
          >
            <button
              className="justify-center items-center flex min-h-12 flex-col bg-[#87B6F6] px-4 py-3 rounded-[32px]"
              aria-label="Publish exercise"
            >
              <div className="flex gap-3">
                <div
                  className="flex flex-col items-center justify-center"
                >
                  <div
                    className="text-white self-stretch gap-2"
                  >
                    Publish exercise
                  </div>
                  <div
                    className="flex min-h-0 w-16"
                  />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
