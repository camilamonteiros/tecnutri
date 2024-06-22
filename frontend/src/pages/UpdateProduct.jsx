/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductService from "../services/productService.js";

const UpdateProduct = ({ token }) => {
  const { id } = useParams();
  const [productData, setProductData] = useState({
    nome_produto: "",
    descricao: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await ProductService.findProduct(id, token);
        const product = response.data[0];
        setProductData({
          nome_produto: product.nome_produto,
          descricao: product.descricao,
        });
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      }
    };

    fetchProduct();
  }, [id, token]);

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ProductService.updateProduct(id, productData, token);
      alert("Produto atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Atualizar Produto</h2>
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
      <button type="submit">Atualizar</button>
    </form>
  );
};

export default UpdateProduct;
