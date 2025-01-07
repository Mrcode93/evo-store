// src/pages/AllProductsPage.js
import { useLocation, Link } from "react-router-dom";
import ProductCard from "../components/products/ProductCard";
import BackBtn from "../components/common/BackBtn";
import { motion } from "framer-motion";

const AllProductsPage = () => {
  const location = useLocation();
  const data = location.state?.data || [];
  const title = location.state?.title || "All Products";

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

  return (
    <div className="bg-gray-100 relative min-h-screen py-8">
      <BackBtn />
      <div className="mx-2  mt-6">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-2 items-center justify-start"
        >
          {data.map((product) => (
            <motion.div
              key={product._id}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <ProductCard product={product} link />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AllProductsPage;