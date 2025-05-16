import React, { useState } from "react";

const ResourceBundle: React.FC = () => {
  const [alternativeValue, setAlternativeValue] = useState("");

  const handleAlternativeValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAlternativeValue(e.target.value);
  };

  const handleAddAlternativeValue = () => {
    if (alternativeValue.trim()) {
      // Add the value to the list of alternative values
      setAlternativeValue("");
    }
  };

  return (
    <div className="flex w-full flex-col items-stretch justify-center mt-6">
      <div className="text-sm text-[#6D7783] font-normal">
        <div className="text-[#6D7783] self-stretch min-h-[21px] gap-1">
          Resource Bundle
        </div>
      </div>
      <div className="w-full mt-1">
        <div className="justify-center items-stretch flex w-full flex-col overflow-hidden bg-[#F3F8FE] rounded-[8px_8px_0px_0px] max-md:max-w-full">
          <div className="flex gap-px flex-wrap max-md:max-w-full">
            <div className="items-center shadow-[-1px_0px_0px_0px_#D6DEE6] flex gap-1 overflow-hidden text-sm text-[#5438DC] font-normal w-[189px] bg-[#F3F7FE] p-2">
              <div className="self-stretch flex items-center gap-1 my-auto">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/efc4527c0c8ceddb69de854d433bc40e3dafdf7b?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-5 self-stretch shrink-0 my-auto"
                  alt="Used in locations"
                />
                <div className="text-[#5438DC] self-stretch my-auto">
                  Used in 10 locations
                </div>
              </div>
            </div>
            <div className="items-center shadow-[-1px_0px_0px_0px_#D6DEE6] flex gap-2 overflow-hidden text-sm text-[#666E7E] font-normal bg-[#F3F7FE] p-2">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/c0728ccf4974aeffb5801876dd4bcbc8edef105d?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
                alt="Entire bundle"
              />
              <div className="text-[#666E7E] self-stretch gap-1 my-auto">
                Entire bundle
              </div>
            </div>
            <div className="items-center shadow-[-1px_0px_0px_0px_#D6DEE6] flex min-h-[37px] gap-2 overflow-hidden text-xs text-[#252b2f] font-normal leading-[18px] bg-[#F3F7FE] p-2">
              <div className="self-stretch gap-1 my-auto">
                <span className="text-[14px] text-[rgba(102,110,126,1)]">Ent_313..</span>
              </div>
            </div>
            <button className="items-center shadow-[-1px_0px_0px_0px_#D6DEE6] flex min-h-[37px] gap-2 overflow-hidden w-12 bg-[#F3F7FE] px-4 py-[11px]" aria-label="Edit">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/ac7cb94b0e0de1865ab3232846ccbab15ed4d539?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-4 self-stretch my-auto"
                alt="Edit"
              />
            </button>
            <button className="items-center shadow-[-1px_0px_0px_0px_#D6DEE6] flex min-h-[37px] gap-2 overflow-hidden w-12 bg-[#F3F7FE] px-4 py-[11px]" aria-label="More options">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/3e539497344a6db43ec3d51e75150e6d59853b27?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-4 self-stretch my-auto"
                alt="More options"
              />
            </button>
          </div>
          <div className="border bg-[#DAE1EA] min-h-px w-full border-[rgba(218,225,234,1)] border-solid max-md:max-w-full" />
        </div>
        <div className="items-stretch flex w-full max-w-[900px] flex-col bg-[#F3F8FE] p-4 rounded-[0px_0px_8px_8px] max-md:max-w-full">
          <div className="w-[426px] max-w-full text-sm text-[#666E7E] font-normal whitespace-nowrap">
            <div className="text-[#666E7E] w-[394px] max-w-full px-1">
              Image
            </div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/ff06290576810829d426169d55c9d69f3b6ff45f?placeholderIfAbsent=true"
              className="aspect-[1.78] object-contain w-full mt-1"
              alt="Resource image"
            />
          </div>
          <div className="w-full max-w-[868px] font-normal mt-4 max-md:max-w-full">
            <div className="text-[#666E7E] w-[706px] max-w-full text-sm max-md:max-w-full">
              Flashcard text
            </div>
            <input
              type="text"
              className="text-[#252B2F] border border-[color:var(--brand-greyscale-600,#D6DEE6)] min-h-10 w-full overflow-hidden text-lg whitespace-nowrap bg-white mt-1 pl-4 py-[7px] rounded-lg border-solid"
              defaultValue="Hello!"
              aria-label="Flashcard text"
            />
          </div>
          <div className="w-full font-normal mt-4">
            <div className="flex w-full max-w-[868px] flex-col items-stretch max-md:max-w-full">
              <div className="text-[#666E7E] text-sm">
                de alternative values
              </div>
              <div className="border border-[color:var(--Neutral-UI-Divider,#DAE1EA)] flex w-full gap-2.5 overflow-hidden text-base text-[#6D7783] bg-white mt-1 p-2 rounded-lg border-solid max-md:max-w-full">
                <input
                  type="text"
                  className="text-[#6D7783] self-stretch gap-2 rounded-xl w-full bg-transparent outline-none"
                  placeholder="New value..."
                  value={alternativeValue}
                  onChange={handleAlternativeValueChange}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddAlternativeValue()}
                  aria-label="Alternative value"
                />
              </div>
            </div>
          </div>
          <div className="flex w-full gap-4 text-sm justify-center flex-wrap mt-4 max-md:max-w-full">
            <div className="min-w-60 overflow-hidden flex-1 shrink basis-[0%] max-md:max-w-full">
              <div className="w-full overflow-hidden max-md:max-w-full">
                <div className="flex w-full max-w-[868px] flex-col text-[#666E7E] font-normal whitespace-nowrap max-md:max-w-full max-md:pr-5">
                  <div className="text-[#666E7E] self-stretch z-10 gap-2 px-1">
                    Audio
                  </div>
                </div>
                <div className="justify-center items-stretch border border-[color:var(--Greyscale-Black-25,#C8CACB)] flex w-full flex-col text-[#252B2F] font-bold text-center bg-white mt-2 px-[50px] py-2.5 rounded-lg border-dashed max-md:max-w-full max-md:px-5">
                  <div className="flex items-center gap-2 overflow-hidden flex-wrap">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/405af0eb7e5783dbd84c64e7a4482a3886e6bc24?placeholderIfAbsent=true"
                      className="aspect-[1] object-contain w-6 self-stretch shrink-0 my-auto"
                      alt="Audio upload"
                    />
                    <div className="self-stretch my-auto max-md:max-w-full">
                      <span className="leading-[20px]">
                        Drag & drop your audio here, or{" "}
                      </span>
                      <span className="leading-[20px] text-[rgba(17,110,238,1)]">
                        browse
                      </span>{" "}
                      <span className="leading-[20px]">
                        to upload
                      </span>
                      <span className="text-[rgba(17,110,238,1)]">
                        .{" "}
                      </span>
                      <span className="font-normal text-xs leading-[18px]">
                        (25MB max, .wav and .xwav supported)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="flex text-[#116EEE] font-bold text-center">
              <div className="justify-center items-center border-[color:var(--Button-Primary-Base,#116EEE)] flex min-h-9 px-6 py-2 rounded-3xl border-2 border-solid max-md:px-5">
                <div className="text-[#116EEE] self-stretch gap-1 my-auto">
                  Request audio
                </div>
              </div>
            </button>
          </div>
          <div className="w-full font-normal mt-4">
            <div className="w-full max-md:max-w-full">
              <div className="text-[#4B5766] w-full text-sm whitespace-nowrap max-md:max-w-full">
                Example
              </div>
              <input
                type="text"
                className="text-[#6D7783] self-stretch flex-1 shrink basis-[0%] border border-[color:var(--Neutral-UI-Divider,#DAE1EA)] min-h-11 w-full overflow-hidden text-base bg-white mt-1 px-4 py-2.5 rounded-lg border-solid max-md:max-w-full"
                defaultValue="Example in English"
                aria-label="Example"
              />
            </div>
          </div>
          <button className="flex items-center gap-2 text-sm text-[#116EEE] font-bold leading-none mt-4">
            <div className="text-[#116EEE] self-stretch my-auto">
              Add Audio
            </div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/f475795a84157a748c413c0f9d29fc6049d3a021?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-4 fill-[#116EEE] self-stretch shrink-0 my-auto"
              alt="Add"
            />
          </button>
          <button className="flex w-full items-center gap-2 text-sm text-[#116EEE] font-bold leading-none flex-wrap mt-4 max-md:max-w-full">
            <div className="text-[#116EEE] self-stretch my-auto">
              Add Video
            </div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/f475795a84157a748c413c0f9d29fc6049d3a021?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-4 fill-[#116EEE] self-stretch shrink-0 my-auto"
              alt="Add"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourceBundle;
