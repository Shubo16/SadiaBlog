import React from "react";

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-2 my-4">
      <button
      type="button"
        onClick={() => handlePageChange(1)}
        className="px-3 py-1 rounded border border-gray-300 hover:bg-jadeGreen hover:text-white"
      >
        First
      </button>
      <button
      type="button"
        onClick={() => handlePageChange(currentPage - 1)}
        className="px-3 py-1 rounded border border-gray-300 hover:bg-jadeGreen hover:text-white"
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className="px-3 py-1 rounded border border-gray-300 hover:bg-jadeGreen hover:text-white"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
      <button
        onClick={() => handlePageChange(totalPages)}
        className="px-3 py-1 rounded border border-gray-300 hover:bg-jadeGreen hover:text-white"
      >
        Last
      </button>
    </div>
  );
};

export default PaginationComponent;
