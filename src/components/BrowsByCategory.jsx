import React, { useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Importing icons

const BrowseByCategory = ({ categories }) => {
    const scrollContainerRef = useRef(null);
    const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
  <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl md:text-xl sm:text-md border-l-4 border-accent pl-2 font-bold text-primary dark:text-secondary">
          تصفح حسب الفئة
        </h2>
        <div className="flex justify-between gap-2">
        
          <button
            onClick={scrollLeft}
            className="p-2 rounded-full bg-accent text-secondary shadow-lg"
          >
            <ChevronLeft size={24} />
                  </button>
                     <button
            onClick={scrollRight}
            className="p-2 rounded-full bg-accent text-secondary shadow-lg"
          >
            <ChevronRight size={24} />
          </button>
         
        </div>
      </div>
      <div ref={scrollContainerRef} className="flex overflow-x-scroll space-x-4">
       {categories &&
            categories.map((category) => (
              <Link
                to={`/category/${category._id}`}
                // to="category"
                key={category._id}
                className="flex-shrink-0 m-2 flex items-center justify-between border border-gray-500 rounded-md p-4 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-center">
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="w-[150px] h-[150px] object-cover rounded"
                  />
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default BrowseByCategory;