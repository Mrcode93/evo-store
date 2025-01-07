import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const apiURL = import.meta.env.VITE_API_URL;
import Cookies from "js-cookie";
import { showToast } from '../utils/Toast';
const initialState = {
    user: null,
    users: [],
    loading: false,
    error: null,
};
const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("user-auth-token="))
    ?.split("=")[1];



// Create async thunks for user authentication and management
export const registerUser = createAsyncThunk(
    'userAuth/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${apiURL}/register`, userData);
            showToast('تم تسجيل الحساب بنجاح', 'success');
            Cookies.set('user-auth-token', response.data.token);
            // window.location.href = '/'; // Redirect to home page
            return response.data;
        } catch (error) {
            showToast(error.response.data, 'error');
            return rejectWithValue(error.response.data);
        }
    }
);



export const loginUser = createAsyncThunk(
    'userAuth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${apiURL}/login`, credentials);
            showToast('تم تسجيل الدخول بنجاح', 'success');
            Cookies.set('user-auth-token', response.data.token);
            // window.location.href = '/'; // Redirect to home page
            return response.data;
        } catch (error) {
            showToast(error.response.data, 'error');
            return rejectWithValue(error.response.data);
        }
    }
);


export const fetchUserInfo = createAsyncThunk(
    'userAuth/fetchUserInfo',
    async (_, { rejectWithValue }) => {
        try {

            const response = await axios.get(`${apiURL}/info`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true, // Ensure cookies are sent with the request
            });

            return response.data.user;
        } catch (error) {
            console.error("Error fetching user info: ", error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);


export const updateUserInfo = createAsyncThunk(
    'userAuth/updateUserInfo',
    async (updatedUser, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${apiURL}/update-info`, updatedUser, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('user-auth-token')}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateUserPassword = createAsyncThunk(
    'userAuth/updateUserPassword',
    async ({ id, passwordData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${apiURL}/update-password/${id}`, passwordData, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('user-auth-token')}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchAllUsers = createAsyncThunk(
    'userAuth/fetchAllUsers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiURL}/users`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const verifyOtp = createAsyncThunk(
    'userAuth/verifyOtp',
    async (otpData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${apiURL}/verify`, otpData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// logoutUser thunk
export const logoutUser = createAsyncThunk(
    'userAuth/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            //    remove token from cookies
            Cookies.remove('user-auth-token');
            return null;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchUserInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUserInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateUserInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(updateUserInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateUserPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(updateUserPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default userAuthSlice.reducer;