import React, { useEffect, useState } from 'react';
import './pagination.css';
import ReactPaginate from 'react-paginate';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const PaginationOrder = ({ total, getPage, order }) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1); // Initialize current page to 1
console.log(total)
  useEffect(() => {
    setCurrentPage(1); // Reset current page to 1 when order changes
    getPage(1); // Get data for page 1
  }, [order]); // Listen for changes in the order object

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1); // Update current page when a new page is clicked
    getPage(data.selected + 1, order); // Call getPage function with the new page number and order object
  };

  return (
    <Row>
      <Col>
        <ReactPaginate
          breakLabel="..."
          nextLabel={t('pagination_next')}
          onPageChange={handlePageClick}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          pageCount={total}
          previousLabel={t('pagination_previous')}
          containerClassName={'pagination justify-content-center p-3'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          nextClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextLinkClassName={'page-link'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          activeClassName={'active'}
          forcePage={currentPage - 1} // Set the initial page to currentPage - 1
        />
      </Col>
    </Row>
  );
};

export default PaginationOrder;
