import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import { useDispatch , useSelector} from 'react-redux';
import { addItemToCart } from '../../redux/cartSlice';
import { ShoppingBag, Heart } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { showToast } from '../../utils/Toast';
import { fetchUserInfo } from '../../redux/userAuthSlice';
import { useEffect } from 'react';
import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ProductCard = ({ product, link }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userAuth);
  const [isWished, setIsWished] = useState(false);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserInfo());
    }
    // check if the product is in the wishlist
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishedItem = wishlist.find((item) => item.productId === product._id);
    setIsWished(!!wishedItem);
  }, [dispatch, user, product._id]);

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
      userId: user?._id || null,
      id: cartId,
      productId: product._id,
      quantity: 1,
    };

    dispatch(addItemToCart(cartItem)).then(() => {
      showToast('تمت إضافة المنتج إلى السلة', 'success');
    });
  };

const toggleWishlistFunction = (e) => {
  e.stopPropagation();
  e.preventDefault();

  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

  if (isWished) {
    wishlist = wishlist.filter((item) => item.productId !== product._id);
    setIsWished(false);
    showToast('تمت إزالة المنتج من قائمة المفضلة', 'success');
  } else {
    const wishlistItem = {
      userId: user?._id || null,
      productId: product._id,
    };
    wishlist.push(wishlistItem);
    setIsWished(true);
    showToast('تمت إضافة المنتج إلى قائمة المفضلة', 'success');
  }

  localStorage.setItem('wishlist', JSON.stringify(wishlist));
};
// 

  const cardContent = (
    <motion.div className="bg-white p-1 h-[310px] w-[215px] md:w-[210px] relative dark:bg-gray-800 border-[2px] rounded-lg shadow-sm shadow-secondary overflow-hidden group">
      {product.discount ? (
        <div className="discount-label z-10">
          <div className="discount-content">
            <span className="text-xs xsm:text-sm">{product.discount}% OFF</span>
          </div>
        </div>
      ) : null}

      <LazyLoadImage 
        src={product.images[0]}
        alt={product.name}
        className="w-fit object-cover item"
      />
      <div className="px-2">
        <h3 className="text-[14px]  font-semibold text-primary dark:text-secondary line-clamp-2">
          {product.name}
        </h3>
        <div className="flex justify-between items-center mt-2 xsm:mt-4">
          {product.discount ? (
            <>
              <span className="text-[10px] xsm:text-sm text-gray-500 line-through">
                {product.price} د.ع
              </span>
              <span className="text-[10px] xsm:text-sm md:text-base text-primary font-semibold">
                {product.price - (product.price * product.discount) / 100} د.ع
              </span>
            </>
          ) : (
            <span className="text-[10px] xsm:text-sm md:text-base text-primary font-semibold">
              {product.price} د.ع
            </span>
          )}
         <div className="flex rounded-bl-none rounded-br-md p-1 xsm:p-2 absolute bg-gray-200/30 h-fit gap-2 xsm:gap-4 left-0 top-0 flex-col items-center justify-between transition-opacity duration-300 border-r-2 border-b-2 backdrop-blur-sm backdrop-filter">

    <ShoppingBag
      className="w-4 h-4 xsm:w-5 xsm:h-5 md:w-6 md:h-6 text-primary cursor-pointer"
      onClick={addItemToCartFunction}
    />
    <Heart
      className={`w-4 h-4 xsm:w-5 xsm:h-5 md:w-6 md:h-6 cursor-pointer ${
        isWished ? 'text-red-600' : 'text-primary'
      }`}
      onClick={toggleWishlistFunction}
    />
  </div>

        </div>
      </div>
    </motion.div>
  )

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
    discount: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  link: PropTypes.bool,
};

export default ProductCard;
