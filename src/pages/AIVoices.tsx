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
  {
    id: '8',
    name: 'Marco',
    gender: 'Male',
    language: 'Italian',
    languageCode: 'IT',
    accent: 'Italian',
    voiceDNA: 'Sp 50 / St 70 / Si 80 / Ex 30',
    tags: ['passionate', 'expressive', 'dramatic', 'warm'],
    flagIcon: '',
  },
  {
    id: '9',
    name: 'Charlotte',
    gender: 'Female',
    language: 'French',
    languageCode: 'FR',
    accent: 'None',
    voiceDNA: 'Sp 30 / St 90 / Si 50 / Ex 40',
    tags: ['elegant', 'sophisticated', 'calm', 'professional'],
    flagIcon: '',
  },
  {
    id: '10',
    name: 'Hans',
    gender: 'Male',
    language: 'German',
    languageCode: 'GE',
    accent: 'None',
    voiceDNA: 'Sp 60 / St 80 / Si 40 / Ex 20',
    tags: ['authoritative', 'clear', 'professional', 'confident'],
    flagIcon: '',
  },
  {
    id: '11',
    name: 'Aria',
    gender: 'Female',
    language: 'English',
    languageCode: 'EN',
    accent: 'American',
    voiceDNA: 'Sp 45 / St 75 / Si 70 / Ex 35',
    tags: ['youthful', 'energetic', 'friendly', 'casual'],
    flagIcon: '',
  },
  {
    id: '12',
    name: 'Oliver',
    gender: 'Male',
    language: 'English',
    languageCode: 'EN',
    accent: 'British',
    voiceDNA: 'Sp 35 / St 85 / Si 55 / Ex 25',
    tags: ['refined', 'professional', 'clear', 'authoritative'],
    flagIcon: '',
  },
  {
    id: '13',
    name: 'Giulia',
    gender: 'Female',
    language: 'Italian',
    languageCode: 'IT',
    accent: 'Italian',
    voiceDNA: 'Sp 40 / St 70 / Si 85 / Ex 45',
    tags: ['melodic', 'warm', 'expressive', 'natural'],
    flagIcon: '',
  },
  {
    id: '14',
    name: 'Antoine',
    gender: 'Male',
    language: 'French',
    languageCode: 'FR',
    accent: 'None',
    voiceDNA: 'Sp 50 / St 80 / Si 60 / Ex 30',
    tags: ['sophisticated', 'warm', 'cultured', 'smooth'],
    flagIcon: '',
  },
  {
    id: '15',
    name: 'Ingrid',
    gender: 'Female',
    language: 'German',
    languageCode: 'GE',
    accent: 'None',
    voiceDNA: 'Sp 55 / St 85 / Si 45 / Ex 15',
    tags: ['precise', 'clear', 'professional', 'efficient'],
    flagIcon: '',
  },
  {
    id: '16',
    name: 'Ryan',
    gender: 'Male',
    language: 'English',
    languageCode: 'EN',
    accent: 'American',
    voiceDNA: 'Sp 60 / St 70 / Si 75 / Ex 40',
    tags: ['casual', 'friendly', 'conversational', 'relaxed'],
    flagIcon: '',
  },
  {
    id: '17',
    name: 'Victoria',
    gender: 'Female',
    language: 'English',
    languageCode: 'EN',
    accent: 'British',
    voiceDNA: 'Sp 30 / St 90 / Si 50 / Ex 20',
    tags: ['elegant', 'refined', 'professional', 'sophisticated'],
    flagIcon: '',
  },
  {
    id: '18',
    name: 'Lorenzo',
    gender: 'Male',
    language: 'Italian',
    languageCode: 'IT',
    accent: 'Italian',
    voiceDNA: 'Sp 65 / St 75 / Si 70 / Ex 50',
    tags: ['passionate', 'dramatic', 'expressive', 'warm'],
    flagIcon: '',
  },
  {
    id: '19',
    name: 'Camille',
    gender: 'Female',
    language: 'French',
    languageCode: 'FR',
    accent: 'None',
    voiceDNA: 'Sp 40 / St 80 / Si 65 / Ex 35',
    tags: ['elegant', 'smooth', 'sophisticated', 'warm'],
    flagIcon: '',
  },
  {
    id: '20',
    name: 'Klaus',
    gender: 'Male',
    language: 'German',
    languageCode: 'GE',
    accent: 'None',
    voiceDNA: 'Sp 70 / St 85 / Si 40 / Ex 10',
    tags: ['authoritative', 'precise', 'clear', 'commanding'],
    flagIcon: '',
  },
  {
    id: '21',
    name: 'Grace',
    gender: 'Female',
    language: 'English',
    languageCode: 'EN',
    accent: 'American',
    voiceDNA: 'Sp 35 / St 85 / Si 80 / Ex 30',
    tags: ['gentle', 'warm', 'caring', 'soft'],
    flagIcon: '',
  },
  {
    id: '22',
    name: 'Sebastian',
    gender: 'Male',
    language: 'English',
    languageCode: 'EN',
    accent: 'British',
    voiceDNA: 'Sp 45 / St 90 / Si 55 / Ex 20',
    tags: ['distinguished', 'professional', 'clear', 'refined'],
    flagIcon: '',
  },
  {
    id: '23',
    name: 'Francesca',
    gender: 'Female',
    language: 'Italian',
    languageCode: 'IT',
    accent: 'Italian',
    voiceDNA: 'Sp 50 / St 75 / Si 90 / Ex 40',
    tags: ['melodic', 'expressive', 'natural', 'warm'],
    flagIcon: '',
  },
  {
    id: '24',
    name: 'Philippe',
    gender: 'Male',
    language: 'French',
    languageCode: 'FR',
    accent: 'None',
    voiceDNA: 'Sp 55 / St 80 / Si 65 / Ex 25',
    tags: ['sophisticated', 'cultured', 'smooth', 'professional'],
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
              totalItems={filteredVoices.length}
              itemsPerPage={rowsPerPage}
              onItemsPerPageChange={handleRowsPerPageChange}
            />
          </section>
        </main>
      </div>
    </div>
  );
} 