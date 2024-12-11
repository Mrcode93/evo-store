import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const apiURL = import.meta.env.VITE_API_URL;
const initialState = {
    categories: [],
    category: null,
    loading: false,
    error: null,
};

// Create async thunks for fetching categories
export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiURL}/categories`);

            return response.data.categories;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchCategoryById = createAsyncThunk(
    'categories/fetchCategoryById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiURL}/categories/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchCategoryById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategoryById.fulfilled, (state, action) => {
                state.loading = false;
                state.category = action.payload;
            })
            .addCase(fetchCategoryById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default categoriesSlice.reducer;