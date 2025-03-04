import React, { FC, useState } from "react";
import CardComponent from "./primitives/CardComponent";
import BreadcrumbTrail from "./primitives/BreadcrumbTrail";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface CardData {
  title: string;
  content: string;
  status: "success" | "warning" | "danger";
}

interface CardsSectionProps {
  cardsData: CardData[];
}

const CardsSection: FC<CardsSectionProps> = ({ cardsData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex = Math.max(cardsData.length - 2, 0);

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const pageCount = maxIndex + 1;

  return (
    <div className="h-[20%] flex flex-col relative group">
      {/* Outer container for cards with overflow hidden */}
      <div className="py-1 relative flex-1 overflow-x-hidden">
        {/* Left Arrow Button */}
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 shadow group-hover:opacity-100 opacity-0 transition-opacity z-10"
            aria-label="Previous card"
          >
            <FiChevronLeft className="h-5 w-5 text-primary" />
          </button>
        )}

        {/* Right Arrow Button */}
        {currentIndex < maxIndex && (
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 shadow group-hover:opacity-100 opacity-0 transition-opacity z-10"
            aria-label="Next card"
          >
            <FiChevronRight className="h-5 w-5 text-primary" />
          </button>
        )}

        {/* Sliding container with cards */}
        <div
          className="flex h-full w-full transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 50}%)` }}
        >
          {cardsData.map((card, index) => (
            <div key={index} className="w-1/2 flex-shrink-0 px-1">
              <CardComponent
                title={card.title}
                description={card.content}
                status={card.status}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Breadcrumb Trail */}
      <div className="mb-2 flex items-center">
        <BreadcrumbTrail
          pageCount={pageCount}
          currentPage={currentIndex}
          onPageChange={setCurrentIndex}
        />
      </div>
    </div>
  );
};

export default CardsSection;
