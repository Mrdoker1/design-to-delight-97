import React, { useState } from 'react';
import { FilterState } from '../../types/voice';

interface FilterControlsProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export const FilterControls: React.FC<FilterControlsProps> = ({ filters, onFiltersChange }) => {
  const handleFilterChange = (key: keyof FilterState, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <section className="flex w-full items-start gap-6 px-0 py-0.5 max-md:flex-wrap max-md:gap-4">
      <div className="flex w-[280px] h-10 items-center gap-2 shrink-0 border bg-white p-2 rounded-lg border-solid border-[#D6DEE6] max-md:w-[calc(50%_-_8px)] max-sm:w-full">
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html:
                "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"search-icon\" style=\"width: 24px; height: 24px; flex-shrink: 0\"> <path d=\"M10.25 3C6.25482 3 3 6.25482 3 10.25C3 14.2452 6.25482 17.5 10.25 17.5C11.9782 17.5 13.5669 16.8895 14.8145 15.875L19.7197 20.7803C19.7888 20.8523 19.8716 20.9097 19.9632 20.9493C20.0548 20.9889 20.1534 21.0098 20.2532 21.0108C20.3529 21.0118 20.4519 20.9929 20.5443 20.9552C20.6367 20.9175 20.7206 20.8617 20.7912 20.7912C20.8617 20.7206 20.9175 20.6367 20.9552 20.5443C20.9929 20.4519 21.0118 20.3529 21.0108 20.2532C21.0098 20.1534 20.9889 20.0548 20.9493 19.9632C20.9097 19.8716 20.8523 19.7888 20.7803 19.7197L15.875 14.8145C16.8895 13.5669 17.5 11.9782 17.5 10.25C17.5 6.25482 14.2452 3 10.25 3ZM10.25 4.5C13.4345 4.5 16 7.06548 16 10.25C16 11.8013 15.3881 13.2029 14.3955 14.2354C14.3343 14.2803 14.2803 14.3343 14.2354 14.3955C13.2029 15.3881 11.8013 16 10.25 16C7.06548 16 4.5 13.4345 4.5 10.25C4.5 7.06548 7.06548 4.5 10.25 4.5Z\" fill=\"#C8CACB\"></path> </svg>",
            }}
          />
        </div>
        <select
          value={filters.language}
          onChange={(e) => handleFilterChange('language', e.target.value)}
          className="flex-[1_0_0] text-[#4B5766] text-[15px] font-normal leading-[22.5px] bg-transparent border-none outline-none appearance-none"
        >
          <option value="">Language</option>
          <option value="EN">English</option>
          <option value="IT">Italian</option>
          <option value="GE">German</option>
          <option value="FR">French</option>
        </select>
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html:
                "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"dropdown-icon\" style=\"width: 24px; height: 24px; flex-shrink: 0\"> <path d=\"M16.5314 9H7.46884C7.29071 9 7.12759 9.10094 7.04852 9.26094C6.96946 9.42063 6.98821 9.61157 7.09602 9.75313L11.6273 15.6907C11.7164 15.8069 11.8539 15.875 12.0001 15.875C12.1464 15.875 12.2839 15.8069 12.3726 15.6907L16.9039 9.75313C17.012 9.61157 17.0304 9.42063 16.9514 9.26094C16.8726 9.10094 16.7095 9 16.5314 9Z\" fill=\"#929597\"></path> </svg>",
            }}
          />
        </div>
      </div>

      <div className="flex w-[280px] h-10 items-center gap-2 shrink-0 border bg-white p-2 rounded-lg border-solid border-[#D6DEE6] max-md:w-[calc(50%_-_8px)] max-sm:w-full">
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html:
                "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"search-icon\" style=\"width: 24px; height: 24px; flex-shrink: 0\"> <path d=\"M10.25 3C6.25482 3 3 6.25482 3 10.25C3 14.2452 6.25482 17.5 10.25 17.5C11.9782 17.5 13.5669 16.8895 14.8145 15.875L19.7197 20.7803C19.7888 20.8523 19.8716 20.9097 19.9632 20.9493C20.0548 20.9889 20.1534 21.0098 20.2532 21.0108C20.3529 21.0118 20.4519 20.9929 20.5443 20.9552C20.6367 20.9175 20.7206 20.8617 20.7912 20.7912C20.8617 20.7206 20.9175 20.6367 20.9552 20.5443C20.9929 20.4519 21.0118 20.3529 21.0108 20.2532C21.0098 20.1534 20.9889 20.0548 20.9493 19.9632C20.9097 19.8716 20.8523 19.7888 20.7803 19.7197L15.875 14.8145C16.8895 13.5669 17.5 11.9782 17.5 10.25C17.5 6.25482 14.2452 3 10.25 3ZM10.25 4.5C13.4345 4.5 16 7.06548 16 10.25C16 11.8013 15.3881 13.2029 14.3955 14.2354C14.3343 14.2803 14.2803 14.3343 14.2354 14.3955C13.2029 15.3881 11.8013 16 10.25 16C7.06548 16 4.5 13.4345 4.5 10.25C4.5 7.06548 7.06548 4.5 10.25 4.5Z\" fill=\"#C8CACB\"></path> </svg>",
            }}
          />
        </div>
        <select
          value={filters.gender}
          onChange={(e) => handleFilterChange('gender', e.target.value)}
          className="flex-[1_0_0] text-[#4B5766] text-[15px] font-normal leading-[22.5px] bg-transparent border-none outline-none appearance-none"
        >
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html:
                "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"dropdown-icon\" style=\"width: 24px; height: 24px; flex-shrink: 0\"> <path d=\"M16.5314 9H7.46884C7.29071 9 7.12759 9.10094 7.04852 9.26094C6.96946 9.42063 6.98821 9.61157 7.09602 9.75313L11.6273 15.6907C11.7164 15.8069 11.8539 15.875 12.0001 15.875C12.1464 15.875 12.2839 15.8069 12.3726 15.6907L16.9039 9.75313C17.012 9.61157 17.0304 9.42063 16.9514 9.26094C16.8726 9.10094 16.7095 9 16.5314 9Z\" fill=\"#929597\"></path> </svg>",
            }}
          />
        </div>
      </div>

      <div className="flex w-[280px] h-10 items-center gap-2 shrink-0 border bg-white p-2 rounded-lg border-solid border-[#D6DEE6] max-md:w-[calc(50%_-_8px)] max-sm:w-full">
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html:
                "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"search-icon\" style=\"width: 24px; height: 24px; flex-shrink: 0\"> <path d=\"M10.25 3C6.25482 3 3 6.25482 3 10.25C3 14.2452 6.25482 17.5 10.25 17.5C11.9782 17.5 13.5669 16.8895 14.8145 15.875L19.7197 20.7803C19.7888 20.8523 19.8716 20.9097 19.9632 20.9493C20.0548 20.9889 20.1534 21.0098 20.2532 21.0108C20.3529 21.0118 20.4519 20.9929 20.5443 20.9552C20.6367 20.9175 20.7206 20.8617 20.7912 20.7912C20.8617 20.7206 20.9175 20.6367 20.9552 20.5443C20.9929 20.4519 21.0118 20.3529 21.0108 20.2532C21.0098 20.1534 20.9889 20.0548 20.9493 19.9632C20.9097 19.8716 20.8523 19.7888 20.7803 19.7197L15.875 14.8145C16.8895 13.5669 17.5 11.9782 17.5 10.25C17.5 6.25482 14.2452 3 10.25 3ZM10.25 4.5C13.4345 4.5 16 7.06548 16 10.25C16 11.8013 15.3881 13.2029 14.3955 14.2354C14.3343 14.2803 14.2803 14.3343 14.2354 14.3955C13.2029 15.3881 11.8013 16 10.25 16C7.06548 16 4.5 13.4345 4.5 10.25C4.5 7.06548 7.06548 4.5 10.25 4.5Z\" fill=\"#C8CACB\"></path> </svg>",
            }}
          />
        </div>
        <select
          value={filters.accent}
          onChange={(e) => handleFilterChange('accent', e.target.value)}
          className="flex-[1_0_0] text-[#4B5766] text-[15px] font-normal leading-[22.5px] bg-transparent border-none outline-none appearance-none"
        >
          <option value="">Accent</option>
          <option value="British">British</option>
          <option value="American">American</option>
          <option value="Italian">Italian</option>
          <option value="None">None</option>
        </select>
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html:
                "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"dropdown-icon\" style=\"width: 24px; height: 24px; flex-shrink: 0\"> <path d=\"M16.5314 9H7.46884C7.29071 9 7.12759 9.10094 7.04852 9.26094C6.96946 9.42063 6.98821 9.61157 7.09602 9.75313L11.6273 15.6907C11.7164 15.8069 11.8539 15.875 12.0001 15.875C12.1464 15.875 12.2839 15.8069 12.3726 15.6907L16.9039 9.75313C17.012 9.61157 17.0304 9.42063 16.9514 9.26094C16.8726 9.10094 16.7095 9 16.5314 9Z\" fill=\"#929597\"></path> </svg>",
            }}
          />
        </div>
      </div>

      <div className="flex w-[300px] flex-col items-start shrink-0 max-md:w-full max-sm:w-full">
        <div className="flex justify-center items-center gap-2 w-full border bg-[#F3F8FE] p-2 rounded-lg border-solid border-[#DAE1EA]">
          <div>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"filter-icon\" style=\"width: 20px; height: 20px\"> <path d=\"M18.3332 2.5H1.6665L8.33317 10.3833V15.8333L11.6665 17.5V10.3833L18.3332 2.5Z\" stroke=\"#9CAEC7\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path> </svg>",
              }}
            />
          </div>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            placeholder="Filter by name"
            className="flex-[1_0_0] text-[#9CAEC7] text-base font-normal leading-6 bg-transparent border-none outline-none placeholder:text-[#9CAEC7]"
          />
        </div>
      </div>
    </section>
  );
}; 