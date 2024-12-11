import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const apiURL = import.meta.env.VITE_API_URL;
const initialState = {
    heroImages: [],
    loading: false,
    error: null,
};

// Create an async thunk for fetching hero images
export const fetchHeroImages = createAsyncThunk(
    'heroImages/fetchHeroImages',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiURL}/hero-images`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const heroImagesSlice = createSlice({
    name: 'heroImages',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroImages.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHeroImages.fulfilled, (state, action) => {
                state.loading = false;
                state.heroImages = action.payload;
            })
            .addCase(fetchHeroImages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default heroImagesSlice.reducer;