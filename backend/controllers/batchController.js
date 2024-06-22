const Batch = require("../models/batch.js");
const batchController = {
  getBatchs: (req, res) => {
    Batch.getBatchs((err, batchs) => {
      if (err) {
        res.status(500).json({ message: "Erro ao buscar lotes" });
        return;
      } else {
        res.json(batchs);
      }
    });
  },
  createBatch: (req, res) => {
    const newBatch = req.body;
    Batch.createBatch(newBatch, (err, result) => {
      if (err) {
        res.status(500).json({ message: "Erro ao criar lote" });
        return;
      } else {
        res.status(201).json({ message: "Lote criado com sucesso" });
      }
    });
  },
  updateBatch: (req, res) => {
    const batchId = req.params.id;
    const updatedBatchData = req.body;
    Batch.updateBatch(batchId, updatedBatchData, (err, result) => {
      if (err) {
        res.status(500).json({ message: "Erro ao atualizar lote" });
      } else {
        res.status(200).json({ message: "Lote atualizado com sucesso" });
      }
    });
  },
  deleteBatch: (req, res) => {
    const batchId = req.params.id;
    Batch.deleteBatch(batchId, (err, result) => {
      if (err) {
        res.status(500).json({ message: "Erro ao excluir lote" });
      } else {
        res.status(200).json({ message: "Lote excluído com sucesso" });
      }
    });
  },
  findBatch: (req, res) => {
    const batchName = req.params.name;
    Batch.findBatch(batchName, (err, batch) => {
      if (err) {
        res.status(500).json({ message: "Erro ao buscar produto" });
      } else if (batch.length === 0) {
        res.status(404).json({ message: "Produto não encontrado" });
      } else {
        res.json(batch);
      }
    });
  }
};

module.exports = batchController;
