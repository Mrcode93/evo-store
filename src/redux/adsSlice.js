import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiURL = import.meta.env.VITE_API_URL;

const initialState = {
    ads: [],
    loading: false,
    error: null,
};

// Create an async thunk for fetching ads
export const fetchAds = createAsyncThunk(
    'ads/fetchAds',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiURL}/ads`);

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const adsSlice = createSlice({
    name: 'ads',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAds.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAds.fulfilled, (state, action) => {
                state.loading = false;
                state.ads = action.payload;
            })
            .addCase(fetchAds.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default adsSlice.reducer;