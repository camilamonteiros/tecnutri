import { Col, Row } from "react-bootstrap";
import styles from "./Clientes.module.css";
import { Floppy2, PencilSquare, PlusLg, Trash, XLg } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import ClientService from "../../services/clientService";
import MainTitle from "../../components/MainTitle";

function Clientes() {
  const [clients, setClients] = useState([]);
  const [editingClient, setEditingClient] = useState(null);
  const [editedClientData, setEditedClientData] = useState({});
  const [creatingClient, setCreatingClient] = useState(false);
  const [newClientData, setNewClientData] = useState({
    nome_cliente: ""
  });

  // Carregando os dados dos clientes de produtos ao montar o componente
  useEffect(() => {
    async function fetchClients() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token de autenticação não encontrado");
        }
        const response = await ClientService.getClients(token);
        setClients(response.data); // Verifique se response.data está correto
      } catch (error) {
        console.error("Erro ao buscar cliente: ", error);
      }
    }
    fetchClients();
  }, []);

  // Função para iniciar a edição de um cliente de produto
  const handleEditClient = (client) => {
    setEditingClient(client);
    setEditedClientData(client);
  };

  // Função para cancelar a edição
  const handleCancelEdit = () => {
    setEditingClient(null);
    setEditedClientData({});
  };

  // Função para salvar a edição
  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token de autenticação não encontrado");
      }
      await ClientService.updateClient(editingClient.id_cliente, editedClientData, token);
      const response = await ClientService.getClients(token);
      setClients(response.data); // Atualiza a lista de produtos após salvar
      setEditingClient(null); // Sai do modo de edição
      setEditedClientData({}); // Limpa os dados editados
    } catch (error) {
      console.error("Erro ao atualizar produto: ", error);
    }
  };

  // Função para deletar uma cliente de produto
  const handleDeleteClient = async (clientId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token de autenticação não encontrado");
      }
      await ClientService.deleteClient(clientId, token);
      const response = await ClientService.getClients(token);
      setClients(response.data); // Atualiza a lista de produtos após deletar
    } catch (error) {
      console.error("Erro ao excluir produto: ", error);
    }
  };

  // Função para criar uma nova cliente de produto
  const handleCreateClient = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token de autenticação não encontrado");
      }
      await ClientService.createClient(newClientData, token);
      const response = await ClientService.getClients(token);
      setClients(response.data); // Atualiza a lista de produtos após criar
      setCreatingClient(false); // Sai do modo de criação
      setNewClientData({ nome_cliente: "" }); // Limpa os dados do novo produto
    } catch (error) {
      console.error("Erro ao criar produto:", error);
    }
  };

  // Função para lidar com a mudança de dados do novo produto
  const handleNewClientDataChange = (event) => {
    const { name, value } = event.target;
    setNewClientData((prevClientData) => ({
      ...prevClientData,
      [name]: value,
    }));
  };

  // Função para lidar com a mudança de dados do produto editado
  const handleEditedClientDataChange = (event) => {
    const { name, value } = event.target;
    setEditedClientData((prevClientData) => ({
      ...prevClientData,
      [name]: value,
    }));
  };

  // Função para cancelar a criação de um novo produto
  const handleCancelCreate = () => {
    setCreatingClient(false);
    setNewClientData({ nome_cliente: "" });
  };

  return (
    <>
    <main className={`container py-3`}>
      <MainTitle>Clientes</MainTitle>
      {!creatingClient && (
        <Row>
          <Col xs={12} className="d-flex justify-content-end py-3">
            <button
              className={styles.newUser}
              onClick={() => setCreatingClient(true)}
            >
              <PlusLg className="mx-1"/>  Novo Cliente
            </button>
          </Col>
        </Row>
      )}
      {creatingClient && (
        <>
          <Row>
            <Col xs={12}>
              <h3>Novo Cliente</h3>
              <div className={`d-flex justify-content-start flex-wrap ${styles.inputBox}`}>
                <input
                  type="text"
                  name="nome_cliente"
                  placeholder="Nome"
                  value={newClientData.nome_cliente}
                  onChange={handleNewClientDataChange}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-start mb-3">
              <button className={styles.newUser} onClick={handleCreateClient}>
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
              {clients.map((client) => (
                <tr key={client.id_cliente} className="text-center">
                  <td data-label="Nome" className={styles.tableText}>
                    {editingClient?.id_cliente === client.id_cliente ? (
                      <input
                        type="text"
                        name="nome_cliente"
                        value={editedClientData.nome_cliente}
                        onChange={handleEditedClientDataChange}
                      />
                    ) : (
                      client.nome_cliente
                    )}
                  </td>
                  <td data-label="Ações" className={`${styles.tableText}`}>
                    {editingClient?.id_cliente === client.id_cliente ? (
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
                        <button className={styles.acoes} onClick={() => handleEditClient(client)}>
                          <PencilSquare />
                        </button>
                        <button className={styles.acoes} onClick={() => handleDeleteClient(client.id_cliente)}>
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

export default Clientes;
