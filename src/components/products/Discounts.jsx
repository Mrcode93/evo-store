import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchProducts } from '../../redux/productsSlice';
import ProductCard from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Discounts = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    dispatch(fetchProducts());
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
      <div className="flex overflow-x-scroll space-x-4">
        {[1, 2, 3, 4, 5].map((n) => (
          <div key={n} className="flex-shrink-0 w-64 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
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
          العروض والتخفيضات
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
      <div ref={scrollContainerRef} className="flex overflow-x-scroll gap-2">
              {
                  //   show products with discount
                    products.filter(product => product.discount > 0).map(product => (
                           <motion.div key={product._id}  className="flex-shrink-0">
                                   <ProductCard product={product} link />
                                 </motion.div>
                    ))
                  
        }
      </div>
    </div>
  );
};

export default Discounts;
