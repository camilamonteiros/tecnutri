const Product = require("../models/product.js");

const productController = {
  getProducts: (req, res) => {
    Product.getProducts((err, products) => {
      if (err) {
        res.status(500).json({ message: "Erro ao buscar produtos" });
        return;
      } else {
        res.json(products);
      }
    });
  },
  createProduct: (req, res) => {
    const newProduct = req.body;
    Product.createProduct(newProduct, (err, result) => {
      if (err) {
        res.status(500).json({ message: "Erro ao criar produto" });
        return;
      } else {
        res.status(201).json({ message: "Produto criado com sucesso" });
      }
    });
  },
  updateProduct: (req, res) => {
    const productId = req.params.id;
    const updatedProductData = req.body;
    Product.updateProduct(productId, updatedProductData, (err, result) => {
      if (err) {
        res.status(500).json({ message: "Erro ao atualizar produto" });
      } else {
        res.status(200).json({ message: "Produto atualizado com sucesso" });
      }
    });
  },
  deleteProduct: (req, res) => {
    const productId = req.params.id;
    Product.deleteProduct(productId, (err, result) => {
      if (err) {
        res.status(500).json({ message: "Erro ao excluir produto" });
      } else {
        res.status(200).json({ message: "Produto excluído com sucesso" });
      }
    });
  },
  findProduct: (req, res) => {
    const productName = req.params.name;
    Product.findProduct(productName, (err, product) => {
      if (err) {
        res.status(500).json({ message: "Erro ao buscar produto" });
      } else if (product.length === 0) {
        res.status(404).json({ message: "Produto não encontrado" });
      } else {
        res.json(product);
      }
    });
  }
};

module.exports = productController;
