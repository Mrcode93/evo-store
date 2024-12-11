import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import { useDispatch , useSelector} from 'react-redux';
import { addItemToCart } from '../../redux/cartSlice';
import { ShoppingBag, RefreshCcw, Heart } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { showToast } from '../../utils/Toast';
import { fetchUserInfo } from '../../redux/userAuthSlice';
import { useEffect } from 'react';
const ProductCard = ({ product, link }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userAuth);

  useEffect(() => {
    dispatch(fetchUserInfo())
  },[dispatch])
  

  const addItemToCartFunction = (e) => {
    // Prevent navigation to product details when the button is clicked
    e.stopPropagation();
    e.preventDefault();

    // Check if cartId exists in localStorage
    let cartId = localStorage.getItem('cartId');

    // If cartId doesn't exist, generate a new one and store it in localStorage
    if (!cartId) {
      cartId = uuidv4();
      localStorage.setItem('cartId', cartId);
    }

    const cartItem = {
      userId: user?._id ||null,
      id: cartId,
      productId: product._id,
      quantity: 1,
    };

    dispatch(addItemToCart(cartItem)).then(() => {
      showToast('تمت إضافة المنتج إلى السلة', 'success');
    }
    );
  };

  const cardContent = (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-secondary p-2 h-[340px] relative dark:bg-gray-800 border-gray-200 border-[2px] rounded-lg shadow-sm shadow-secondary overflow-hidden group"
    >
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-48 object-contain"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-primary dark:text-secondary">
          {product.name}
        </h3>
        <div className="flex justify-between items-center mt-4">
          <span className="text-accent font-bold" dir="rtl">
            {product.price} <span>د.ع</span>
          </span>
          <div className="flex rounded-sm p-2 absolute bg-gray-200 h-[40%] left-0 top-10 flex-col items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ShoppingBag className="w-6 h-6 text-primary" onClick={addItemToCartFunction} />
            <RefreshCcw className="w-6 h-6 text-primary" />
            <Heart className="w-6 h-6 text-primary" />
          </div>
        </div>
      </div>
    </motion.div>
  );

  return link ? (
    <Link to={`/product/${product._id}`} >
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  link: PropTypes.bool,
};

export default ProductCard;
