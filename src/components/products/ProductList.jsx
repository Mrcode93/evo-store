import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchProducts } from '../../redux/productsSlice';
import ProductCard from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';  // Importing the icons
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

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

   const handleShowMore = () => {
    navigate("/products", {
      state: { data: products, title: "المنتجات الحديثة" },
    });
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto px-6 py-12"
    >
      <div className="flex items-center justify-between mb-8">
       <h2 className="text-xl md:text-xl sm:text-md border-l-4 border-accent pl-2 font-bold text-primary dark:text-secondary">
            المنتجات
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
        {products.map((product) => (
          <motion.div key={product._id} variants={itemVariants} className="flex-shrink-0">
            <ProductCard product={product} link />
          </motion.div>
        ))}
                {products && products.length > 7 && (
          <button
            onClick={handleShowMore}
            className="mt-6 bg-primary h-fit w-fit text-white px-6 py-3 rounded-md font-semibold"
          >
            عرض المزيد ...
          </button>
        )}

      </div>
    </motion.div>
  );
};

export default ProductList;
