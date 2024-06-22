import axios from "axios";

const API_BASE_URL = "http://localhost:8800";

const batchService = {
  getBatchs: async (token) => {
    return await axios.get(`${API_BASE_URL}/batch`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  createBatch: async (batchData, token) => {
    console.log("aqui")
    return await axios.post(`${API_BASE_URL}/batch/create`, batchData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  updateBatch: async (batchId, batchData, token) => {
    return await axios.put(`${API_BASE_URL}/batch/update/${batchId}`, batchData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  deleteBatch: async (batchId, token) => {
    return await axios.delete(`${API_BASE_URL}/batch/delete/${batchId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  findBatch: async (batchId, token) => {
    return await axios.get(`${API_BASE_URL}/batch/find/${batchId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default batchService;
