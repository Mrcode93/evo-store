import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { showToast } from '../utils/Toast';
const apiURL = import.meta.env.VITE_API_URL;
const initialState = {
    cart: [],
    cartCount: 0,
    loading: false,
    error: null,
};

// Create async thunks for cart management
export const addItemToCart = createAsyncThunk(
    'cart/addItemToCart',
    async (itemData, { rejectWithValue }) => {
        const id = localStorage.getItem('cartId');
        try {
            const response = await axios.post(`${apiURL}/add`, { ...itemData, id });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const removeItemFromCart = createAsyncThunk(
    'cart/removeItemFromCart',
    async (productId, { rejectWithValue }) => {
        const id = localStorage.getItem('cartId');
        try {
            const response = await axios.delete(`${apiURL}/remove/${productId}`, {
                data: { id },
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            showToast('تمت إزالة المنتج من السلة', 'success');
            return response.data;
        } catch (error) {
            showToast(error.response.data, 'error');
            return rejectWithValue(error.response.data);
        }
    }
);

export const getCart = createAsyncThunk(
    'cart/getCart',
    async (_, { rejectWithValue }) => {
        const id = localStorage.getItem('cartId');
        try {
            const response = await axios.get(`${apiURL}/get/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const removeAllItemsFromCart = createAsyncThunk(
    'cart/removeAllItemsFromCart',
    async (_, { rejectWithValue }) => {
        const id = localStorage.getItem('cartId');
        try {
            const response = await axios.delete(`${apiURL}/removeAll`, {
                data: { id },
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data;
        } catch (error) {
            showToast(error.response.data, 'error');
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateQuantity = createAsyncThunk(
    'cart/updateQuantity',
    async ({ productId, quantity }, { rejectWithValue }) => {
        const id = localStorage.getItem('cartId');
        try {
            const response = await axios.put(`${apiURL}/updateQuantity/${productId}`, { quantity, id });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addItemToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addItemToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = [...state.cart, action.payload]; // Add new item to array
                state.cartCount = state.cart.length;
            })
            .addCase(addItemToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(removeItemFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeItemFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = state.cart.filter(item => item.productId !== action.payload.productId);
                state.cartCount = state.cart.length;
            })
            .addCase(removeItemFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload.items || []; // Ensure cart is an array
                state.cartCount = state.cart.length;
            })
            .addCase(getCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(removeAllItemsFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeAllItemsFromCart.fulfilled, (state) => {
                state.loading = false;
                state.cart = [];
                state.cartCount = state.cart.length;
            })
            .addCase(removeAllItemsFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateQuantity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateQuantity.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.cart.findIndex(item => item.productId === action.payload.productId);
                if (index !== -1) {
                    state.cart[index].quantity = action.payload.quantity;
                }
                state.cartCount = state.cart.length;
            })
            .addCase(updateQuantity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default cartSlice.reducer;