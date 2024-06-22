const db = require("../config/dbConfig.js");

const User = {
  createUser: (userData, callback) => {
    db.query("INSERT INTO usuarios SET ?", userData, callback)
  },

  findUser: (email, callback) => {
    db.query("SELECT * FROM usuarios WHERE email = ?", [email], callback
    );
  },
};

module.exports = User;
