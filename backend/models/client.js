const db = require("../config/dbConfig.js");

const Client = {
  getClients: (callback) => {
    db.query("SELECT * FROM clientes;", callback);
  },
  createClient: (newClient, callback) => {
    db.query("INSERT INTO clientes SET ?", [newClient], callback);
  },
  updateClient: (clientId, clientData, callback) => {
    db.query(
      "UPDATE clientes SET ? WHERE id_cliente = ?",
      [clientData, clientId],
      callback
    );
  },
  deleteClient: (clientId, callback) => {
    db.query("DELETE FROM clientes WHERE id_cliente = ?", [clientId], callback);
  },
  findClient: (clientId, callback) => {
    db.query("SELECT * FROM clientes WHERE id_cliente = ?", [clientId], callback)
  }
};
module.exports = Client;
