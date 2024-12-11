// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchLatestProducts } from './redux/productsSlice';
import { fetchCategories } from './redux/categoriesSlice';
import { fetchBrands } from './redux/brandsSlice';
import { fetchAds } from './redux/adsSlice';
import { fetchFlashSales } from './redux/flashSalesSlice';
import { fetchHeroImages } from './redux/heroImagesSlice';
import { fetchUserInfo } from './redux/userAuthSlice';
import { getCart } from './redux/cartSlice';
import HomePage from './pages/HomePage';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import CheckOutPage from './pages/CheckOutPage';
import OrdersPage from './pages/OrderPage';
import UserAuth from './pages/userAuthPage';
import ProfilePage from './pages/ProfilePage';
import ProductsByCategory from './pages/ProductsByCategory';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connectSocket, disconnectSocket, setOrderAccepted, setOrderStatus, setOrderDelivered } from './redux/socketSlice';
import { fetchUserOrders } from "./redux/ordersSlice";
import socket from './socket/socketClient';
import useSound from "use-sound";
import mySound from "./assets/sounds/note.mp3"; // Your sound file path here
import { showToast } from './utils/Toast';
import TermsConditions from './pages/TermsConditions';
import PrivacyPolicy from './pages/privacyPolicy';

function App() {
  const dispatch = useDispatch();
  const { products, latest, productById, loading, error } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
  const { brands } = useSelector((state) => state.brands);
  const { ads } = useSelector((state) => state.ads);
  const { flashSales } = useSelector((state) => state.flashSales);
  const { heroImages } = useSelector((state) => state.heroImages);
  const { userInfo } = useSelector((state) => state.userAuth);
  const { cart } = useSelector((state) => state.cart);
  const [play] = useSound(mySound, { volume: 1 });

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchProducts());
      dispatch(fetchLatestProducts());
      dispatch(fetchCategories());
      dispatch(fetchAds());
      dispatch(fetchFlashSales());
      dispatch(fetchHeroImages());
      // dispatch(fetchUserInfo());
      dispatch(getCart());
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {


    // Connect to the socket
    dispatch(connectSocket());

    // Event handler functions
    const handleOrderAccepted = (payload) => {
      dispatch(setOrderAccepted(payload));
      dispatch(fetchUserOrders());
      play();
      showToast('تم قبول الطلب', 'success');
    };

    const handleOrderStatusUpdated = (payload) => {
      dispatch(setOrderStatus(payload));
      dispatch(fetchUserOrders());
      play();
      showToast('تم شحن الطلب من المتجر سوف يصلك اليوم', 'success');
    };

    const handleOrderDelivered = (payload) => {
      dispatch(setOrderDelivered(payload));
      dispatch(fetchUserOrders());
      play();
      showToast('تم تسليم الطلب', 'success');
     
    };

    // Attach event listeners
    socket.on('orderAccepted', handleOrderAccepted);
    socket.on('orderStatusUpdated', handleOrderStatusUpdated);
    socket.on('orderDelivered', handleOrderDelivered);

    // Cleanup: Remove event listeners and disconnect socket
    return () => {
      socket.off('orderAccepted', handleOrderAccepted);
      socket.off('orderStatusUpdated', handleOrderStatusUpdated);
      socket.off('orderDelivered', handleOrderDelivered);
      dispatch(disconnectSocket());
    };
  }, [dispatch, play]);




  return (
    <Router>
      <main>
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='dark'
          closeOnClick
          closeButton={false}
        />
        <Routes>
          <Route path="/" element={<HomePage products={products} categories={categories} latest={latest} ads={ads[0]}
            brands={brands} flashSales={flashSales} heroImages={heroImages} userInfo={userInfo} cart={cart}
          />} />
          <Route path="/product/:id" element={<ProductDetails products={products} productById={productById} />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckOutPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/login" element={<UserAuth />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/category/:id" element={<ProductsByCategory products={products} />} />

        </Routes>
      </main>
    </Router>
  );
}

export default App;