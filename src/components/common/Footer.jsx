import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
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

  const socialVariants = {
    hover: { scale: 1.1, rotate: 5 }
  };

  return (
    <footer className="bg-gradient-to-l from-[#11151c] to-[#212d40] text-gray-100" dir='rtl'>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <motion.div
            variants={itemVariants}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-secondary mb-6">عين الصقر</h3>
            <p className="text-gray-300 max-w-sm">
              نحن نقدم أفضل المنتجات بأعلى جودة وأفضل الأسعار لعملائنا الكرام
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={itemVariants}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-secondary mb-6">روابط سريعة</h3>
            <nav className="flex flex-col space-y-3">
              <Link to="/terms" className="text-gray-300 hover:text-secondary transition-colors duration-300">
                الشروط والأحكام
              </Link>
              <Link to="/privacy" className="text-gray-300 hover:text-secondary transition-colors duration-300">
                سياسة الخصوصية
              </Link>
            </nav>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={itemVariants}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-secondary mb-6">تواصل معنا</h3>
            <ul className="space-y-4">
              {[
                { Icon: FiMapPin, text: "123 شارع المتجر، المدينة" },
                { Icon: FiPhone, text: "+966 123 456 789" },
                { Icon: FiMail, text: "contact@evostore.com" }
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-3 text-gray-300"
                >
                  <item.Icon className="text-secondary" />
                  <span>{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Social Media & Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-4">
              {[FiFacebook, FiTwitter, FiInstagram, FiLinkedin].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover="hover"
                  variants={socialVariants}
                  className="text-gray-300 hover:text-secondary transition-colors duration-300"
                >
                  <Icon size={24} />
                </motion.a>
              ))}
            </div>
            <p className="text-gray-400 text-sm">
              جميع الحقوق محفوظة © {new Date().getFullYear()} - Ayn-Alsakar Industries Ltd
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;