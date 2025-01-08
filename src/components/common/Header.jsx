import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiSun, FiMoon, FiMenu, FiX, FiShoppingCart, FiUser } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { getCart } from '../../redux/cartSlice';
import { ShoppingBag, House } from 'lucide-react';
import { fetchUserInfo } from "../../redux/userAuthSlice";
import { Bell ,Heart} from 'lucide-react';
import NotificationsDropdown from '../NotificationsDropdown'
import DropdownHeader from './DropDownsHeader';
import Logo from '../../assets/images/logo.svg';


const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart, cartCount } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.userAuth);
  const { notifications } = useSelector((state) => state.socket);
  const [wishlistCount, setWishlistCount] = useState(0);

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
   
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserInfo());
    }
  }, [dispatch, user]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

 useEffect(() => {
  // Function to update the wishlist count
  const updateWishlistCount = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlistCount(wishlist.length);
  };

  // Initial load
  updateWishlistCount();

  // Listen for `storage` events to detect changes in `localStorage`
  const handleStorageChange = (event) => {
    if (event.key === 'wishlist') {
      updateWishlistCount();
    }
  };

  window.addEventListener('storage', handleStorageChange);

  return () => {
    window.removeEventListener('storage', handleStorageChange);
  };
}, []);


  const handleBellClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

const isActive = (path) => {
  if (path === '/') {
    return location.pathname === '/';
  }
  return location.pathname.startsWith(path);
};


  
  return (
    <>
      {/* Desktop Header */}
      <motion.header 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="hidden md:block w-full z-50 transition-all duration-300 bg-gradient-to-l from-[#11151c] to-[#212d40]"
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <motion.div 
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
            >
              <Link to="/" className="flex items-center">
              <h1 className='title-logo'>عين الصقر</h1>
              </Link>
            </motion.div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-secondary p-2"
              >
                {isMobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
              </button>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/cart" className={`text-secondary relative hover:text-secondary dark:text-secondary ${isActive('/cart') ? 'active' : ''}`}>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-accent text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
                <ShoppingBag className="w-6 h-6" />
              </Link>
              <Link to="/wishlist" className={`text-secondary relative hover:text-secondary dark:text-secondary ${isActive('/wishlist') ? 'active' : ''}`}>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-accent text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
                <Heart className="w-6 h-6" />
              </Link>
              {notifications.length > 0 && (
                <div className="relative">
                  <Bell className="text-secondary cursor-pointer" onClick={handleBellClick} />
                  <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                  <NotificationsDropdown isOpen={isDropdownOpen} onClose={() => setIsDropdownOpen(false)} />
                </div>
              )}
              {user ? (
                <Link to="/profile" className={`text-secondary hover:text-secondary dark:text-secondary ${isActive('/profile') ? 'active' : ''}`}>
                  <FiUser className="w-6 h-6" />
                </Link>
              ) : (
                <Link to="/login" className={`text-secondary dark:text-secondary ${isActive('/login') ? 'active' : ''}`}>
                  login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden"
              >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  <Link to="/cart" className={`text-secondary  py-2 flex items-center ${isActive('/cart') ? 'active' : ''}`}>
                    <ShoppingBag className="w-6 h-6 mr-2" />
                    Cart {cartCount > 0 && <span className="ml-1">({cartCount})</span>}
                  </Link>
                  <Link to="/wishlist" className={`text-secondary  py-2 flex items-center ${isActive('/wishlist') ? 'active' : ''}`}>
                    <Heart className="w-6 h-6 mr-2" />
                    Wishlist {wishlistCount > 0 && <span className="ml-1">({wishlistCount})</span>}
                  </Link>
                  {notifications.length > 0 && (
                    <div className="text-secondary  py-2 flex items-center">
                      <Bell className="w-6 h-6 mr-2" onClick={handleBellClick} />
                      Notifications
                    </div>
                  )}
                  {user ? (
                    <Link to="/profile" className={`text-secondary block py-2 flex items-center ${isActive('/profile') ? 'active' : ''}`}>
                      <FiUser className="w-6 h-6 mr-2" />
                      Profile
                    </Link>
                  ) : (
                    <Link to="/login" className={`text-secondary block py-2 ${isActive('/login') ? 'active' : ''}`}>
                      Login
                    </Link>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 shadow-gray-800 border-t border-white bg-gradient-to-l from-[#11151c] to-[#212d40] shadow-md">
        <div className="flex justify-around items-center h-16">
          <Link to="/" className={`flex flex-col items-center py-2 text-secondary ${isActive('/') ? 'active' : ''}`}>
            <House />
            </Link>
          
          <Link to="/cart" className={`flex flex-col items-center py-2 text-secondary relative ${isActive('/cart') ? 'active' : ''}`}>
            <ShoppingBag className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-accent text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          
          <Link to="/wishlist" className={`flex flex-col items-center py-2 text-secondary relative ${isActive('/wishlist') ? 'active' : ''}`}>
            <Heart className="w-6 h-6" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-accent text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {notifications.length > 0 ? (
            <div className="flex flex-col items-center py-2 text-secondary relative">
              <Bell className="w-6 h-6" onClick={handleBellClick} />
              <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
             
            </div>
          ) : null}

          {user ? (
            <Link to="/profile" className={`flex flex-col items-center py-2 text-secondary ${isActive('/profile') ? 'active' : ''}`}>
              <FiUser className="w-6 h-6" />
            </Link>
          ) : (
            <Link to="/login" className={`flex flex-col items-center py-2 text-secondary ${isActive('/login') ? 'active' : ''}`}>
              <FiUser className="w-6 h-6" />
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile Notifications Dropdown */}
      <AnimatePresence>
        {isDropdownOpen && (
          <NotificationsDropdown isOpen={isDropdownOpen} onClose={() => setIsDropdownOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;