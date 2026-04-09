 'use client'
import { usePagination } from '@/hooks/usePagination';
import PaginationPage from '@/pages/Pagination'
import React from 'react'

const Pagination = () => {
      const data = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);

     const {
    currentPage,
    totalPages,
    currentData,
    goToPage
  } = usePagination(data, 5);
  return (
    <div>
      <h2>Pagination Example</h2>

      {currentData.map((item, index) => (
        <div key={index}>{item}</div>
      ))}

      <PaginationPage
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
      />
    </div>
  )
}

export default Pagination