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
    <motion.footer 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-secondary dark:bg-primary text-primary dark:text-secondary"
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {/* About Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.h3 
              className="text-2xl font-bold"
              whileHover={{ scale: 1.05 }}
            >
              Evo Store
            </motion.h3>
            <p className="text-neutral">
              Your one-stop destination for quality products and exceptional service.
            </p>
          </motion.div>

       

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-xl font-bold">Contact Us</h3>
            <ul className="space-y-4">
              {[
                { Icon: FiMapPin, text: "123 Store Street, City, Country" },
                { Icon: FiPhone, text: "+1 234 567 890" },
                { Icon: FiMail, text: "contact@evostore.com" }
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-3"
                >
                  <item.Icon className="text-accent" />
                  <span className="text-neutral">{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          {/* About Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-xl font-bold">
              سياسات الموقع
            </h3>
            <div className=' flex flex-col'>
              
           
  {/* Links */}
  <Link to={"/terms"} className="text-neutral hover:text-primary transition-colors duration-300">
    الشروط والأحكام
  </Link>
  <Link to={"/privacy"} className="text-neutral hover:text-primary transition-colors duration-300">
    سياسة الخصوصية
              </Link>
               </div>
</motion.div>


         
        </motion.div>

        {/* Social Links */}
        <motion.div 
          variants={itemVariants}
          className="mt-12 pt-12 border-t border-primary/10 dark:border-secondary/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <motion.div 
              variants={itemVariants}
              className="text-neutral"
            >
              © 2024 Evo Store. All rights reserved.
            </motion.div>
            <div className="flex space-x-6">
              {[FiFacebook, FiTwitter, FiInstagram, FiLinkedin].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  variants={socialVariants}
                  whileHover="hover"
                  className="text-neutral hover:text-accent transition-colors duration-300"
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;