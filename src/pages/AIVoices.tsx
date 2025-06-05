import React, { useState, useMemo } from 'react';
import { Header } from '../components/ai-voices/Header';
import { Breadcrumb } from '../components/ai-voices/Breadcrumb';
import { NavigationTabs } from '../components/ai-voices/NavigationTabs';
import { FilterControls } from '../components/ai-voices/FilterControls';
import { VoiceTable } from '../components/ai-voices/VoiceTable';
import { Pagination } from '../components/ai-voices/Pagination';
import { Voice, FilterState } from '../types/voice';

const mockVoices: Voice[] = [
  {
    id: '1',
    name: 'Emma',
    gender: 'Female',
    language: 'English',
    languageCode: 'EN',
    accent: 'British',
    voiceDNA: 'Sp 40 / St 80 / Si 60 / Ex 20',
    tags: ['clear', 'calm', 'professional', 'warm', 'friendly'],
    flagIcon: '',
  },
  {
    id: '2',
    name: 'James',
    gender: 'Male',
    language: 'English',
    languageCode: 'EN',
    accent: 'American',
    voiceDNA: 'Sp 40 / St 80 / Si 60 / Ex 20',
    tags: ['dialogue', 'warm', 'conversational', 'friendly'],
    flagIcon: '',
  },
  {
    id: '3',
    name: 'Isabella',
    gender: 'Female',
    language: 'Italian',
    languageCode: 'IT',
    accent: 'Italian',
    voiceDNA: 'Sp 40 / St 80 / Si 60 / Ex 20',
    tags: ['calm', 'warm', 'elegant', 'sophisticated', 'melodic', 'expressive', 'natural'],
    flagIcon: '',
  },
  {
    id: '4',
    name: 'Liam',
    gender: 'Male',
    language: 'English',
    languageCode: 'EN',
    accent: 'American',
    voiceDNA: 'Sp 40 / St 80 / Si 60 / Ex 20',
    tags: ['conversational', 'warm', 'friendly', 'casual'],
    flagIcon: '',
  },
  {
    id: '5',
    name: 'Nora',
    gender: 'Female',
    language: 'German',
    languageCode: 'GE',
    accent: 'None',
    voiceDNA: 'Sp 40 / St 80 / Si 60 / Ex 20',
    tags: ['story', 'promo', 'clear', 'professional', 'authoritative', 'confident'],
    flagIcon: '',
  },
  {
    id: '6',
    name: 'Pierre',
    gender: 'Male',
    language: 'French',
    languageCode: 'FR',
    accent: 'None',
    voiceDNA: 'Sp 40 / St 80 / Si 60 / Ex 20',
    tags: ['story', 'warm', 'sophisticated', 'elegant'],
    flagIcon: '',
  },
  {
    id: '7',
    name: 'Sophia',
    gender: 'Female',
    language: 'English',
    languageCode: 'EN',
    accent: 'British',
    voiceDNA: 'Sp 40 / St 80 / Si 60 / Ex 20',
    tags: ['story', 'warm', 'elegant', 'professional', 'clear', 'sophisticated'],
    flagIcon: '',
  },
];

export default function AIVoices() {
  const [filters, setFilters] = useState<FilterState>({
    language: '',
    gender: '',
    accent: '',
    search: '',
  });
  
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredVoices = useMemo(() => {
    return mockVoices.filter((voice) => {
      const matchesLanguage = !filters.language || voice.languageCode === filters.language;
      const matchesGender = !filters.gender || voice.gender === filters.gender;
      const matchesAccent = !filters.accent || voice.accent === filters.accent;
      const matchesSearch = !filters.search || 
        voice.name.toLowerCase().includes(filters.search.toLowerCase());
      
      return matchesLanguage && matchesGender && matchesAccent && matchesSearch;
    });
  }, [filters]);

  const paginatedVoices = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredVoices.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredVoices, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredVoices.length / rowsPerPage);

  const handleEdit = (voice: Voice) => {
    console.log('Edit voice:', voice);
    // Implement edit functionality
  };

  const handleDelete = (voice: Voice) => {
    console.log('Delete voice:', voice);
    // Implement delete functionality
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
  };

  return (
    <div className="flex w-full justify-center items-center shadow-[0px_4px_0px_0px_#D6DEE6,4px_1px_14px_0px_#D6DEE6] min-h-screen bg-white pb-[35px]">
      <div className="flex w-full flex-col items-center gap-14 shrink-0 px-10 py-10 max-md:px-6 max-md:py-6 max-sm:px-4 max-sm:py-4">
        <Header />
        
        <main className="flex flex-col items-start gap-6 w-full">
          <Breadcrumb />
          
          <header className="text-[#252B2F] text-3xl font-bold leading-[39px] w-full h-16 content-between gap-1 px-0 py-2 max-sm:text-2xl">
            Audio Management
          </header>
          
          <NavigationTabs />
          
          <FilterControls filters={filters} onFiltersChange={setFilters} />
          
          <section className="flex flex-col items-end gap-6 w-full">
            <VoiceTable 
              voices={paginatedVoices} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
            />
            
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </section>
        </main>
      </div>
    </div>
  );
} 