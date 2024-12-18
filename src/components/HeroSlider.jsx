import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const HeroSlider = ({ images }) => {
  const [current, setCurrent] = useState(0);

  const imageUrls = images.map(image => image.imageUrl[0]);

  const nextSlide = () => {
    setCurrent((prev) => (prev === imageUrls.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? imageUrls.length - 1 : prev - 1));
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    }),
  };

  return (
    <div className="relative bg-white w-full h-full overflow-hidden">
      <AnimatePresence initial={false} custom={current}>
        <motion.img
          key={current}
          src={imageUrls[current]}
          custom={current}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute w-full h-full object-contain"
        />
      </AnimatePresence>
      <div className="absolute inset-0 flex justify-between items-center p-4">
        <button
          onClick={prevSlide}
          className="p-2 bg-primary/50 dark:bg-secondary/50 rounded-full text-secondary dark:text-primary hover:bg-primary/70 dark:hover:bg-secondary/70 transition-colors"
        >
          <FiChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="p-2 bg-primary/50 dark:bg-secondary/50 rounded-full text-secondary dark:text-primary hover:bg-primary/70 dark:hover:bg-secondary/70 transition-colors"
        >
          <FiChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default HeroSlider;