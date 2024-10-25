import React from 'react';
import './index.css';

const Pagination = ({ handlePrevPage, handleNextPage, currentPage, totalItems, productsPerPage, indexOfLastProduct }) => {
    const totalPages = Math.ceil(totalItems / productsPerPage);

    return (
        <div className="pagination">
            <button className='btn-prev' onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
            <span>{currentPage} of {totalPages}</span>
            <button className='btn-next' onClick={handleNextPage} disabled={currentPage >= totalPages}>Next</button>
        </div>
    );
};

export default Pagination;