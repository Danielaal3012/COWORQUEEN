import React from "react";
import { Button } from "./UI/button.jsx";

export function Pagination({ totalRecords, limit, onPageChange }) {
  const totalPages = Math.ceil(totalRecords / limit);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <div className="pagination flex justify-between mt-4">
      <Button
        disabled={pageNumbers[0] === 1}
        onClick={() => handlePageClick(pageNumbers[0] - 1)}
      >
        Anterior
      </Button>
      {pageNumbers.map((pageNumber) => (
        <button key={pageNumber} onClick={() => handlePageClick(pageNumber)}>
          {pageNumber}
        </button>
      ))}
      <Button disabled={pageNumbers[pageNumbers.length - 1] === totalPages}>
        Siguiente
      </Button>
    </div>
  );
}
