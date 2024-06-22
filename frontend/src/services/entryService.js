import axios from "axios";

const API_BASE_URL = "http://localhost:8800";

const entryService = {
  getEntrys: async (token) => {
    return await axios.get(`${API_BASE_URL}/entry`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  createEntry: async (entryData, token) => {
    console.log("aqui")
    return await axios.post(`${API_BASE_URL}/entry/create`, entryData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  updateEntry: async (entryId, entryData, token) => {
    return await axios.put(`${API_BASE_URL}/entry/update/${entryId}`, entryData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  deleteEntry: async (entryId, token) => {
    return await axios.delete(`${API_BASE_URL}/entry/delete/${entryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  findEntry: async (entryId, token) => {
    return await axios.get(`${API_BASE_URL}/entry/find/${entryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default entryService;
