// socket.js
import io from "socket.io-client";
const apiUrl = import.meta.env.VITE_API_URL;

const socket = io(apiUrl, {
    transports: ["websocket", "polling"],
    autoConnect: true,
    debug: true, // For development purposes
    reconnectionAttempts: 5, // Number of reconnection attempts
    reconnectionDelay: 1000, // Delay between reconnection attempts
});
// Export the socket instance for use in other parts of your app
export default socket;
