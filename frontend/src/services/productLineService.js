import axios from "axios";

const API_BASE_URL = "http://localhost:8800";

const ProductLineService = {
  getProductsLines: async (token) => {
    return await axios.get(`${API_BASE_URL}/productLine`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  createProductLine: async (productLineData, token) => {
    console.log("aqui")
    return await axios.post(`${API_BASE_URL}/productLine/create`, productLineData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  updateProductLine: async (productLineId, productLineData, token) => {
    return await axios.put(`${API_BASE_URL}/productLine/update/${productLineId}`, productLineData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  deleteProductLine: async (productLineId, token) => {
    return await axios.delete(`${API_BASE_URL}/productLine/delete/${productLineId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  findProductLine: async (productLineId, token) => {
    return await axios.get(`${API_BASE_URL}/productLine/find/${productLineId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default ProductLineService;
