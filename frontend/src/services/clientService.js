import axios from "axios";

const API_BASE_URL = "http://localhost:8800";

const ClientService = {
  getClients: async (token) => {
    return await axios.get(`${API_BASE_URL}/client`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  createClient: async (clientData, token) => {
    console.log("aqui")
    return await axios.post(`${API_BASE_URL}/client/create`, clientData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  updateClient: async (clientId, clientData, token) => {
    return await axios.put(`${API_BASE_URL}/client/update/${clientId}`, clientData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  deleteClient: async (clientId, token) => {
    return await axios.delete(`${API_BASE_URL}/client/delete/${clientId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  findClient: async (clientId, token) => {
    return await axios.get(`${API_BASE_URL}/client/find/${clientId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default ClientService;
