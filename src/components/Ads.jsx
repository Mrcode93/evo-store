import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchProducts } from '../redux/productsSlice';
import { useNavigate } from 'react-router-dom';

const AdsComponent = ({ ads }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
   const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch]);

  // Calculate time left until the end date
  const calculateTimeLeft = (endDate) => {
    const difference = new Date(endDate) - new Date();
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }; // If the offer has ended
    }
  };

  // Update countdown every second
  useEffect(() => {
    if (ads?.endDate) {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft(ads.endDate));
      }, 1000);

      return () => clearInterval(timer); // Clear interval on component unmount
    }
  }, [ads]);

  const discountsData = products.filter((product) => product.discount > 0);

    const handleShowMore = () => {
    navigate("/products", {
      state: { data: discountsData, title: "المنتجات الحديثة" },
    });
  };

  // Don't show the banner if the time has run out
  if (
    !ads ||
    (timeLeft.days === 0 &&
      timeLeft.hours === 0 &&
      timeLeft.minutes === 0 &&
      timeLeft.seconds === 0)
  ) {
    return null; // Hide the component if offer has expired or not available
  }

  return (
    <div className="flex items-center justify-center p-4 md:p-8">
      <div className="relative w-full max-w-6xl bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-between px-4 md:px-10 py-8 md:py-16">
          <div className="flex-1 text-center">
            <div className="grid grid-cols-2 md:grid-flow-col gap-3 md:gap-6 text-center auto-cols-max justify-center mb-6 md:mb-8">
              {[
                { value: timeLeft.days, label: "days" },
                { value: timeLeft.hours, label: "hours" },
                { value: timeLeft.minutes, label: "min" },
                { value: timeLeft.seconds, label: "sec" },
              ].map((item, index) => (
                <div key={index} className="flex flex-col p-2 md:p-3 bg-white/10 backdrop-blur-md rounded-xl text-white">
                  <span className="countdown font-mono text-2xl md:text-4xl font-bold px-2 md:px-4">
                    <span style={{ "--value": item.value }}></span>
                  </span>
                  <span className="text-xs md:text-sm mt-1">{item.label}</span>
                </div>
              ))}
            </div>
            <h3 className="text-white text-xl md:text-2xl font-bold leading-none mb-4 md:mb-6">
              {ads?.title || "عنوان العرض"}
            </h3>
            <div className="relative inline-block">
              <h1 className="text-white text-6xl md:text-8xl font-extrabold leading-none mb-4 md:mb-6">
                {ads?.discount || 0}
                <span className="text-4xl md:text-6xl align-top ml-1">%</span>
              </h1>
              <div className="absolute -inset-1 bg-white/20 blur-xl -z-10 rounded-full"></div>
            </div>
            <p className="text-xl md:text-2xl text-white/90 font-light px-4 md:px-0">
              {ads?.description || "تفاصيل العرض"}
            </p>
            <button
              onClick={handleShowMore}
              className="mt-6 md:mt-8 px-6 md:px-8 py-2 md:py-3 bg-white text-black font-bold rounded-md hover:shadow-xl transition duration-300 text-sm md:text-base"
            >
              استكشف المزيد
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

AdsComponent.propTypes = {
  ads: PropTypes.shape({
    endDate: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    discount: PropTypes.number,
    image: PropTypes.string,
  }),
};

export default AdsComponent;