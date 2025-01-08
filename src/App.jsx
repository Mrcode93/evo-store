// // App.jsx
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts, fetchLatestProducts } from './redux/productsSlice';
// import { fetchCategories } from './redux/categoriesSlice';
// import { fetchBrands } from './redux/brandsSlice';
// import { fetchAds } from './redux/adsSlice';
// import { fetchFlashSales } from './redux/flashSalesSlice';
// import { fetchHeroImages } from './redux/heroImagesSlice';
// import { fetchUserInfo } from './redux/userAuthSlice';
// import { getCart } from './redux/cartSlice';
// import HomePage from './pages/HomePage';
// import ProductDetails from './pages/ProductDetails';
// import CartPage from './pages/CartPage';
// import CheckOutPage from './pages/CheckOutPage';
// import OrdersPage from './pages/OrderPage';
// import UserAuth from './pages/userAuthPage';
// import ProfilePage from './pages/ProfilePage';
// import WishList from './pages/WishList';
// import ProductsByCategory from './pages/ProductsByCategory';
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { connectSocket, disconnectSocket, setOrderAccepted, setOrderStatus, setOrderDelivered } from './redux/socketSlice';
// import { fetchUserOrders } from "./redux/ordersSlice";
// import socket from './socket/socketClient';
// import useSound from "use-sound";
// import mySound from "./assets/sounds/note.mp3"; // Your sound file path here
// import { showToast } from './utils/Toast';
// import TermsConditions from './pages/TermsConditions';
// import PrivacyPolicy from './pages/privacyPolicy';
// import AllProductsPage from './pages/AllThingsPage';
// import Header from './components/common/Header';

// function App() {
//   const dispatch = useDispatch();
//   const { products, latest, productById, loading, error } = useSelector((state) => state.products);
//   const { categories } = useSelector((state) => state.categories);
//   const { brands } = useSelector((state) => state.brands);
//   const { ads } = useSelector((state) => state.ads);
//   const { flashSales } = useSelector((state) => state.flashSales);
//   const { heroImages } = useSelector((state) => state.heroImages);
//   const { userInfo } = useSelector((state) => state.userAuth);
//   const { cart } = useSelector((state) => state.cart);
//   const [play] = useSound(mySound, { volume: 1 });
//   const user = useSelector((state) => state.userAuth.user);

//   useEffect(() => {
//     const fetchData = async () => {
//       dispatch(fetchProducts());
//       dispatch(fetchLatestProducts());
//       dispatch(fetchCategories());
//       dispatch(fetchAds());
//       dispatch(fetchFlashSales());
//       dispatch(fetchHeroImages());
//       dispatch(getCart());
//     };

//     fetchData();
//   }, [dispatch]);
  

//     useEffect(() => {
//     if (!user) {
//       dispatch(fetchUserInfo());
//     }
//   }, [dispatch, user]);

//   useEffect(() => {
//     // Connect to the socket
//     dispatch(connectSocket());

//     // Event handler functions
//     const handleOrderAccepted = (payload) => {
//       dispatch(setOrderAccepted(payload));
//       dispatch(fetchUserOrders());
//       play();
//       showToast('تم قبول الطلب', 'success');
//     };

//     const handleOrderStatusUpdated = (payload) => {
//       dispatch(setOrderStatus(payload));
//       dispatch(fetchUserOrders());
//       play();
//       showToast('تم شحن الطلب من المتجر سوف يصلك اليوم', 'success');
//     };

//     const handleOrderDelivered = (payload) => {
//       dispatch(setOrderDelivered(payload));
//       dispatch(fetchUserOrders());
//       play();
//       showToast('تم تسليم الطلب', 'success');
//     };

//     // Attach event listeners
//     socket.on('orderAccepted', handleOrderAccepted);
//     socket.on('orderStatusUpdated', handleOrderStatusUpdated);
//     socket.on('orderDelivered', handleOrderDelivered);

//     // Cleanup: Remove event listeners and disconnect socket
//     return () => {
//       socket.off('orderAccepted', handleOrderAccepted);
//       socket.off('orderStatusUpdated', handleOrderStatusUpdated);
//       socket.off('orderDelivered', handleOrderDelivered);
//       dispatch(disconnectSocket());
//     };
//   }, [dispatch, play]);

//   return (
//     <Router>
//       <main>
//          <Header cart={cart} />
//         <ToastContainer
//           position="top-center"
//           autoClose={1000}
//           hideProgressBar={false}
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme='dark'
//           closeOnClick
//           closeButton={false}
//         />
//         <Routes>
//           <Route path="/" element={<HomePage products={products} categories={categories} latest={latest} ads={ads[0]}
//             brands={brands} flashSales={flashSales} heroImages={heroImages} userInfo={userInfo} cart={cart}
//           />} />
//           <Route path="/product/:id" element={<ProductDetails products={products} productById={productById} />} />
//           <Route path="/cart" element={<CartPage />} />
//           <Route path="/wishlist" element={<WishList />} />
//           <Route path="/checkout" element={<CheckOutPage />} />
//           <Route path="/orders" element={<OrdersPage />} />
//           <Route path="/login" element={<UserAuth />} />
//           <Route path="/profile" element={<ProfilePage />} />
//           <Route path="/terms" element={<TermsConditions />} />
//           <Route path="/privacy" element={<PrivacyPolicy />} />
//           <Route path="/products" element={< AllProductsPage/>} />
//           <Route path="/category/:id" element={<ProductsByCategory products={products} />} />
          

//         </Routes>
//       </main>
//     </Router>
//   );
// }

// export default App;


import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchLatestProducts } from "./redux/productsSlice";
import { fetchCategories } from "./redux/categoriesSlice";
import { fetchBrands } from "./redux/brandsSlice";
import { fetchAds } from "./redux/adsSlice";
import { fetchFlashSales } from "./redux/flashSalesSlice";
import { fetchHeroImages } from "./redux/heroImagesSlice";
import { fetchUserInfo } from "./redux/userAuthSlice";
import { getCart } from "./redux/cartSlice";
import HomePage from "./pages/HomePage";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import CheckOutPage from "./pages/CheckOutPage";
import OrdersPage from "./pages/OrderPage";
import UserAuth from "./pages/userAuthPage";
import ProfilePage from "./pages/ProfilePage";
import WishList from "./pages/WishList";
import ProductsByCategory from "./pages/ProductsByCategory";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorPage from "./pages/ErrorPage"; // Import the ErrorPage
import Header from "./components/common/Header";

function App() {
  const dispatch = useDispatch();
  const [errorOccurred, setErrorOccurred] = useState(false);

  const { products, latest, loading, error } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
  const { user } = useSelector((state) => state.userAuth);
  const { cart } = useSelector((state) => state.cart);

  // Fetch initial data and handle errors
  useEffect(() => {
    const fetchData = async () => {
     
        await dispatch(fetchProducts());
        await dispatch(fetchLatestProducts());
        await dispatch(fetchCategories());
        await dispatch(fetchBrands());
        await dispatch(fetchAds());
        await dispatch(fetchFlashSales());
        await dispatch(fetchHeroImages());
        await dispatch(getCart());
     
    };

    fetchData();
  }, [dispatch]);



  // Handle user info fetch errors
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!user) {
          await dispatch(fetchUserInfo());
        }
      } catch (err) {
        console.error("Error fetching user info:", err);
        setErrorOccurred(true);
      }
    };

    fetchUser();
  }, [dispatch, user]);

  if (errorOccurred) {
    return <Navigate to="/error" replace />;
  }

  return (
    <Router>
      <main>
        <Header cart={cart} />
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          closeOnClick
          closeButton={false}
        />
        <Routes>
          <Route path="/" element={<HomePage products={products} categories={categories} />} />
          <Route path="/product/:id" element={<ProductDetails products={products} />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/checkout" element={<CheckOutPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/login" element={<UserAuth />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/category/:id" element={<ProductsByCategory products={products} />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
