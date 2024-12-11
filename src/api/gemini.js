import axios from 'axios';
// const apiUrl = import.meta.env.VITE_API_URL;
const apiUrl = "http://localhost:8090";
import { v4 as uuidv4 } from 'uuid';
export const fetchGeminiResponse = async (message) => {
  // Check for an existing session ID or create a new one
  const sessionId = sessionStorage.getItem('sessionId') || uuidv4();
  sessionStorage.setItem('sessionId', sessionId);
  try {

    const response = await axios.post(`${apiUrl}/ai-chat`, { message, sessionId });

    return response.data.message;

  } catch (error) {
    console.error("Error fetching response from backend:", error);
    return null;
  }
};