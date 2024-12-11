import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiURL = import.meta.env.VITE_API_URL;
const initialState = {
    products: [],
    latest: [],
    productById: null,
    product: null,
    loading: false,
    error: null,
};

// Create async thunks for fetching products based on different routes
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiURL}/products`);
            return response.data.products;
        } catch (error) {
            console.error('API Error:', error);
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

export const fetchLatestProducts = createAsyncThunk(
    'products/fetchLatestProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiURL}/products/latest`);
            return response.data.products;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiURL}/products/${id}`);
            return response.data.product;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

export const fetchProductsByCategoryId = createAsyncThunk(
    'products/fetchProductsByCategoryId',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiURL}/products/category/${id}`);
            return response.data.products;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

export const fetchProductsByName = createAsyncThunk(
    'products/fetchProductsByName',
    async (name, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiURL}/products/name/${name}`);
            return response.data.products;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

export const fetchProductsByPrice = createAsyncThunk(
    'products/fetchProductsByPrice',
    async ({ min, max }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiURL}/products/price/${min}/${max}`);
            return response.data.products;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchLatestProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLatestProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.latest = action.payload;
            })
            .addCase(fetchLatestProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.productById = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchProductsByCategoryId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductsByCategoryId.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProductsByCategoryId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchProductsByName.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductsByName.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProductsByName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchProductsByPrice.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductsByPrice.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProductsByPrice.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default productsSlice.reducer;