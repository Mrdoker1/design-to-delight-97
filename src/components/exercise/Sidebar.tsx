import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (item: string) => {
    console.log(`Clicked: ${item}`);
    if (item === 'Audio Management') {
      navigate('/ai-voices');
    } else if (item === 'Course Stats') {
      navigate('/course-stats');
    }
    setIsMenuOpen(false);
  };

  const menuItems = [
    'Personal Information',
    'Admin Settings',
    'Course Stats',
    'Progress Matching',
    'Audio Management',
    'Logout'
  ];

  return (
    <div
      className="bg-[rgba(243,248,254,1)] relative flex w-full flex-col mx-auto pt-6 pb-[412px] px-6 max-md:pb-[100px] max-md:px-5"
      aria-label="Course navigation sidebar"
    >
      <div className="z-0 flex min-h-12 w-12" />
      <div
        className="self-stretch z-0 w-full max-w-60 text-sm text-[#116EEE] font-bold text-center mt-6"
      >
        <div className="flex w-full">
          <div
            className="justify-center items-center border-[color:var(--Button-Primary-Base,#116EEE)] flex min-h-9 w-full flex-1 shrink basis-[0%] px-6 py-2 rounded-3xl border-2 border-solid max-md:px-5"
          >
            <div className="self-stretch flex items-center gap-1 justify-center my-auto">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/0899e6b54074042aae46fa11b8e97389e67f0ace?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-5 self-stretch shrink-0 my-auto"
                alt="Grammar icon"
              />
              <div
                className="text-[#116EEE] self-stretch my-auto"
              >
                Grammar Review
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full mt-2">
          <div
            className="justify-center items-center border-[color:var(--Button-Primary-Base,#116EEE)] flex min-h-9 w-full flex-1 shrink basis-[0%] px-6 py-2 rounded-3xl border-2 border-solid max-md:px-5"
          >
            <div className="self-stretch flex items-center gap-1 justify-center my-auto">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/09aa8d7c34158006cb54fef811af11510e1e78fc?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-5 self-stretch shrink-0 my-auto"
                alt="Placement test icon"
              />
              <div
                className="text-[#116EEE] self-stretch my-auto"
              >
                Placement Test
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav
        className="self-stretch z-0 w-full max-w-[244px] overflow-hidden mt-6"
        aria-label="Course navigation"
      >
        <div
          className="flex w-full items-center gap-1 overflow-hidden pl-2 py-2"
          role="button"
          tabIndex={0}
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/f850b76348db8d63352fd1f7597ce5878f878952?placeholderIfAbsent=true"
            className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
            alt="Course icon"
          />
          <div className="self-stretch flex items-center gap-1 overflow-hidden w-[216px] my-auto">
            <div
              className="self-stretch flex flex-col overflow-hidden items-stretch justify-center w-4 my-auto p-0.5"
            >
              <div className="bg-[#0FD683] flex w-3 shrink-0 h-3 fill-[#0FD683] rounded-[50%]" aria-hidden="true" />
            </div>
            <div
              className="text-[rgba(17,110,238,1)] text-sm font-bold self-stretch w-[155px] my-auto"
            >
              Complete German
            </div>
          </div>
        </div>
        <div
          className="flex w-full flex-col overflow-hidden items-center pl-4"
        >
          <div
            className="flex w-full max-w-[228px] items-center gap-1 overflow-hidden pl-2 py-2"
            role="button"
            tabIndex={0}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/f850b76348db8d63352fd1f7597ce5878f878952?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
              alt="Level icon"
            />
            <div className="self-stretch flex items-center gap-1 overflow-hidden w-[200px] my-auto">
              <div
                className="self-stretch flex flex-col overflow-hidden items-stretch justify-center w-4 my-auto p-0.5"
              >
                <div className="bg-[#0FD683] flex w-3 shrink-0 h-3 fill-[#0FD683] rounded-[50%]" aria-hidden="true" />
              </div>
              <div
                className="text-[rgba(17,110,238,1)] text-sm font-bold self-stretch w-[155px] my-auto"
              >
                Beginer A1
              </div>
            </div>
          </div>
          <div className="w-full max-w-[228px] pl-4">
            <div
              className="flex w-full items-center gap-1 pl-2 py-2 rounded-xl"
              role="button"
              tabIndex={0}
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/f850b76348db8d63352fd1f7597ce5878f878952?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
                alt="Chapter icon"
              />
              <div
                className="self-stretch flex flex-col overflow-hidden items-stretch justify-center w-4 my-auto p-0.5"
              >
                <div className="bg-[#0FD683] flex w-3 shrink-0 h-3 fill-[#0FD683] rounded-[50%]" aria-hidden="true" />
              </div>
              <div
                className="text-[#116EEE] text-sm font-bold self-stretch w-[184px] my-auto"
              >
                Introductions
              </div>
            </div>
            <div className="w-full pl-4">
              <div
                className="flex w-full items-center gap-1 overflow-hidden pl-2 py-2 rounded-lg"
                role="button"
                tabIndex={0}
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/f850b76348db8d63352fd1f7597ce5878f878952?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
                  alt="Lesson icon"
                />
                <div className="self-stretch flex items-center gap-1 overflow-hidden w-[168px] my-auto">
                  <div
                    className="self-stretch flex flex-col overflow-hidden items-stretch justify-center w-4 my-auto p-0.5"
                  >
                    <div className="bg-[#0FD683] flex w-3 shrink-0 h-3 fill-[#0FD683] rounded-[50%]" aria-hidden="true" />
                  </div>
                  <div
                    className="text-[#116EEE] text-sm font-bold self-stretch my-auto"
                  >
                    Hallo!
                  </div>
                </div>
              </div>
              <div className="w-full pl-4">
                <div
                  className="flex w-full max-w-[180px] items-center gap-1 overflow-hidden pl-2 py-2 rounded-lg"
                  role="button"
                  tabIndex={0}
                  aria-current="page"
                >
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/f850b76348db8d63352fd1f7597ce5878f878952?placeholderIfAbsent=true"
                    className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
                    alt="Vocabulary icon"
                  />
                  <div className="self-stretch flex items-center gap-1 overflow-hidden w-[152px] my-auto">
                    <div
                      className="self-stretch flex flex-col overflow-hidden items-stretch justify-center w-4 my-auto p-0.5"
                    >
                      <div className="bg-[#0FD683] flex w-3 shrink-0 h-3 fill-[#0FD683] rounded-[50%]" aria-hidden="true" />
                    </div>
                    <div
                      className="text-[#116EEE] text-sm font-bold self-stretch my-auto"
                    >
                      Vocabulary
                    </div>
                  </div>
                </div>
                <div
                  className="flex w-full max-w-[180px] flex-col overflow-hidden pl-8 rounded-lg max-md:pl-5"
                >
                  <div
                    className="flex w-full max-w-40 items-center gap-1 pl-2 py-2"
                    role="button"
                    tabIndex={0}
                  >
                    <div className="self-stretch flex w-[152px] items-center gap-1 overflow-hidden my-auto">
                      <div
                        className="self-stretch flex flex-col overflow-hidden items-stretch justify-center w-4 my-auto p-0.5"
                      >
                        <div className="bg-[#0FD683] flex w-3 shrink-0 h-3 fill-[#0FD683] rounded-[50%]" aria-hidden="true" />
                      </div>
                      <div
                        className="text-[#116EEE] text-sm font-bold self-stretch my-auto"
                      >
                        Flashcard
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="flex w-full max-w-[180px] flex-col overflow-hidden pl-8 rounded-lg max-md:pl-5"
                >
                  <div
                    className="flex w-full max-w-40 items-center gap-1 pl-2 py-2"
                    role="button"
                    tabIndex={0}
                  >
                    <div className="self-stretch flex w-[152px] items-center gap-1 overflow-hidden my-auto">
                      <div
                        className="self-stretch flex flex-col overflow-hidden items-stretch justify-center w-4 my-auto p-0.5"
                      >
                        <div className="bg-[#0FD683] flex w-3 shrink-0 h-3 fill-[#0FD683] rounded-[50%]" aria-hidden="true" />
                      </div>
                      <div
                        className="text-[#252B2F] text-sm font-bold self-stretch my-auto"
                      >
                        Fillgap
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="flex w-full max-w-[180px] flex-col overflow-hidden pl-8 rounded-lg max-md:pl-5"
                >
                  <div
                    className="flex w-full max-w-40 items-center gap-1 pl-2 py-2"
                    role="button"
                    tabIndex={0}
                  >
                    <div className="self-stretch flex w-[152px] items-center gap-1 overflow-hidden my-auto">
                      <div
                        className="self-stretch flex flex-col overflow-hidden items-stretch justify-center w-4 my-auto p-0.5"
                      >
                        <div className="bg-[#0FD683] flex w-3 shrink-0 h-3 fill-[#0FD683] rounded-[50%]" aria-hidden="true" />
                      </div>
                      <div
                        className="text-[#252B2F] text-sm font-bold self-stretch my-auto"
                      >
                        Flashcard
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="flex w-full max-w-[180px] flex-col overflow-hidden pl-8 rounded-lg max-md:pl-5"
                >
                  <div
                    className="flex w-full max-w-40 items-center gap-1 pl-2 py-2"
                    role="button"
                    tabIndex={0}
                  >
                    <div className="self-stretch flex w-[152px] items-center gap-1 overflow-hidden my-auto">
                      <div
                        className="self-stretch flex flex-col overflow-hidden items-stretch justify-center w-4 my-auto p-0.5"
                      >
                        <div className="bg-[#0FD683] flex w-3 shrink-0 h-3 fill-[#0FD683] rounded-[50%]" aria-hidden="true" />
                      </div>
                      <div
                        className="text-[#252B2F] text-sm font-bold self-stretch my-auto"
                      >
                        Fillgap
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="flex w-full max-w-[180px] flex-col overflow-hidden pl-8 rounded-lg max-md:pl-5"
                >
                  <div
                    className="flex w-full max-w-40 items-center gap-1 pl-2 py-2"
                    role="button"
                    tabIndex={0}
                  >
                    <div className="self-stretch flex w-[152px] items-center gap-1 overflow-hidden my-auto">
                      <div
                        className="self-stretch flex flex-col overflow-hidden items-stretch justify-center w-4 my-auto p-0.5"
                      >
                        <div className="bg-[#0FD683] flex w-3 shrink-0 h-3 fill-[#0FD683] rounded-[50%]" aria-hidden="true" />
                      </div>
                      <div
                        className="text-[#252B2F] text-sm font-bold self-stretch my-auto"
                      >
                        Flashcard
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="flex w-full max-w-[180px] flex-col overflow-hidden pl-8 rounded-lg max-md:pl-5"
                >
                  <div
                    className="flex w-full max-w-40 items-center gap-1 pl-2 py-2"
                    role="button"
                    tabIndex={0}
                  >
                    <div className="self-stretch flex w-[152px] items-center gap-1 overflow-hidden my-auto">
                      <div
                        className="self-stretch flex flex-col overflow-hidden items-stretch justify-center w-4 my-auto p-0.5"
                      >
                        <div className="bg-[#0FD683] flex w-3 shrink-0 h-3 fill-[#0FD683] rounded-[50%]" aria-hidden="true" />
                      </div>
                      <div
                        className="text-[#252B2F] text-sm font-bold self-stretch my-auto"
                      >
                        Fillgap
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="flex w-full max-w-[180px] items-center gap-1 overflow-hidden pl-2 py-2 rounded-2xl"
                  role="button"
                  tabIndex={0}
                >
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/2c2810802d8789d9877b141486f7ecfc91f34595?placeholderIfAbsent=true"
                    className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
                    alt="Dialogue icon"
                  />
                  <div className="self-stretch flex items-center gap-1 overflow-hidden w-[152px] my-auto">
                    <div
                      className="self-stretch flex flex-col overflow-hidden items-stretch justify-center w-4 my-auto p-0.5"
                    >
                      <div className="bg-[#0FD683] flex w-3 shrink-0 h-3 fill-[#0FD683] rounded-[50%]" aria-hidden="true" />
                    </div>
                    <div
                      className="text-[#252B2F] text-sm font-bold self-stretch my-auto"
                    >
                      Introducing yourself
                    </div>
                  </div>
                </div>
                <div
                  className="flex w-full max-w-[180px] items-center gap-1 overflow-hidden pl-2 py-2 rounded-2xl"
                  role="button"
                  tabIndex={0}
                >
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/2c2810802d8789d9877b141486f7ecfc91f34595?placeholderIfAbsent=true"
                    className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
                    alt="Dialogue icon"
                  />
                  <div className="self-stretch flex items-center gap-1 overflow-hidden w-[152px] my-auto">
                    <div
                      className="self-stretch flex flex-col overflow-hidden items-stretch justify-center w-4 my-auto p-0.5"
                    >
                      <div className="bg-[#0FD683] flex w-3 shrink-0 h-3 fill-[#0FD683] rounded-[50%]" aria-hidden="true" />
                    </div>
                    <div
                      className="text-[#252B2F] text-sm font-bold self-stretch my-auto"
                    >
                      Asking for a name
                    </div>
                  </div>
                </div>
                <div
                  className="flex w-full max-w-[180px] items-center gap-1 overflow-hidden pl-2 py-2 rounded-2xl"
                  role="button"
                  tabIndex={0}
                >
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/2c2810802d8789d9877b141486f7ecfc91f34595?placeholderIfAbsent=true"
                    className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
                    alt="Dialogue icon"
                  />
                  <div className="self-stretch flex items-center gap-1 overflow-hidden w-[152px] my-auto">
                    <div
                      className="self-stretch flex flex-col overflow-hidden items-stretch justify-center w-4 my-auto p-0.5"
                    >
                      <div className="bg-[#0FD683] flex w-3 shrink-0 h-3 fill-[#0FD683] rounded-[50%]" aria-hidden="true" />
                    </div>
                    <div
                      className="text-[#252B2F] text-sm font-bold self-stretch my-auto"
                    >
                      Practising introductions
                    </div>
                  </div>
                </div>
                <div
                  className="flex w-full max-w-[180px] items-center gap-1 overflow-hidden pl-2 py-2 rounded-2xl"
                  role="button"
                  tabIndex={0}
                >
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/2c2810802d8789d9877b141486f7ecfc91f34595?placeholderIfAbsent=true"
                    className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
                    alt="Dialogue icon"
                  />
                  <div className="self-stretch flex items-center gap-1 overflow-hidden w-[152px] my-auto">
                    <div
                      className="self-stretch flex flex-col overflow-hidden items-stretch justify-center w-4 my-auto p-0.5"
                    >
                      <div className="bg-[#0FD683] flex w-3 shrink-0 h-3 fill-[#0FD683] rounded-[50%]" aria-hidden="true" />
                    </div>
                    <div
                      className="text-[#252B2F] text-sm font-bold self-stretch my-auto"
                    >
                      Speaking - Speaking
                    </div>
                  </div>
                </div>
                <div
                  className="flex w-full max-w-[180px] items-center gap-1 overflow-hidden pl-2 py-2 rounded-2xl"
                  role="button"
                  tabIndex={0}
                >
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/2c2810802d8789d9877b141486f7ecfc91f34595?placeholderIfAbsent=true"
                    className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
                    alt="Dialogue icon"
                  />
                  <div className="self-stretch flex items-center gap-1 overflow-hidden w-[152px] my-auto">
                    <div
                      className="self-stretch flex flex-col overflow-hidden items-stretch justify-center w-4 my-auto p-0.5"
                    >
                      <div className="bg-[#0FD683] flex w-3 shrink-0 h-3 fill-[#0FD683] rounded-[50%]" aria-hidden="true" />
                    </div>
                    <div
                      className="text-[#252B2F] text-sm font-bold self-stretch my-auto"
                    >
                      Developing fluency
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="flex w-full items-center gap-1 overflow-hidden text-sm text-[#252B2F] font-bold pl-2 py-2 rounded-lg"
                role="button"
                tabIndex={0}
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/8b09ab8307e732585d48da247bbafe1bab85e09a?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
                  alt="Review icon"
                />
                <div
                  className="text-[#252B2F] self-stretch gap-1 overflow-hidden w-[168px] my-auto"
                >
                  Review - Untitled ...
                </div>
              </div>
            </div>
            <div
              className="flex w-full items-center gap-1 text-sm text-[#252B2F] font-bold pl-2 py-2 rounded-xl"
              role="button"
              tabIndex={0}
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/48b7bab4c39802ef3347bcbce04d86d7d20c1967?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
                alt="Chapter icon"
              />
              <div
                className="text-[#252B2F] self-stretch w-[184px] my-auto"
              >
                Chapter{" "}
              </div>
            </div>
            <div
              className="flex w-full items-center gap-1 text-sm text-[#252B2F] font-bold pl-2 py-2 rounded-xl"
              role="button"
              tabIndex={0}
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/48b7bab4c39802ef3347bcbce04d86d7d20c1967?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
                alt="Chapter icon"
              />
              <div
                className="text-[#252B2F] self-stretch w-[184px] my-auto"
              >
                2 - Chapter{" "}
              </div>
            </div>
          </div>
          <div
            className="flex w-full max-w-56 items-center gap-1 overflow-hidden text-sm text-[#252B2F] font-bold pl-2 py-2"
            role="button"
            tabIndex={0}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/48b7bab4c39802ef3347bcbce04d86d7d20c1967?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
              alt="Level icon"
            />
            <div
              className="text-[#252B2F] self-stretch w-[198px] gap-1 overflow-hidden my-auto"
            >
              Intermediate B1
            </div>
          </div>
        </div>
      </nav>
      <div
        className="bg-[rgba(243,248,254,1)] shadow-[0px_-1px_0px_rgba(214,222,230,1)] absolute z-0 w-[292px] max-w-[292px] text-xs text-white font-normal whitespace-nowrap px-6 py-4 right-0 bottom-0 max-md:px-5"
      >
        <div className="flex items-center gap-6">
          <div className="self-stretch w-8 my-auto relative" ref={menuRef}>
            <div
              className="stroke-[1px] border bg-[#0E58BE] w-8 h-8 fill-[#0E58BE] px-[3px] rounded-[50%] border-[rgba(0,0,0,0.1)] border-solid flex items-center justify-center text-white cursor-pointer hover:bg-[#0D4FA3] transition-colors"
              aria-label="User profile"
              onClick={toggleMenu}
            >
              TL
            </div>
            
            {/* Context Menu */}
            {isMenuOpen && (
              <div className="absolute bottom-full left-0 mb-2 bg-white shadow-lg rounded-lg p-2 z-50 w-[200px]">
                {menuItems.map((item, index) => (
                  <div
                    key={index}
                    className={`p-2 hover:bg-gray-100 rounded cursor-pointer font-normal ${
                      item === 'Audio Management' 
                        ? 'text-blue-600 hover:bg-blue-50' 
                        : 'text-gray-600'
                    }`}
                    onClick={() => handleMenuItemClick(item)}
                  >
                    {item === 'Audio Management' && (
                      <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    )}
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/0d44dbe8a3c22303f567ac4e0619298fdcfec9af?placeholderIfAbsent=true"
            className="aspect-[1] object-contain w-6 self-stretch shrink-0 my-auto"
            alt="Settings"
          />
        </div>
      </div>
      <button
        className="absolute z-0 flex w-9 gap-2.5 h-9 bg-[#F3F8FE] p-2.5 rounded-[0px_8px_8px_0px] -right-9 top-24"
        aria-label="Collapse sidebar"
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/eeed05e7079e88d0b022dc3c63d1faad771460bd?placeholderIfAbsent=true"
          className="aspect-[1] object-contain w-4"
          alt="Collapse"
        />
      </button>
    </div>
  );
};

export default Sidebar;
