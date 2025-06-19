import React from 'react';
import { Header } from '../components/course-stats/Header';
import { Breadcrumbs } from '../components/course-stats/Breadcrumbs';
import { PageHeader } from '../components/course-stats/PageHeader';
import { CourseStatistics } from '../components/course-stats/CourseStatistics';

export default function CourseStats() {
  return (
    <div className="flex w-full flex-col items-start gap-14 box-border bg-white mx-auto my-0 p-10 max-md:p-6 max-sm:p-4">
      <Header />
      
      <main className="flex flex-col items-start gap-6 w-full">
        <Breadcrumbs />
        <PageHeader />
      </main>
      
      <CourseStatistics />
    </div>
  );
} 