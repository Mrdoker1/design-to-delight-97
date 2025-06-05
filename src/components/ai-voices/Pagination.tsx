import React, { useState } from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
  onItemsPerPageChange: (items: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  totalItems,
  itemsPerPage,
  onItemsPerPageChange,
}) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    
    if (totalPages <= 5) {
      // Если страниц 5 или меньше, показываем все
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`text-center text-sm font-bold leading-6 w-9 h-8 shrink-0 px-0 py-1 ${
              currentPage === i ? 'text-[#116EEE]' : 'text-[#666E7E]'
            }`}
          >
            {i}
          </button>
        );
      }
    } else {
      // Если страниц больше 5, показываем первые 3, многоточие, последнюю
      for (let i = 1; i <= 3; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`text-center text-sm font-bold leading-6 w-9 h-8 shrink-0 px-0 py-1 ${
              currentPage === i ? 'text-[#116EEE]' : 'text-[#666E7E]'
            }`}
          >
            {i}
          </button>
        );
      }
      
      // Многоточие
      pageNumbers.push(
        <div key="ellipsis" className="text-[#666E7E] text-sm font-bold w-9 h-8 flex items-center justify-center">
          ...
        </div>
      );
      
      // Последняя страница
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={`text-center text-sm font-bold leading-6 w-9 h-8 shrink-0 px-0 py-1 ${
            currentPage === totalPages ? 'text-[#116EEE]' : 'text-[#666E7E]'
          }`}
        >
          {totalPages}
        </button>
      );
    }
    
    return pageNumbers;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <section className="flex items-center gap-6 max-md:flex-col max-md:gap-4 max-md:items-stretch">
      <div className="flex items-center gap-2 max-sm:flex-col max-sm:items-start max-sm:gap-1">
        <label className="text-[#666E7E] text-right text-sm font-bold leading-[16.8px]">
          Number of rows:
        </label>
        <div className="flex w-[80px] h-10 items-center shrink-0 border bg-white p-2 rounded-lg border-solid border-[#D6DEE6]">
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="flex-[1_0_0] text-[15px] font-normal leading-[22.5px] bg-transparent border-none outline-none text-[#252B2F]"
          >
                      <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        </div>

      <nav className="flex h-8 justify-center items-center gap-1 bg-white rounded-lg max-md:w-full max-sm:flex-wrap max-sm:h-auto max-sm:p-2" aria-label="Pagination">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`flex w-9 h-8 justify-center items-center shrink-0 px-2.5 py-2 ${
            currentPage === 1 ? 'opacity-20' : 'hover:bg-gray-100'
          }`}
          aria-label="Previous page"
        >
          <div
            dangerouslySetInnerHTML={{
              __html:
                "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"arrow-left\" style=\"width: 16px; height: 16px\"> <path d=\"M13 8H3M3 8L7 4M3 8L7 12\" stroke=\"#666E7E\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path> </svg>",
            }}
          />
        </button>
        
        {renderPageNumbers()}
        
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`flex w-9 h-8 justify-center items-center shrink-0 px-2.5 py-2 ${
            currentPage === totalPages ? 'opacity-20' : 'hover:bg-gray-100'
          }`}
          aria-label="Next page"
        >
          <div
            dangerouslySetInnerHTML={{
              __html:
                "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"arrow-right\" style=\"width: 16px; height: 16px\"> <path d=\"M3 8H13M13 8L9 4M13 8L9 12\" stroke=\"#666E7E\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path> </svg>",
            }}
          />
        </button>
      </nav>
    </section>
  );
}; 