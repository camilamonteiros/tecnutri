const db = require("../config/dbConfig.js");

const ProductLine = {
  getProductsLines: (callback) => {
    db.query("SELECT * FROM linhas_produtos;", callback);
  },
  createProductLine: (newProductLine, callback) => {
    db.query("INSERT INTO linhas_produtos SET ?", [newProductLine], callback);
  },
  updateProductLine: (productLineId, productLineData, callback) => {
    db.query(
      "UPDATE linhas_produtos SET ? WHERE id_linha = ?",
      [productLineData, productLineId],
      callback
    );
  },
  deleteProductLine: (productLineId, callback) => {
    db.query("DELETE FROM linhas_produtos WHERE id_linha = ?", [productLineId], callback);
  },
  findProductLine: (productLineId, callback) => {
    db.query("SELECT * FROM linhas_produtos WHERE id_linha = ?", [productLineId], callback)
  }
};
module.exports = ProductLine;
