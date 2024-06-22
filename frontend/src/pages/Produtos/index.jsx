import { Col, Row } from "react-bootstrap";
import styles from "./Produtos.module.css";
import { Floppy2, Inboxes, PencilSquare, PlusLg, Trash, XLg } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import ProductService from "../../services/productService";
import ProductLineService from "../../services/productLineService";
import { Link } from "react-router-dom";
import MainTitle from "../../components/MainTitle";

function Produtos() {
  const [lines, setLines] = useState([]); 
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedProductData, setEditedProductData] = useState({});
  const [creatingProduct, setCreatingProduct] = useState(false);
  const [newProductData, setNewProductData] = useState({
    nome_produto: "", id_linha: "", codigo_nf_produto: "", codigo_vaccinar_produto: "", uso_produto: "", embalagem_produto: "", preco_produto: ""
  });

  // Carregando os dados das linhas de produtos ao montar o componente
  useEffect(() => {
    async function fetchData(){
      try {
        const token = localStorage.getItem("token");
        if(!token){
          throw new Error("Token de autenticação não encontrado");
        }
        const [productsResponse, linhasResponse] = await Promise.all([
          ProductService.getProducts(token),
          ProductLineService.getProductsLines(token)
        ]);
        setProducts(productsResponse.data);
        setLines(linhasResponse.data);
      } catch (error) {
        console.error("Erro ao buscar dados: ", error);
      }
    }
    fetchData();
  }, []);

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setEditedProductData(product);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setEditedProductData({});
  };

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token de autenticação não encontrado");
      }
      await ProductService.updateProduct(editingProduct.id_produto, editedProductData, token);
      const response = await ProductService.getProducts(token);
      setProducts(response.data);
      setEditingProduct(null);
      setEditedProductData({});
    } catch (error) {
      console.error("Erro ao atualizar produto: ", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token de autenticação não encontrado");
      }
      await ProductService.deleteProduct(productId, token);
      const response = await ProductService.getProducts(token);
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao excluir produto: ", error);
    }
  };

  const handleCreateProduct = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token de autenticação não encontrado");
      }
      await ProductService.createProduct(newProductData, token);
      const response = await ProductService.getProducts(token);
      setProducts(response.data);
      setCreatingProduct(false);
      setNewProductData({ nome_produto: "", id_linha: "", codigo_nf_produto: "", codigo_vaccinar_produto: "", uso_produto: "", embalagem_produto: "", preco_produto: "" });
    } catch (error) {
      console.error("Erro ao criar produto:", error);
    }
  };

  const handleNewProductDataChange = (event) => {
    const { name, value } = event.target;
    setNewProductData((prevProductData) => ({
      ...prevProductData,
      [name]: value,
    }));
  };

  const handleEditedProductDataChange = (event) => {
    const { name, value } = event.target;
    setEditedProductData((prevProductData) => ({
      ...prevProductData,
      [name]: value,
    }));
  };

  const handleCancelCreate = () => {
    setCreatingProduct(false);
    setNewProductData({ nome_produto: "", id_linha: "", codigo_nf_produto: "", codigo_vaccinar_produto: "", uso_produto: "", embalagem_produto: "", preco_produto: "" });
  };

  return (
    <>
      
      <main className={`container py-3`}>
        <MainTitle>Produtos</MainTitle>
          <Row>
            <Col xs={12} className="d-flex justify-content-end py-3">
            <Link to="/product/linhasProdutos">
            <button
                className={styles.newUser}
  
              >
                <Inboxes/> <span>Linha de Produtos</span>
              </button></Link>
            {!creatingProduct && (
              <button
                className={styles.newUser}
                onClick={() => setCreatingProduct(true)}
              >
                <PlusLg className="mx-1"/>  Novo Produto
              </button>
            )}
            </Col>
          </Row>
        
        {creatingProduct && (
          <>
            <Row>
              <Col xs={12}>
                <h3>Novo Produto</h3>
                <div className={`d-flex justify-content-start flex-wrap ${styles.inputBox}`}>
                  <input
                    type="text"
                    name="nome_produto"
                    placeholder="Nome"
                    value={newProductData.nome_produto}
                    onChange={handleNewProductDataChange}
                  />
                  <select name="id_linha" value={newProductData.id_linha} onChange={handleNewProductDataChange}>
                    <option value="">Selecione a linha</option>
                    {lines.map((line) => (
                      <option key={line.id_linha} value={line.id_linha}>{line.nome_linha}</option>
                    ))}
                  </select>
                  <input
                    type="number"
                    name="codigo_nf_produto"
                    placeholder="Código NF"
                    value={newProductData.codigo_nf_produto}
                    onChange={handleNewProductDataChange}
                  />
                  <input
                    type="number"
                    name="codigo_vaccinar_produto"
                    placeholder="Código Vaccinar"
                    value={newProductData.codigo_vaccinar_produto}
                    onChange={handleNewProductDataChange}
                  />
                  <input
                    type="text"
                    name="uso_produto"
                    placeholder="Uso"
                    value={newProductData.uso_produto}
                    onChange={handleNewProductDataChange}
                  />
                  <input
                    type="text"
                    name="embalagem_produto"
                    placeholder="Embalagem"
                    value={newProductData.embalagem_produto}
                    onChange={handleNewProductDataChange}
                  />
                  <input
                    type="number"
                    step="0.01"
                    name="preco_produto"
                    placeholder="Preço (R$)"
                    value={newProductData.preco_produto}
                    onChange={handleNewProductDataChange}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-start mb-3">
                <button className={styles.newUser} onClick={handleCreateProduct}>
                  Enviar
                </button>
                <button className={styles.cancel} onClick={handleCancelCreate}>
                  Cancelar
                </button>
              </Col>
            </Row>
          </>
        )}
        <Row>
          <Col xs={12} className="d-flex justify-content-center">
            <table className="col-12">
              <thead>
                <tr className={`${styles.tableHead} text-center`}>
                  <th className={styles.tableHead}>Nome</th>
                  <th className={styles.tableHead}>Linha</th>
                  <th className={styles.tableHead}>Código NF</th>
                  <th className={styles.tableHead}>Código Vaccinar</th>
                  <th className={styles.tableHead}>Uso</th>
                  <th className={styles.tableHead}>Embalagem</th>
                  <th className={styles.tableHead}>Preço (R$)</th>
                  <th className={styles.tableHead}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const line = lines.find(line => line.id_linha === product.id_linha);
                  return (
                    <tr key={product.id_produto} className="text-center">
                      <td data-label="Nome" className={styles.tableText}>
                        {editingProduct?.id_produto === product.id_produto ? (
                          <input
                            type="text"
                            name="nome_produto"
                            value={editedProductData.nome_produto}
                            onChange={handleEditedProductDataChange}
                          />
                        ) : (
                          product.nome_produto
                        )}
                      </td>
                      <td data-label="Linha" className={styles.tableText}>
                        {editingProduct?.id_produto === product.id_produto ? (
                          <select name="id_linha" value={editedProductData.id_linha} onChange={handleEditedProductDataChange}>
                            <option value="">Selecione a linha</option>
                            {lines.map((line) => (
                              <option key={line.id_linha} value={line.id_linha}>{line.nome_linha}</option>
                            ))}
                          </select>
                        ) : (
                          line ? line.nome_linha : "Linha não encontrada"
                        )}
                      </td>
                      <td data-label="Código NF" className={styles.tableText}>
                        {editingProduct?.id_produto === product.id_produto ? (
                          <input
                            type="number"
                            name="codigo_nf_produto"
                            value={editedProductData.codigo_nf_produto}
                            onChange={handleEditedProductDataChange}
                          />
                        ) : (
                          product.codigo_nf_produto
                        )}
                      </td>
                      <td data-label="Código Vaccinar" className={styles.tableText}>
                        {editingProduct?.id_produto === product.id_produto ? (
                          <input
                            type="number"
                            name="codigo_vaccinar_produto"
                            value={editedProductData.codigo_vaccinar_produto}
                            onChange={handleEditedProductDataChange}
                          />
                        ) : (
                          product.codigo_vaccinar_produto
                        )}
                      </td>
                      <td data-label="Uso" className={styles.tableText}>
                        {editingProduct?.id_produto === product.id_produto ? (
                          <input
                            type="text"
                            name="uso_produto"
                            value={editedProductData.uso_produto}
                            onChange={handleEditedProductDataChange}
                          />
                        ) : (
                          product.uso_produto
                        )}
                      </td>
                      <td data-label="Embalagem" className={styles.tableText}>
                        {editingProduct?.id_produto === product.id_produto ? (
                          <input
                            type="text"
                            name="embalagem_produto"
                            value={editedProductData.embalagem_produto}
                            onChange={handleEditedProductDataChange}
                          />
                        ) : (
                          product.embalagem_produto
                        )}
                      </td>
                      <td data-label="Preço (R$)" className={styles.tableText}>
                        {editingProduct?.id_produto === product.id_produto ? (
                          <input
                            type="number"
                            step="0.01"
                            name="preco_produto"
                            value={editedProductData.preco_produto}
                            onChange={handleEditedProductDataChange}
                          />
                        ) : (
                          // Exibir preço com duas casas decimais
                          product.preco_produto.toFixed(2)
                        )}
                      </td>
                      <td data-label="Ações" className={`${styles.tableText}`}>
                        {editingProduct?.id_produto === product.id_produto ? (
                          <>
                            <button className={styles.acoes} onClick={handleSaveEdit}>
                              <Floppy2 />
                            </button>
                            <button className={styles.acoes} onClick={handleCancelEdit}>
                              <XLg />
                            </button>
                          </>
                        ) : (
                          <>
                            <button className={styles.acoes} onClick={() => handleEditProduct(product)}>
                              <PencilSquare />
                            </button>
                            <button className={styles.acoes} onClick={() => handleDeleteProduct(product.id_produto)}>
                              <Trash />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Col>
        </Row>
      </main>
    </>
  );
}

export default Produtos;
