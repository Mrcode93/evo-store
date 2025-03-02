import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  removeItemFromCart,
  updateQuantity,
  removeAllItemsFromCart,
} from "../redux/cartSlice"; // Ensure this is the correct path
import { Link, useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import PropTypes from 'prop-types';
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import EmptyImage from "../assets/images/cartEmpty.jpg";
import { showToast } from '../utils/Toast';
import Modal from '../components/common/Modal';
import BackBtn from '../components/common/BackBtn';
import { fetchUserInfo } from "../redux/userAuthSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.userAuth);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCart());
    dispatch(fetchUserInfo());
  }, [dispatch]);

  useEffect(() => {
    if (cart.length > 0) {
      setTotalPrice(
        cart.reduce((total, item) => total + item.price * item.quantity, 0)
      );
    } else {
      setTotalPrice(0);
    }
  }, [cart]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleRemoveItem = (productId) => {
    dispatch(removeItemFromCart(productId)).then(() => {
      showToast("تمت إزالة المنتج من السلة", "success");
      dispatch(getCart()); // Refresh the cart data
    });
  };

  const handleDecreaseQuantity = (productId, quantity) => {
    if (quantity > 1) {
      dispatch(
        updateQuantity({
          productId,
          quantity: quantity - 1,
        })
      ).then(() => {
        dispatch(getCart()); // Refresh the cart data
      });
    }
  };

  const handleIncreaseQuantity = (productId, quantity) => {
    dispatch(
      updateQuantity({
        productId,
        quantity: quantity + 1,
      })
    ).then(() => {
      dispatch(getCart()); // Refresh the cart data
    });
  };

  const handleClearCart = () => {
    setShowModal(true);
  };

  const handleConfirmClearCart = () => {
    dispatch(removeAllItemsFromCart()).then(() => {
      dispatch(getCart()); // Refresh the cart data
      setShowModal(false);
    });
  };

  const handleCancelClearCart = () => {
    setShowModal(false);
  };

  const handleProceedToCheckout = () => {
    if (!user) {
      setShowCheckoutModal(true);
    } else {
      navigate("/checkout");
    }
  };

  const handleCheckoutWithLogin = () => {
    setShowCheckoutModal(false);
    navigate("/login"); // Navigate to login page
  };

  const handleCheckoutWithoutLogin = () => {
    setShowCheckoutModal(false);
    navigate("/checkout"); // Navigate to checkout page
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8 animate-fade-left">
        <div className="w-8 h-8 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-8 animate-fade-left">
        <img
          src={EmptyImage}
          alt="Empty Cart"
          className="h-72 w-72 rounded-xl object-cover"
        />
        <p className="text-xl text-gray-700">سلة التسوق فارغة</p>
        <p className="text-gray-500">
          يرجى الضغط على زر الذهاب للصفحة الرئيسية لتتمكن من الشراء
        </p>
        <Link
          to={"/"}
          className="inline-block mt-10 rounded bg-primary px-6 py-3 text-base font-medium text-white hover:text-white transition hover:opacity-90"
        >
          الذهاب للصفحة الرئيسية
        </Link>
      </div>
    );
  }

  return (
    <section className="animate-fade-left">
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <motion.div
            initial={{ opacity: 0, y: 150 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="dark:bg-primary bg-secondary p-8 rounded-lg shadow-lg max-w-sm w-full"
          >
            <p className="text-gray-800 text-center text-lg font-semibold mb-6">
              هل أنت متأكد أنك تريد إفراغ السلة؟
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors duration-200"
                onClick={handleCancelClearCart}
              >
                إلغاء
              </button>
              <button
                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors duration-200"
                onClick={handleConfirmClearCart}
              >
                تأكيد
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {!user && (
        <Modal
          isOpen={showCheckoutModal}
          onClose={() => setShowCheckoutModal(false)}
        >
          <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
            المتابعة للدفع
          </h2>
          <p className="text-gray-700 mb-4 text-center">
            هل تريد تسجيل الدخول لإتمام عملية الدفع أم المتابعة بدون تسجيل الدخول؟
          </p>
          <div className="flex justify-center space-x-4">
            <button
              className="bg-accent text-white px-6 py-2 rounded-md hover:bg-primary transition-colors duration-200"
              onClick={handleCheckoutWithLogin}
            >
              تسجيل الدخول
            </button>
            <button
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-accent transition-colors duration-200"
              onClick={handleCheckoutWithoutLogin}
            >
              المتابعة بدون تسجيل الدخول
            </button>
          </div>
        </Modal>
      )}

      <div className="mx-auto relative max-w-screen-xl min-h-[100vh] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <BackBtn />
        <div className="mx-auto max-w-5xl">
          <header className="text-left mb-8">
            <h1 className="text-2xl text-center font-bold text-gray-900 sm:text-3xl">
              سلة التسوق الخاصة بك
            </h1>
          </header>

          <div className="mt-8">
  <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-lg">
    <table className="min-w-full text-sm divide-y divide-gray-200 bg-white">
      <thead>
        <tr className="bg-gray-50">
          <th className="px-4 py-3 text-left font-semibold text-gray-800">المنتج</th>
          <th className="px-4 py-3 text-left font-semibold text-gray-800">السعر</th>
          <th className="px-4 py-3 text-center font-semibold text-gray-800">الكمية</th>
          <th className="px-4 py-3 text-right font-semibold text-gray-800">إزالة</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {cart.map((item, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="px-4 py-4 flex items-center space-x-4">
              <img
                src={item.image}
                alt="product"
                className="w-16 h-16 rounded-md object-cover border border-gray-200"
              />
              <span className="text-gray-700 text-[12 px] font-medium">{item.name}</span>
            </td>
            <td className="px-4 py-4 text-gray-900 font-semibold text-[12px]">{item.price} د.ع</td>
            <td className="px-4 py-4 text-center">
              <div className="inline-flex items-center border border-gray-300 rounded-md overflow-hidden">
                <button
                  onClick={() => handleDecreaseQuantity(item.productId, item.quantity)}
                  className="px-2 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  readOnly
                  className="w-8 text-center bg-white border-0 text-gray-800"
                />
                <button
                  onClick={() => handleIncreaseQuantity(item.productId, item.quantity)}
                  className="px-2 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  +
                </button>
              </div>
            </td>
            <td className="px-4 py-4 text-right">
              <button
                onClick={() => handleRemoveItem(item._id)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 size={20} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot className="bg-gray-50">
        <tr>
          <td colSpan="4" className="px-4 py-4 text-right font-semibold text-gray-800">
            إجمالي المبلغ: <span className="text-accent">{totalPrice} د.ع</span>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>

  {/* Actions Section */}
  <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
    {/* Clear Cart Button */}
    <button
      className="w-full sm:w-auto bg-accent text-white rounded-lg px-6 py-3 font-medium hover:bg-primary transition duration-200"
      onClick={handleClearCart}
    >
      افراغ السلة
    </button>

    {/* Summary Section */}
    <div className="w-full sm:w-[300px] border border-gray-300 p-6 rounded-lg shadow-md bg-white text-center">
      <p className="text-gray-800 font-bold text-lg">
        إجمالي المبلغ: <span className="font-medium text-danger">{totalPrice} د.ع</span>
      </p>
      <p className="text-sm text-gray-500 mt-1">الشحن: مجاني</p>
      <button
        className="mt-4 bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition duration-200 w-full"
        onClick={handleProceedToCheckout}
      >
        المتابعة للدفع
      </button>
    </div>
  </div>
</div>

        </div>
      </div>
    </section>
  );
};

Cart.propTypes = {
  cart: PropTypes.array,
  user: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

export default Cart;