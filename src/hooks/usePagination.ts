import { useState, useEffect, useMemo } from "react";

interface UsePaginationProps {
  items: any[];
  itemsPerPage: number;
  dependencies?: any[];
}

export const usePagination = ({
  items,
  itemsPerPage,
  dependencies = [],
}: UsePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 when dependencies change
  useEffect(() => {
    setCurrentPage(1);
  }, dependencies);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Calculate paginated items
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  }, [items, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    currentPage,
    totalPages,
    paginatedItems,
    handlePageChange,
  };
};
