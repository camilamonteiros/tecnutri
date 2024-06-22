const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const authController = {
  register: [
    body("email").isEmail().withMessage("Insira um email válido."),
    body("senha")
      .isLength({ min: 6 })
      .withMessage("A senha deve ter no mínimo 6 caracteres."),
    body("nome").notEmpty().withMessage("O nome é obrigatório."),
    body("id_permissao").isInt().withMessage("Escolha obrigatória"),

    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { nome, email, senha, id_permissao } = req.body;
      User.findUser(email, (err, results) => {
        if (err) {
          return res.status(500).json({ message: "Erro no servidor" });
        }
        if (results.length > 0) {
          return res.status(400).json({ message: "Email já registrado" });
        }
        bcrypt.hash(senha, 10, (err, hashedPassword) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Erro ao criptografar a senha" });
          }

          const newUser = { nome, email, senha: hashedPassword, id_permissao };
          User.createUser(newUser, (err, result) => {
            if (err) {
              return res.status(500).json({ message: "Erro ao criar usuário" });
            }
            return res
              .status(201)
              .json({ message: "Usuário criado com sucesso" });
          });
        });
      });
    },
  ],
  login: [
    body("email").isEmail().withMessage("Insira um email válido."),
    body("password").exists().withMessage("A senha é obrigatória."),

    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      User.findUser(email, (err, results) => {
        if (err) {
          return res.status(500).json({ message: "Erro no servidor" });
        }
        if (results.length === 0) {
          return res.status(400).json({ message: "Email ou senha incorretos" });
        }

        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            return res.status(500).json({ message: "Erro no servidor" });
          }
          if (!isMatch) {
            return res
              .status(400)
              .json({ message: "Email ou senha incorretos" });
          }

          const token = jwt.sign(
            { id: user.id, email: user.email },
            "SECRET_KEY"
          );
          return res.json({ token });
        });
      });
    },
  ],
};
module.exports = authController;