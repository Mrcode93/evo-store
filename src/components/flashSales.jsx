import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fetchFlashSales } from "../redux/flashSalesSlice";
import { addItemToCart } from "../redux/cartSlice";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./products/ProductCard";

const FlashSales = ({ user }) => {
  const dispatch = useDispatch();
  const { flashSales, loading, error } = useSelector((state) => state.flashSales);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    dispatch(fetchFlashSales());
  }, [dispatch]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  if (loading === "loading") {
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

  if (!Array.isArray(flashSales) || flashSales.length === 0) {
    return null;
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
          صفقات اليوم
        </h2>
        <div className="flex gap-2">
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
        {flashSales.map((sale) =>
          sale.products
            ?.filter((product) => product?._id)
            .map((product) => (
              <motion.div key={product._id} variants={itemVariants} className="flex-shrink-0 w-64">
                <ProductCard product={product} handleAddToCart={() => dispatch(addItemToCart(product))} link />
              </motion.div>
            ))
        )}
      </div>
    </motion.div>
  );
};

export default FlashSales;
