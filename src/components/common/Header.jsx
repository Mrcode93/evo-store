import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSun, FiMoon, FiMenu, FiX, FiShoppingCart, FiUser } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { getCart } from '../../redux/cartSlice';
import { ShoppingBag } from 'lucide-react';
import { fetchUserInfo } from "../../redux/userAuthSlice";
import { Bell } from 'lucide-react';
import NotificationsDropdown from '../NotificationsDropdown'
import Logo from '../../assets/images/mylogo.png';


const Header = () => {
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { cart, cartCount } = useSelector((state) => state.cart);

  const { user } = useSelector((state) => state.userAuth);
  const { notifications } = useSelector((state) => state.socket);

  const containerVariants = {
    hidden: { y: -100 },
    visible: { 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1
      }
    }
  };

  useEffect(() => {
    dispatch(getCart());
    dispatch(fetchUserInfo());
  }, [dispatch]);
    useEffect(() => {
  console.log("Notifications updated:", notifications);
}, [notifications]);



  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBellClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <motion.header 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`fixed w-full z-50 transition-all duration-300  bg-gradient-to-l from-[#065A82] to-[#0A9396]`}
    >
      <nav className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <motion.div 
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
          >
            <Link to="/" className="text-2xl font-bold text-secondary hover:text-secondary  dark:text-secondary font-sans">
             {/* <img src={Logo} className="w-20 h-20 drop-shadow-sm" style={{ filter: 'drop-shadow(0 1px  white)' }} alt="" />
              */}
              Store
            </Link>
          </motion.div>

          <div className=" flex items-center space-x-6">
            <Link to="/cart" className="text-secondary relative hover:text-secondary dark:text-secondary">
              {/* Badge of cart items number */}
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-accent text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              <ShoppingBag className="w-6 h-6" />
            </Link>

            {
              <div className="relative">
            <Bell className="text-secondary cursor-pointer" onClick={handleBellClick} />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
            )}
            <NotificationsDropdown isOpen={isDropdownOpen} onClose={() => setIsDropdownOpen(false)} />
          </div>
            }
            {user ? (
              <Link to="/profile" className="text-secondary hover:text-secondary  dark:text-secondary">
                <FiUser className="w-6 h-6" />
              </Link>
            ) : (
              <Link to="/login" className="text-secondary dark:text-secondary">
                login
              </Link>
            )}
          </div>

          
        </div>

      </nav>
    </motion.header>
  );
};

export default Header;