import axios from "axios";

const API_BASE_URL = "http://localhost:8800";

const AuthService = {
  loginUser: async (userData) => {
    return await axios.post(`${API_BASE_URL}/auth/login`, userData, {
      withCredentials: true,
    });
  },
  registereUser: async (userData, token) => {
    return await axios.post(`${API_BASE_URL}/auth/register`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default AuthService;
