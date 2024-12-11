import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './redux/productsSlice';
import userAuthReducer from './redux/userAuthSlice';
import ordersReducer from './redux/ordersSlice';
import heroImagesReducer from './redux/heroImagesSlice';
import flashSalesReducer from './redux/flashSalesSlice';
import categoriesReducer from './redux/categoriesSlice';
import cartReducer from './redux/cartSlice';
import brandsReducer from './redux/brandsSlice';
import adsReducer from './redux/adsSlice';
import socketReducer from './redux/socketSlice';

const store = configureStore({
    reducer: {
        products: productsReducer,
        userAuth: userAuthReducer,
        orders: ordersReducer,
        heroImages: heroImagesReducer,
        flashSales: flashSalesReducer,
        categories: categoriesReducer,
        cart: cartReducer,
        brands: brandsReducer,
        ads: adsReducer,
        socket: socketReducer,
    },
});

export default store;