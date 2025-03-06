import React, { FC } from "react";

interface BreadcrumbTrailProps {
  pageCount: number;
  currentPage: number; // zero-based index
  onPageChange: (pageIndex: number) => void;
}

const BreadcrumbTrail: FC<BreadcrumbTrailProps> = ({
  pageCount,
  currentPage,
  onPageChange,
}) => {
  if (pageCount <= 1) return null; // If there's only one page, no need for breadcrumbs

  return (
    <div className="flex items-center justify-center space-x-2 mt-1">
      {Array.from({ length: pageCount }).map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index)}
          className={`w-2 h-2 rounded-full ${
            index === currentPage
              ? "bg-[#00847c]"
              : "bg-gray-300 hover:bg-gray-400"
          } transition-colors duration-200`}
          aria-label={`Go to page ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default BreadcrumbTrail;
