import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const apiURL = import.meta.env.VITE_API_URL;
const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("user-auth-token="))
    ?.split("=")[1];
const initialState = {
    orders: [],
    order: null,
    loading: false,
    error: null,
};
console.log()
// Create async thunks for order management
export const addOrder = createAsyncThunk(
    'orders/addOrder',
    async (orderData, { rejectWithValue }) => {
        const id = localStorage.getItem('cartId');
        try {
            const response = await axios.post(`${apiURL}/orders`, { ...orderData, id });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiURL}/orders`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchUserOrders = createAsyncThunk(
    'orders/fetchUserOrders',
    async (userId, { rejectWithValue }) => {
        const id = localStorage.getItem('cartId'); // Get the cart ID
        try {
            const response = await axios.get(`${apiURL}/user-orders`, {
                params: { id, userId }, // Pass id and userId as query parameters
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);




export const fetchOrderById = createAsyncThunk(
    'orders/fetchOrderById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiURL}/orders/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateOrderAccept = createAsyncThunk(
    'orders/updateOrderAccept',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${apiURL}/orders-accept/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateOrderStatusDelivery = createAsyncThunk(
    'orders/updateOrderStatusDelivery',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${apiURL}/orders-deliver/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateOrderStatus = createAsyncThunk(
    'orders/updateOrderStatus',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${apiURL}/orders-on-day/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const rejectOrder = createAsyncThunk(
    'orders/rejectOrder',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${apiURL}/orders/reject/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders.push(action.payload);
            })
            .addCase(addOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchUserOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchUserOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchOrderById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderById.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(fetchOrderById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateOrderAccept.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateOrderAccept.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(updateOrderAccept.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateOrderStatusDelivery.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateOrderStatusDelivery.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(updateOrderStatusDelivery.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateOrderStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(rejectOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(rejectOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(rejectOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default ordersSlice.reducer;