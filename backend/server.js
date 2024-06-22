const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes.js");
const batchRoutes = require("./routes/batchRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const productLineRoutes = require("./routes/productLineRoutes.js");
const clientRoutes = require("./routes/clientRoutes.js");
const entrytRoutes = require("./routes/entryRoutes.js")
const app = express();
const PORT = 8800;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:8800", "http://localhost:5173"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/batch", batchRoutes);
app.use("/product", productRoutes);
app.use("/productLine", productLineRoutes);
app.use("/client", clientRoutes);
app.use("/entry", entrytRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
