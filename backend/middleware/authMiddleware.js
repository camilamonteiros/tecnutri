const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
 const token = req.header("Authorization"). replace("Bearer ", "");
 if(!token){
  return res.status(401).json({ message: "Autenticação necessária" })
 }
 try {
  const decoded = jwt.verify(token, "SECRET_KEY");
  req.user = decoded;
  next();
 } catch (error) {
  res.status(401).json({ message: "Token inválido" });
 }
};

module.exports = authMiddleware;
