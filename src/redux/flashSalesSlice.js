import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const apiURL = import.meta.env.VITE_API_URL;
const initialState = {
    flashSales: [],
    flashSale: null,
    loading: false,
    error: null,
};


// Create async thunks for fetching flash sales
export const fetchFlashSales = createAsyncThunk(
    'flashSales/fetchFlashSales',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiURL}/flash-sales`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchFlashSalesById = createAsyncThunk(
    'flashSales/fetchFlashSalesById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiURL}/flash-sales/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const flashSalesSlice = createSlice({
    name: 'flashSales',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFlashSales.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFlashSales.fulfilled, (state, action) => {
                state.loading = false;
                state.flashSales = action.payload;
            })
            .addCase(fetchFlashSales.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchFlashSalesById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFlashSalesById.fulfilled, (state, action) => {
                state.loading = false;
                state.flashSale = action.payload;
            })
            .addCase(fetchFlashSalesById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default flashSalesSlice.reducer;