import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/products/ProductCard';
import BackBtn from '../components/common/BackBtn';
const ProductsByCategory = ({ products }) => {
  const { id } = useParams(); // Get the category ID from URL parameters
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    console.log(products);
    // Filter products based on the category array if it includes this id or not
    const filtered = products?.filter((product) => product.categories.includes(id));
    setFilteredProducts(filtered);
  }, [id, products]);

  return (
    <div className="bg-gray-100 relative min-h-screen py-8">
      <BackBtn />
      <div className="container mx-auto px-4  mt-6">
        <h2 className="text-2xl md:text-3xl sm:text-xl border-l-4 border-accent pl-4 font-bold text-primary dark:text-secondary mb-8">
          المنتجات
        </h2>
        <div className="flex justify-left align-center gap-4 flex-wrap">
          {filteredProducts.map((product) => (
            <motion.div
              key={product._id}
              className="flex-shrink-0 w-full sm:w-64 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <ProductCard product={product} link />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsByCategory;