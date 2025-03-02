import{useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addOrder, fetchUserOrders } from '../redux/ordersSlice';
import {removeAllItemsFromCart} from '../redux/cartSlice';
import { showToast } from '../utils/Toast';
import { fetchUserInfo } from "../redux/userAuthSlice";
import BackBtn from '../components/common/BackBtn';
import RadialProgress from '../components/common/RadialProgress';
const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.userAuth);
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.mobile || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    paymentMethod: 'on delivery',
    notes: '',
  });
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsVisible(true);
    setProgress(10); // Start with 10% progress (e.g., validating form)

    const order = {
      ...formData,
      userId: user?._id || null,
      items: cart,
      total: totalPrice,
    };

    try {
      setProgress(20); // Preparing API request
      await new Promise(resolve => setTimeout(resolve, 200)); // Simulate delay
      setProgress(30); // API request in progress
      await dispatch(addOrder(order)).unwrap();
      setProgress(50); // API request successful
      showToast("تم ارسال الطلب بنجاح", "success");

      setProgress(60); // Removing items from cart
      dispatch(removeAllItemsFromCart());
      await new Promise(resolve => setTimeout(resolve, 200)); // Simulate delay
      setProgress(80); // Finalizing order
      setTimeout(() => {
        setProgress(100); // Complete
        setIsVisible(false); // Hide progress after a slight delay
        navigate("/");
      }, 500);
    } catch (error) {
      setIsVisible(false);
      showToast("حدث خطأ أثناء إرسال الطلب", "error");
    }
  };
  return (
    <div className="max-w-4xl relative mx-auto px-6 py-12 bg-white  rounded-lg" dir='rtl'>
      <BackBtn />
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            تأكيد الطلب
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600">الاسم</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-2 border-gray-300 p-2 bg-gray-200 rounded-lg shadow-sm focus:border-primary focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">الهاتف</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full mt-2 border-gray-300 p-2 bg-gray-200 rounded-lg shadow-sm focus:border-primary focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">العنوان</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full mt-2 border-gray-300 p-2 bg-gray-200 rounded-lg shadow-sm focus:border-primary focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">المدينة</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full mt-2 border-gray-300 p-2 bg-gray-200 rounded-lg shadow-sm focus:border-primary focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">المحافظة</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full mt-2 border-gray-300 p-2 bg-gray-200 rounded-lg shadow-sm focus:border-primary focus:ring-primary"
              required
            />
          </div>
        
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">ملاحظات</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full mt-2 border-gray-300 p-2 bg-gray-200  rounded-lg shadow-sm focus:border-primary focus:ring-primary"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-3 bg-primary text-white font-medium rounded-lg hover:bg-dark-primary transition-colors duration-200"
          >
           اتمام الطلب
          </button>
        </div>
      </form>
      <div className="mt-10 border-t pt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">تفاصيل الطلب</h2>
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item._id} className="flex justify-between">
              <span>{item.name} x {item.quantity}</span>
              <span>{item.price * item.quantity} د.ع</span>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-between font-bold text-lg">
          <span>المجموع</span>
          <span>{totalPrice} د.ع</span>
        </div>
      </div>
        {/* Radial Progress */}
      <RadialProgress progress={progress} isVisible={isVisible} message="جاري معالجة الطلب..." />
    
    </div>
  );
};

export default Checkout;