import axios from "axios";

const API_BASE_URL = "http://localhost:8800";

const ProductService = {
  getProducts: async (token) => {
    return await axios.get(`${API_BASE_URL}/product`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  createProduct: async (productData, token) => {
    return await axios.post(`${API_BASE_URL}/product/create`, productData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  updateProduct: async (productId, productData, token) => {
    return await axios.put(`${API_BASE_URL}/product/update/${productId}`, productData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  deleteProduct: async (productId, token) => {
    return await axios.delete(`${API_BASE_URL}/product/delete/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  findProduct: async (productId, token) => {
    return await axios.get(`${API_BASE_URL}/product/find/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default ProductService;
