const Client = require("../models/client.js");
const clientController = {
  getClients: (req, res) => {
    Client.getClients((err, clients) => {
      if (err) {
        res.status(500).json({ message: "Erro ao buscar cliente" });
        return;
      } else {
        res.json(clients);
      }
    });
  },
  createClient: (req, res) => {
    const newClient = req.body;
    Client.createClient(newClient, (err, result) => {
      if (err) {
        res.status(500).json({ message: "Erro ao criar cliente" });
        return;
      } else {
        res.status(201).json({ message: "Cliente criado com sucesso" });
      }
    });
  },
  updateClient: (req, res) => {
    const clientId = req.params.id_cliente;
    const updatedClientData = req.body;
  
    console.log("Updating client with ID:", clientId);
    console.log("Updated data:", updatedClientData);
  
    Client.updateClient(clientId, updatedClientData, (err, result) => {
      if (err) {
        console.error("Error updating client:", err);
        res.status(500).json({ message: "Erro ao atualizar cliente" });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ message: "Cliente não encontrado ou não atualizado" });
        } else {
          res.status(200).json({ message: "Cliente atualizado com sucesso" });
        }
      }
    });
  },
  
  deleteClient: (req, res) => {
    const clientId = req.params.id_cliente;
    Client.deleteClient(clientId, (err, result) => {
      if (err) {
        res.status(500).json({ message: "Erro ao excluir cliente" });
      } else {
        res.status(200).json({ message: "Cliente excluído com sucesso" });
      }
    });
  },
  findClient: (req, res) => {
    const clientId = req.params.id_cliente;
    Client.findClient(clientId, (err, client) => {
      if (err) {
        res.status(500).json({ message: "Erro ao buscar cliente" });
      } else if (client.length === 0) {
        res.status(404).json({ message: "Cliente não encontrado" });
      } else {
        res.json(client);
      }
    });
  }
};

module.exports = clientController;
