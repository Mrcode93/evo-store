import { createSlice } from "@reduxjs/toolkit";
import socket from "../socket/socketClient"; // Import the socket instance

const socketSlice = createSlice({
    name: "socket",
    initialState: {
        connected: false,
        newOrder: null,
        orderStatus: null,
        orderAccepted: null,
        orderRejected: null,
        orderDelivered: null,
        notifications: [], // Add notifications array to initial state
    },
    reducers: {
        connectSocket: (state) => {
            socket.connect();
            state.connected = true;
            console.log("Socket connected");
        },
        disconnectSocket: (state) => {
            socket.disconnect();
            state.connected = false;
            console.log("Socket disconnected");
        },
        setNewOrder: (state, action) => {
            state.newOrder = action.payload;
            state.notifications.push({ type: 'newOrder', payload: action.payload });
        },
        setOrderStatus: (state, action) => {
            state.orderStatus = action.payload;
            state.notifications.push({ type: 'orderStatus', payload: action.payload });
            console.log(action.payload);
        },
        setOrderAccepted: (state, action) => {
            state.orderAccepted = action.payload;
            state.notifications.push({ type: 'orderAccepted', payload: action.payload });
        },
        setOrderRejected: (state, action) => {
            state.orderRejected = action.payload;
            state.notifications.push({ type: 'orderRejected', payload: action.payload });
        },
        setOrderDelivered: (state, action) => {
            state.orderDelivered = action.payload;
            state.notifications.push({ type: 'orderDelivered', payload: action.payload });
        },
        clearNotifications: (state) => {
            state.notifications = [];
        },
    },
});

export const {
    connectSocket,
    disconnectSocket,
    setNewOrder,
    setOrderStatus,
    setOrderAccepted,
    setOrderRejected,
    setOrderDelivered,
    clearNotifications,
} = socketSlice.actions;

export default socketSlice.reducer;