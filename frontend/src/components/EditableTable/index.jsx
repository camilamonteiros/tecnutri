/* eslint-disable react/prop-types */
import { Col, Row } from "react-bootstrap";
import { Floppy2, PencilSquare, PlusLg, Trash, XLg } from "react-bootstrap-icons";
import { useState } from "react";
import styles from "./EditableTable.module.css"; // Crie um arquivo CSS para os estilos deste componente

function EditableTable({ columns, data, onSave, onDelete, onCreate }) {
  const [editingItem, setEditingItem] = useState(null);
  const [editedItemData, setEditedItemData] = useState({});
  const [creatingItem, setCreatingItem] = useState(false);
  const [newItemData, setNewItemData] = useState(columns.reduce((acc, col) => ({ ...acc, [col.field]: "" }), {}));

  const handleEditItem = (item) => {
    setEditingItem(item);
    setEditedItemData(item);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setEditedItemData({});
  };

  const handleSaveEdit = async () => {
    await onSave(editingItem.id, editedItemData);
    setEditingItem(null);
    setEditedItemData({});
  };

  const handleDeleteItem = async (itemId) => {
    await onDelete(itemId);
  };

  const handleCreateItem = async () => {
    await onCreate(newItemData);
    setCreatingItem(false);
    setNewItemData(columns.reduce((acc, col) => ({ ...acc, [col.field]: "" }), {}));
  };

  const handleNewItemDataChange = (event) => {
    const { name, value } = event.target;
    setNewItemData((prevItemData) => ({
      ...prevItemData,
      [name]: value,
    }));
  };

  const handleEditedItemDataChange = (event) => {
    const { name, value } = event.target;
    setEditedItemData((prevItemData) => ({
      ...prevItemData,
      [name]: value,
    }));
  };

  return (
    <>
      <Row>
        <Col xs={12} className="d-flex justify-content-end py-3">
          {!creatingItem && (
            <button className={styles.newUser} onClick={() => setCreatingItem(true)}>
              <PlusLg className="mx-1" /> Novo Item
            </button>
          )}
        </Col>
      </Row>

      {creatingItem && (
        <>
          <Row>
            <Col xs={12}>
              <h3>Novo Item</h3>
              <div className={`d-flex justify-content-start flex-wrap ${styles.inputBox}`}>
                {columns.map((col) => (
                  col.type === "select" ? (
                    <select key={col.field} name={col.field} value={newItemData[col.field]} onChange={handleNewItemDataChange}>
                      <option value="">Selecione {col.label}</option>
                      {col.options.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      key={col.field}
                      type={col.type}
                      name={col.field}
                      placeholder={col.label}
                      value={newItemData[col.field]}
                      onChange={handleNewItemDataChange}
                    />
                  )
                ))}
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-start mb-3">
              <button className={styles.newUser} onClick={handleCreateItem}>
                Enviar
              </button>
              <button className={styles.cancel} onClick={() => setCreatingItem(false)}>
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
                {columns.map((col) => (
                  <th key={col.field} className={styles.tableHead}>{col.label}</th>
                ))}
                <th className={styles.tableHead}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="text-center">
                  {columns.map((col) => (
                    <td key={col.field} data-label={col.label} className={styles.tableText}>
                      {editingItem?.id === item.id ? (
                        col.type === "select" ? (
                          <select name={col.field} value={editedItemData[col.field]} onChange={handleEditedItemDataChange}>
                            <option value="">Selecione {col.label}</option>
                            {col.options.map((option) => (
                              <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={col.type}
                            name={col.field}
                            value={editedItemData[col.field]}
                            onChange={handleEditedItemDataChange}
                          />
                        )
                      ) : (
                        col.type === "select" ? (
                          col.options.find(option => option.value === item[col.field])?.label || "Opção não encontrada"
                        ) : (
                          item[col.field]
                        )
                      )}
                    </td>
                  ))}
                  <td data-label="Ações" className={styles.tableText}>
                    {editingItem?.id === item.id ? (
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
                        <button className={styles.acoes} onClick={() => handleEditItem(item)}>
                          <PencilSquare />
                        </button>
                        <button className={styles.acoes} onClick={() => handleDeleteItem(item.id)}>
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
    </>
  );
}

export default EditableTable;
