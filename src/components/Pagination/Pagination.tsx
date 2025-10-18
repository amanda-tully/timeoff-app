import { IonButton, IonIcon } from "@ionic/react";
import { chevronBack, chevronForward } from "ionicons/icons";
import "./Pagination.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  // Helper to generate page numbers with ellipsis if needed
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        );
      }
    }
    return pages;
  };

  return (
    <div className="pagination-container">
      <IonButton
        className="pagination-arrow"
        size="small"
        fill="clear"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous Page"
      >
        <IonIcon icon={chevronBack} />
      </IonButton>
      {getPageNumbers().map((page, idx) =>
        typeof page === "number" ? (
          <IonButton
            key={page}
            className={
              page === currentPage
                ? "pagination-number pagination-number-active"
                : "pagination-number"
            }
            size="small"
            fill="clear"
            onClick={() => onPageChange(page)}
            disabled={page === currentPage}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </IonButton>
        ) : (
          <span key={`ellipsis-${idx}`} className="pagination-ellipsis">
            …
          </span>
        ),
      )}
      <IonButton
        className="pagination-arrow"
        size="small"
        fill="clear"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next Page"
      >
        <IonIcon icon={chevronForward} />
      </IonButton>
    </div>
  );
}
