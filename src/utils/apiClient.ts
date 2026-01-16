import axios, { type AxiosInstance } from "axios";
import Cookies from "js-cookie";

// Function to fetch Amadeus access token
const getAccessToken = async (): Promise<string> => {
  const response = await axios.post(import.meta.env.VITE_AMADEUS_TOKEN_URL, {
    grant_type: "client_credentials",
    client_id: import.meta.env.VITE_AMADEUS_CLIENT_ID,
    client_secret: import.meta.env.VITE_AMADEUS_CLIENT_SECRET,
  }, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  const token = response.data.access_token;
  const expiration = Date.now() + (response.data.expires_in * 1000);
  Cookies.set("accessToken", token, { secure: true, sameSite: "strict" });
  Cookies.set("tokenExpiration", expiration.toString(), { secure: true, sameSite: "strict" });
  return token;
};

// Create axios instance with Amadeus base URL
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_AMADEUS_BASE_URL,
});

// Add interceptor to include Bearer token
apiClient.interceptors.request.use(async (config) => {
  const storedToken = Cookies.get("accessToken");
  const storedExp = Cookies.get("tokenExpiration");
  if (!storedToken || !storedExp || Date.now() >= parseInt(storedExp)) {
    await getAccessToken();
  }
  config.headers.Authorization = `Bearer ${Cookies.get("accessToken")}`;
  return config;
});

export { apiClient };
