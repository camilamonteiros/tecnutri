const mysql = require("mysql");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "Camila25!",
  database: "tecnutrri",
};

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar com o banco de dados:", err);
    return;
  } else {
    console.log("Conexão com o banco de dados estabelecida com sucesso");
  }
});

module.exports = db;