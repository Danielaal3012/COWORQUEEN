import React from "react";
import { Button } from "./UI/button.jsx";

export function Pagination({ totalRecords, limit, onPageChange, offset }) {
  const totalPages = Math.ceil(totalRecords / limit);
  const pageNumbers = [];
  const currentPage = offset / limit + 1;

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  console.log({ currentPage, offset, limit });

  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <div className="pagination flex justify-between mt-4">
      <Button
        disabled={currentPage === 1}
        onClick={() => handlePageClick(currentPage - 1)}
      >
        Anterior
      </Button>
      {pageNumbers.map((pageNumber) => (
        <button key={pageNumber} onClick={() => handlePageClick(pageNumber)}>
          {pageNumber}
        </button>
      ))}
      <Button
        disabled={currentPage === totalPages}
        onClick={() => handlePageClick(currentPage + 1)}
      >
        Siguiente
      </Button>
    </div>
  );
}
