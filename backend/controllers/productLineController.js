const ProductLine = require("../models/productLine.js");
const productLineController = {
  getProductsLines: (req, res) => {
    ProductLine.getProductsLines((err, productsLines) => {
      if (err) {
        res.status(500).json({ message: "Erro ao buscar linha" });
        return;
      } else {
        res.json(productsLines);
      }
    });
  },
  createProductLine: (req, res) => {
    const newProductLine = req.body;
    console.log("aqui")
    ProductLine.createProductLine(newProductLine, (err, result) => {
      if (err) {
        res.status(500).json({ message: "Erro ao criar linha" });
        return;
      } else {
        res.status(201).json({ message: "Linha criado com sucesso" });
      }
    });
  },
  updateProductLine: (req, res) => {
    const productLineId = req.params.id_linha;
    const updatedProductLineData = req.body;
  
    console.log("Updating product line with ID:", productLineId);
    console.log("Updated data:", updatedProductLineData);
  
    ProductLine.updateProductLine(productLineId, updatedProductLineData, (err, result) => {
      if (err) {
        console.error("Error updating product line:", err);
        res.status(500).json({ message: "Erro ao atualizar linha" });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ message: "Linha não encontrada ou não atualizada" });
        } else {
          res.status(200).json({ message: "Linha atualizada com sucesso" });
        }
      }
    });
  },
  
  deleteProductLine: (req, res) => {
    const productLineId = req.params.id_linha;
    ProductLine.deleteProductLine(productLineId, (err, result) => {
      if (err) {
        res.status(500).json({ message: "Erro ao excluir linha" });
      } else {
        res.status(200).json({ message: "Linha excluído com sucesso" });
      }
    });
  },
  findProductLine: (req, res) => {
    const productLineId = req.params.id_linha;
    ProductLine.findProductLine(productLineId, (err, productLine) => {
      if (err) {
        res.status(500).json({ message: "Erro ao buscar produto" });
      } else if (productLine.length === 0) {
        res.status(404).json({ message: "Produto não encontrado" });
      } else {
        res.json(productLine);
      }
    });
  }
};

module.exports = productLineController;
