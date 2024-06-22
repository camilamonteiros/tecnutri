const db = require("../config/dbConfig.js");

const Product = {
  getProducts: (callback) => {
    db.query("SELECT * FROM produtos;", callback);
  },
  createProduct: (newProduct, callback) => {
    db.query("INSERT INTO produtos SET ?", [newProduct], callback);
  },
  updateProduct: (productId, productData, callback) => {
    db.query(
      "UPDATE produtos SET ? WHERE id_produto = ?",
      [productData, productId],
      callback
    );
  },
  deleteProduct: (productId, callback) => {
    db.query("DELETE FROM produtos WHERE id_produto = ?", [productId], callback);
  },
  findProduct: (productName, callback) => {
    db.query("SELECT * FROM produtos WHERE nome_produto = ?", [productName], callback)
  }
};
module.exports = Product;
