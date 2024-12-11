import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLatestProducts } from '../../redux/productsSlice';
import ProductCard from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Importing icons
import { motion } from 'framer-motion';
const LatestProductsList = () => {
  const dispatch = useDispatch();
  const { latest, loading, error } = useSelector((state) => state.products);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    dispatch(fetchLatestProducts());
  }, [dispatch]);

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

  if (loading) {
    return (
      // skeleton card for loading state
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
            <div className="w-full bg-gray-300 dark:bg-gray-700 h-60 animate-pulse" />
            <div className="p-4 space-y-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 w-3/4 animate-pulse" />
              <div className="h-4 bg-gray-300 dark:bg-gray-700 w-1/4 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl md:text-xl sm:text-md border-l-4 border-accent pl-2 font-bold text-primary dark:text-secondary">
          المنتجات الأحدث
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
        {latest.map((product) => (
          <motion.div key={product._id}  className="flex-shrink-0 w-64">
            <ProductCard product={product} link />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LatestProductsList;
