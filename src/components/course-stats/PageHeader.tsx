import React, { useState } from 'react';

export const PageHeader: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedCourse, setSelectedCourse] = useState('Complete English');

  return (
    <div className="flex justify-center items-end gap-6 w-full max-md:flex-col max-md:gap-4 max-md:items-start">
      <div className="flex flex-col items-start gap-1 flex-[1_0_0]">
        <h1 className="text-[#1E2D40] text-3xl font-bold leading-[39px] gap-2 max-sm:text-2xl">
          Course Statistics
        </h1>
        <p className="w-full text-[#1E2D40] text-lg font-normal leading-[27px] rounded bg-white pl-0 pr-1 py-0.5 max-sm:text-base">
          Only published content will be counted
        </p>
      </div>
      <div className="flex w-[520px] items-center gap-4 max-md:w-full max-md:flex-col max-md:gap-3">
        <div className="flex flex-col items-start flex-[1_0_0] max-md:w-full">
          <label htmlFor="language-select" className="text-[#4B5766] text-sm font-normal leading-5">
            Language
          </label>
          <div className="flex items-center w-full border box-border bg-white p-2 rounded-lg border-solid border-[#DAE1EA]">
            <div className="w-6 h-6 relative">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 flex-shrink-0"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="12" fill="white"/>
                <path d="M2.48056 0.694336C1.53795 1.92073 0.827189 3.33424 0.41333 4.86982H6.65605L2.48056 0.694336Z" fill="#154CCF" transform="translate(0,5)"/>
                <path d="M6.58661 4.86978C6.17275 3.33425 5.46194 1.92073 4.51938 0.694336L0.343994 4.86978H6.58661Z" fill="#154CCF" transform="translate(17,5)"/>
                <path d="M0.41333 0.130371C0.827236 1.6659 1.538 3.07942 2.48057 4.30576L6.65591 0.130371H0.41333Z" fill="#154CCF" transform="translate(0,15)"/>
                <path d="M4.30581 2.48086C3.07942 1.53825 1.66595 0.82748 0.130371 0.413574V6.65625L4.30581 2.48086Z" fill="#154CCF" transform="translate(15,0)"/>
                <path d="M0.694092 4.51909C1.92048 5.4617 3.334 6.17247 4.86953 6.58637V0.34375L0.694092 4.51909Z" fill="#154CCF" transform="translate(5,17)"/>
                <path d="M4.86948 0.413574C3.33395 0.82748 1.92044 1.53825 0.694092 2.48081L4.86948 6.6562V0.413574Z" fill="#154CCF" transform="translate(5,0)"/>
                <path d="M0.130371 6.58637C1.6659 6.17247 3.07942 5.4617 4.30576 4.51914L0.130371 0.34375V6.58637Z" fill="#154CCF" transform="translate(15,17)"/>
                <path d="M0.343994 0.130371L4.51938 4.30581C5.46194 3.07946 6.17275 1.6659 6.58661 0.130371H0.343994Z" fill="#154CCF" transform="translate(17,15)"/>
                <path d="M23.8984 10.4348H13.5653H13.5653V0.101578C13.0529 0.034875 12.5305 0 12 0C11.4694 0 10.9471 0.034875 10.4348 0.101578V10.4347V10.4348H0.101578C0.034875 10.9471 0 11.4695 0 12C0 12.5306 0.034875 13.0529 0.101578 13.5652H10.4347H10.4348V23.8984C10.9471 23.9651 11.4694 24 12 24C12.5305 24 13.0529 23.9652 13.5652 23.8984V13.5653V13.5653H23.8984C23.9651 13.0529 24 12.5306 24 12C24 11.4695 23.9651 10.9471 23.8984 10.4348Z" fill="#E74A3F"/>
                <circle cx="12" cy="12" r="11.5" stroke="black" strokeOpacity="0.1"/>
              </svg>
            </div>
            <select
              id="language-select"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className={`flex-[1_0_0] text-base font-normal leading-6 bg-transparent border-none outline-none ${
                selectedLanguage ? 'text-[#1E2D40]' : 'text-[#9CAEC7]'
              }`}
            >
              <option value="">Language</option>
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col items-start flex-[1_0_0] max-md:w-full">
          <label htmlFor="course-select" className="text-[#4B5766] text-sm font-normal leading-5">
            Course
          </label>
          <div className="flex items-center w-full border box-border bg-white p-2 rounded-lg border-solid border-[#DAE1EA]">
            <select
              id="course-select"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className={`flex-[1_0_0] text-base font-normal leading-6 bg-transparent border-none outline-none ${
                selectedCourse ? 'text-[#1E2D40]' : 'text-[#9CAEC7]'
              }`}
            >
              <option value="">Course</option>
              <option value="Complete English">Complete English</option>
              <option value="Business English">Business English</option>
              <option value="Travel English">Travel English</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}; 