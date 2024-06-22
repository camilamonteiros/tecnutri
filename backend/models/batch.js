const db = require("../config/dbConfig.js");

const Batch = {
  getBatchs: (callback) => {
    db.query("SELECT * FROM lotes;", callback);
  },
  createBatch: (newBatch, callback) => {
    db.query("INSERT INTO lotes SET ?", [newBatch], callback);
  },
  updateBatch: (batchId, batchData, callback) => {
    db.query(
      "UPDATE lotes SET ? WHERE id_lote = ?",
      [batchData, batchId],
      callback
    );
  },
  deleteBatch: (batchId, callback) => {
    db.query("DELETE FROM lotes WHERE id_lote = ?", [batchId], callback);
  },
  findBatch: (batchId, callback) => {
    db.query("SELECT * FROM lotes WHERE id_lote = ?", [batchId], callback)
  }
};
module.exports = Batch;
