import { usePagination } from "@/hooks/use-pagination";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  paginationItemsToDisplay?: number;
  onPageChange: (page: number) => void;
};

export default function PaginationComponent({
  currentPage,
  totalPages,
  paginationItemsToDisplay = 4,
  onPageChange,
}: PaginationProps) {
  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage,
    totalPages,
    paginationItemsToDisplay,
  });

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous Page */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(currentPage - 1)}
            className={
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>

        {/* Left Ellipsis */}
        {showLeftEllipsis && (
          <PaginationItem>
            <PaginationEllipsis
              onClick={() => {
                const newPage = Math.max(
                  currentPage - paginationItemsToDisplay,
                  1
                );
                onPageChange(newPage);
              }}
              className="cursor-pointer"
            />
          </PaginationItem>
        )}

        {/* Page Numbers */}
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={currentPage === page}
              onClick={() => onPageChange(page)}
              className="cursor-pointer"
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Right Ellipsis */}
        {showRightEllipsis && (
          <PaginationItem>
            <PaginationEllipsis
              onClick={() => {
                // Jump to the next page after the last visible page
                const newPage = Math.min(
                  currentPage + paginationItemsToDisplay,
                  totalPages
                );
                onPageChange(newPage);
              }}
              className="cursor-pointer"
            />
          </PaginationItem>
        )}

        {/* Next Page */}
        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(currentPage + 1)}
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
