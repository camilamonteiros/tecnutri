import { Col, Row } from "react-bootstrap";
import styles from "./LinhasProdutos.module.css";
import { Floppy2, PencilSquare, PlusLg, Trash, XLg } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import ProductLineService from "../../services/productLineService";
import MainTitle from "../../components/MainTitle";

function LinhasProdutos() {
  const [productsLines, setProductsLines] = useState([]);
  const [editingProductLine, setEditingProductLine] = useState(null);
  const [editedProductLineData, setEditedProductLineData] = useState({});
  const [creatingProductLine, setCreatingProductLine] = useState(false);
  const [newProductLineData, setNewProductLineData] = useState({
    nome_linha: ""
  });

  // Carregando os dados das linhas de produtos ao montar o componente
  useEffect(() => {
    async function fetchProductsLines() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token de autenticação não encontrado");
        }
        const response = await ProductLineService.getProductsLines(token);
        setProductsLines(response.data); // Verifique se response.data está correto
      } catch (error) {
        console.error("Erro ao buscar linha: ", error);
      }
    }
    fetchProductsLines();
  }, []);

  // Função para iniciar a edição de uma linha de produto
  const handleEditProductLine = (productLine) => {
    setEditingProductLine(productLine);
    setEditedProductLineData(productLine);
  };

  // Função para cancelar a edição
  const handleCancelEdit = () => {
    setEditingProductLine(null);
    setEditedProductLineData({});
  };

  // Função para salvar a edição
  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token de autenticação não encontrado");
      }
      await ProductLineService.updateProductLine(editingProductLine.id_linha, editedProductLineData, token);
      const response = await ProductLineService.getProductsLines(token);
      setProductsLines(response.data); // Atualiza a lista de produtos após salvar
      setEditingProductLine(null); // Sai do modo de edição
      setEditedProductLineData({}); // Limpa os dados editados
    } catch (error) {
      console.error("Erro ao atualizar produto: ", error);
    }
  };

  // Função para deletar uma linha de produto
  const handleDeleteProductLine = async (productLineId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token de autenticação não encontrado");
      }
      await ProductLineService.deleteProductLine(productLineId, token);
      const response = await ProductLineService.getProductsLines(token);
      setProductsLines(response.data); // Atualiza a lista de produtos após deletar
    } catch (error) {
      console.error("Erro ao excluir produto: ", error);
    }
  };

  // Função para criar uma nova linha de produto
  const handleCreateProductLine = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token de autenticação não encontrado");
      }
      await ProductLineService.createProductLine(newProductLineData, token);
      const response = await ProductLineService.getProductsLines(token);
      setProductsLines(response.data); // Atualiza a lista de produtos após criar
      setCreatingProductLine(false); // Sai do modo de criação
      setNewProductLineData({ nome_linha: "" }); // Limpa os dados do novo produto
    } catch (error) {
      console.error("Erro ao criar produto:", error);
    }
  };

  // Função para lidar com a mudança de dados do novo produto
  const handleNewProductLineDataChange = (event) => {
    const { name, value } = event.target;
    setNewProductLineData((prevProductLineData) => ({
      ...prevProductLineData,
      [name]: value,
    }));
  };

  // Função para lidar com a mudança de dados do produto editado
  const handleEditedProductLineDataChange = (event) => {
    const { name, value } = event.target;
    setEditedProductLineData((prevProductLineData) => ({
      ...prevProductLineData,
      [name]: value,
    }));
  };

  // Função para cancelar a criação de um novo produto
  const handleCancelCreate = () => {
    setCreatingProductLine(false);
    setNewProductLineData({ nome_linha: "" });
  };

  return (
    <>
    <main className={`container py-3`}>
      <MainTitle>Linhas de Produtos</MainTitle>
      {!creatingProductLine && (
        <Row>
          <Col xs={12} className="d-flex justify-content-end py-3">
            <button
              className={styles.newUser}
              onClick={() => setCreatingProductLine(true)}
            >
              <PlusLg className="mx-1"/>  Nova Linha de Produtos
            </button>
          </Col>
        </Row>
      )}
      {creatingProductLine && (
        <>
          <Row>
            <Col xs={12}>
              <h3>Nova Linha de Produtos</h3>
              <div className={`d-flex justify-content-start flex-wrap ${styles.inputBox}`}>
                <input
                  type="text"
                  name="nome_linha"
                  placeholder="Nome"
                  value={newProductLineData.nome_linha}
                  onChange={handleNewProductLineDataChange}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-start mb-3">
              <button className={styles.newUser} onClick={handleCreateProductLine}>
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
        <Col xs={12}>
          <table>
            <thead>
              <tr className={`${styles.tableHead} text-center`}>
                <th className={styles.tableHead}>Nome</th>
                <th className={styles.tableHead}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {productsLines.map((productLine) => (
                <tr key={productLine.id_linha} className="text-center">
                  <td data-label="Nome" className={styles.tableText}>
                    {editingProductLine?.id_linha === productLine.id_linha ? (
                      <input
                        type="text"
                        name="nome_linha"
                        value={editedProductLineData.nome_linha}
                        onChange={handleEditedProductLineDataChange}
                      />
                    ) : (
                      productLine.nome_linha
                    )}
                  </td>
                  <td data-label="Ações" className={`${styles.tableText}`}>
                    {editingProductLine?.id_linha === productLine.id_linha ? (
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
                        <button className={styles.acoes} onClick={() => handleEditProductLine(productLine)}>
                          <PencilSquare />
                        </button>
                        <button className={styles.acoes} onClick={() => handleDeleteProductLine(productLine.id_linha)}>
                          <Trash />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
    </main>
    </>
  );
}

export default LinhasProdutos;
