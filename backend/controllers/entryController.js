const Entry = require("../models/entry.js");
const entryController = {
  getEntrys: (req, res) => {
    Entry.getEntrys((err, entrys) => {
      if (err) {
        res.status(500).json({ message: "Erro ao buscar entrada" });
        return;
      } else {
        res.json(entrys);
      }
    });
  },
  createEntry: (req, res) => {
    const newEntry = req.body;
    Entry.createEntry(newEntry, (err, result) => {
      if (err) {
        res.status(500).json({ message: "Erro ao criar lote" });
        return;
      } else {
        res.status(201).json({ message: "Lote criado com entrada" });
      }
    });
  },
  updateEntry: (req, res) => {
    const entryId = req.params.id;
    const updatedEntryData = req.body;
    Entry.updateEntry(entryId, updatedEntryData, (err, result) => {
      if (err) {
        res.status(500).json({ message: "Erro ao atualizar entrada" });
      } else {
        res.status(200).json({ message: "Entrada atualizada com sucesso" });
      }
    });
  },
  deleteEntry: (req, res) => {
    const entryId = req.params.id;
    Entry.deleteEntry(entryId, (err, result) => {
      if (err) {
        res.status(500).json({ message: "Erro ao excluir entrada" });
      } else {
        res.status(200).json({ message: "Entrada excluída com sucesso" });
      }
    });
  },
  findEntry: (req, res) => {
    const entryName = req.params.name;
    Entry.findEntry(entryName, (err, entry) => {
      if (err) {
        res.status(500).json({ message: "Erro ao buscar entrada" });
      } else if (entry.length === 0) {
        res.status(404).json({ message: "Entrada não encontrada" });
      } else {
        res.json(entry);
      }
    });
  }
};

module.exports = entryController;
