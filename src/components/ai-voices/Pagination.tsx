import React, { useState } from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (rows: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
}) => {
  return (
    <section className="flex items-center gap-6 max-md:flex-col max-md:gap-4 max-md:items-stretch">
      <div className="flex items-center gap-2 max-sm:flex-col max-sm:items-start max-sm:gap-1">
        <label className="text-[#666E7E] text-right text-sm font-bold leading-[16.8px]">
          Number of rows:
        </label>
        <div className="flex w-20 flex-col items-start gap-2">
          <div className="h-[39px] w-full relative">
            <div className="w-20 h-[39px] shrink-0 border absolute bg-white rounded-lg border-solid border-[#D6DEE6] left-0 top-0" />
            <select
              value={rowsPerPage}
              onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
              className="w-8 h-[19px] shrink-0 text-[#252B2F] text-base font-normal leading-6 absolute left-4 top-2.5 bg-transparent border-none outline-none appearance-none"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <div>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"selection-arrow\" style=\"width: 16px; height: 16px; flex-shrink: 0; position: absolute; right: 8px; top: 12px\"> <path d=\"M7.47356 10.6574C7.74047 11.0006 8.25912 11.0006 8.52603 10.6574L11.8296 6.40994C12.1702 5.97204 11.8581 5.33398 11.3034 5.33398H4.69622C4.14146 5.33398 3.82939 5.97204 4.16999 6.40994L7.47356 10.6574Z\" fill=\"#A7B0B7\"></path> </svg>",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      
      <nav className="flex w-[252px] h-8 justify-center items-start relative bg-white rounded-lg max-md:w-full max-sm:flex-wrap max-sm:h-auto max-sm:p-2" aria-label="Pagination">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`flex w-9 h-8 justify-center items-center shrink-0 absolute px-2.5 py-2 left-0 top-0 ${
            currentPage === 1 ? 'opacity-20' : ''
          }`}
          aria-label="Previous page"
        >
          <div className="w-4 h-4 shrink-0 absolute left-2.5 top-2">
            <div className="w-3 h-2.5 shrink-0 fill-[#666E7E] absolute left-0.5 top-[3px]" />
          </div>
        </button>
        
        {[1, 2, 3].map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`text-center text-sm font-bold leading-6 w-9 h-8 shrink-0 px-0 py-1 ${
              currentPage === page ? 'text-[#116EEE]' : 'text-[#666E7E]'
            }`}
          >
            {page}
          </button>
        ))}
        
        <div className="absolute w-9 h-6 text-[#666E7E] text-sm font-bold left-36 top-1">
          ...
        </div>
        
        <button
          onClick={() => onPageChange(totalPages)}
          className={`text-center text-sm font-bold leading-6 w-9 h-8 shrink-0 px-0 py-1 ${
            currentPage === totalPages ? 'text-[#116EEE]' : 'text-[#666E7E]'
          }`}
        >
          {totalPages}
        </button>
        
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`flex w-9 h-8 justify-center items-center shrink-0 absolute px-2.5 py-2 right-0 top-0 ${
            currentPage === totalPages ? 'opacity-20' : ''
          }`}
          aria-label="Next page"
        >
          <div className="w-4 h-4 shrink-0 absolute left-2.5 top-2">
            <div className="w-3 h-2.5 shrink-0 fill-[#666E7E] absolute left-0.5 top-[3px]" />
          </div>
        </button>
      </nav>
    </section>
  );
}; 