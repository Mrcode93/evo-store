import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const apiURL = import.meta.env.VITE_API_URL;
const initialState = {
    brands: [],
    loading: false,
    error: null,
};

// Create an async thunk for fetching brands
export const fetchBrands = createAsyncThunk(
    'brands/fetchBrands',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiURL}/brands`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const brandsSlice = createSlice({
    name: 'brands',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBrands.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBrands.fulfilled, (state, action) => {
                state.loading = false;
                state.brands = action.payload;
            })
            .addCase(fetchBrands.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default brandsSlice.reducer;