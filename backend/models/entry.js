const db = require("../config/dbConfig.js");

const Entry= {
  getEntrys: (callback) => {
    db.query("SELECT * FROM entradas;", callback);
  },
  createEntry: (newEntry, callback) => {
    db.query("INSERT INTO entradas SET ?", [newEntry], callback);
  },
  updateEntry: (entryId, entryData, callback) => {
    db.query(
      "UPDATE entradas SET ? WHERE id_entrada = ?",
      [entryData, entryId],
      callback
    );
  },
  deleteEntry: (entryId, callback) => {
    db.query("DELETE FROM entradas WHERE id_entrada = ?", [entryId], callback);
  },
  findEntry: (entryId, callback) => {
    db.query("SELECT * FROM entradas WHERE id_entrada = ?", [entryId], callback)
  }
};
module.exports = Entry;
