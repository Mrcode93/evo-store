import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ProductList from '../components/products/ProductList';
import LatestProductsList from '../components/products/LatestProductsList';
import HeroSlider from '../components/HeroSlider';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import AdsComponent from '../components/Ads';
import BrowseByCategory from '../components/BrowsByCategory';
import ChatBot from '../components/Chatbot';

const HomePage = ({products, latest, ads ,categories, flashSales, userInfo, cart}) => {
  const { heroImages } = useSelector(state => state.heroImages);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.3 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen relative bg-gray-100 dark:bg-primary"
     
      >
      <Header cart={cart} />
           <ChatBot />
      {/* Hero Section */}
      <section className="w-full h-[80vh] relative">
        <HeroSlider images={heroImages} />
      </section>
   

      {/* Featured Products */}
      <section className="p-2">
        <div className="max-w-7xl mx-auto ">
          <BrowseByCategory categories={categories}  />
          <AdsComponent ads={ads} />
          
          <LatestProductsList latest={latest} />
          <ProductList products={products} />
        </div>
          </section>
          <Footer />
    </motion.div>
  );
};

// HomePage.propTypes = {
//   products: PropTypes.array.isRequired,
//   latest: PropTypes.array.isRequired,
//   ads: PropTypes.array,
//   categories: PropTypes.array.isRequired,
//   flashSales: PropTypes.array,
//   userInfo: PropTypes.object,
//   cart: PropTypes.object
// };

export default HomePage;