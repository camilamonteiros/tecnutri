/* eslint-disable react/prop-types */
import { useState } from "react";
import ProductService from "../services/productService.js";

const CreateProduct = ({ token }) => {
  const [productData, setProductData] = useState({
    nome_produto: "",
    descricao: "",
  });

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ProductService.createProduct(productData, token);
      alert("Produto criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar produto:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Criar Produto</h2>
      <div>
        <label>Nome do Produto:</label>
        <input
          type="text"
          name="nome_produto"
          value={productData.nome_produto}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Descrição:</label>
        <input
          type="text"
          name="descricao"
          value={productData.descricao}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Criar</button>
    </form>
  );
};

export default CreateProduct;
