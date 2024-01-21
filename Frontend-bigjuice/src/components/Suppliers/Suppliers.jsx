import { useEffect, useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import axios from "axios";
import { BASE_API_URL } from "../../utils/api/bigjuice";
import { getSuppliers } from "../../utils/api/bigjuice";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ConfirmationMessage } from "../ConfirmationMessage/ConfirmationMessage";

import "./Suppliers.css";

export function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [adminButtonsSuppliers, setAdminButtonsSuppliers] = useState(false);
  const [showNewSupplierForm, setShowNewSupplierForm] = useState(false);
  const [showEditSupplierForm, setShowEditSupplierForm] = useState(false);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  
  const [supplierName, setSupplierName] = useState("");
  const [supplierUbication, setSupplierUbication] = useState("");
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const jwtToken = localStorage.getItem("jwtToken");
  const rol = localStorage.getItem("rol");

  useEffect(() => {
    const fetchData = async () => {
      rol !== "admin"
        ? setAdminButtonsSuppliers(false)
        : setAdminButtonsSuppliers(true);
      try {
        const response = await axios.get(`${BASE_API_URL}/suppliers`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setSuppliers(response.data); // Accede a la propiedad 'data'
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // Filtrar proveedores en función de la palabra clave de búsqueda
  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.ingredient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const editSupplier = async (event) => {
    try {
      event.preventDefault();
      const productionRequest = await axios.put(
        `${BASE_API_URL}/suppliers/edit/${supplierId}`,
        {
          name: supplierName,
          ubication: supplierUbication,
          date: date,
          phone: phone,
          email: email,
          ingredient: ingredient,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      const getSuppliersUpdated = await axios.get(`${BASE_API_URL}/suppliers`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      setSuppliers(getSuppliersUpdated.data);
      setShowEditSupplierForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fillForm = async (supplier) => {
    setShowEditSupplierForm(true);
    setSupplierId(supplier.id);
    setSupplierName(supplier.name);
    setSupplierUbication(supplier.ubication);
    setDate(supplier.date);
    setPhone(supplier.phone);
    setEmail(supplier.email);
    setIngredient(supplier.ingredient);
  };

  const closeEditForm = () => {
    setShowEditSupplierForm(false);
  };

  const closeDeleteConfirmation = () => {
    setShowDeleteMessage(false);
  };

  const confirmDeleteSupplier = async () => {
    try {
      const deleteRequest = await axios.delete(
        `${BASE_API_URL}/suppliers/remove/${supplierId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setShowDeleteMessage(false);
    } catch (error) {
      console.error();
    }
  };

  const deleteSupplier = (supplier) => {
    setSupplierId(supplier.id);
    setSupplierName(supplier.name);
    setShowDeleteMessage(true);
  };

  useEffect(() => {
    setSupplierName(supplierName);
  }, [supplierName]);

  const openFormNewSupp = () => {
    setShowNewSupplierForm(true);
  };

  const closeFormNewSupp = () => {
    setShowNewSupplierForm(false);
  };

  const newSupplier = async () => {
    try {
      const newSupplierRequest = await axios.post(
        `${BASE_API_URL}/suppliers/new`,
        {
          name: supplierName,
          ubication: supplierUbication,
          date: date,
          phone: phone,
          email: email,
          ingredient: ingredient,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      const getSuppliersUpdated = await axios.get(`${BASE_API_URL}/suppliers`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      setSuppliers(getSuppliersUpdated.data);
      setShowNewSupplierForm(false);
      setSupplierName("");
      setSupplierUbication("");
      setDate("");
      setPhone("");
      setEmail("");
      setIngredient("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="suppliers-container">
      <Navbar />

      {showEditSupplierForm && (
        <ConfirmationMessage>
          <form className="form-edit-supplier">
            <p onClick={closeEditForm} className="close-editsupplier-button">
              x
            </p>
            <h2>Editar Proveedor</h2>
            <label>Nombre</label>
            <input
              type="text"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
            />
            <label>Producto</label>
            <input
              type="text"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
            />
            <label>Número</label>
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label>Correo</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Ubicación</label>
            <select
              type="text"
              value={supplierUbication}
              onChange={(e) => setSupplierUbication(e.target.value)}
            >
              <option value="villa colombia">Villa Colombia</option>
            </select>
            <button
              type="button"
              className="button-edit-supplier"
              onClick={(event) => editSupplier(event)}
            >
              Editar
            </button>
          </form>
        </ConfirmationMessage>
      )}

      {showDeleteMessage && (
        <ConfirmationMessage>
          <p className="message-confirm-delete-supplier">
            {`¿Está seguro que desea eliminar el proveedor ${supplierName}?`}
          </p>
          <div className="buttons-delete-supplier-container">
            <button
              className="confirm-delete-supplier"
              onClick={confirmDeleteSupplier}
            >
              Confirmar
            </button>
            <button
              className="confirm-cancel-supplier"
              onClick={closeDeleteConfirmation}
            >
              Cancelar
            </button>
          </div>
        </ConfirmationMessage>
      )}

      {showNewSupplierForm && (
        <ConfirmationMessage>
          <form className="form-edit-supplier">
            <p onClick={closeFormNewSupp} className="close-editsupplier-button">
              x
            </p>
            <h2>Registrar Proveedor</h2>
            <label>Nombre</label>
            <input
              type="text"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
            />
            <label>Producto</label>
            <input
              type="text"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
            />
            <label>Número</label>
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label>Correo</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Ubicación</label>
            <select
              type="text"
              value={supplierUbication}
              onChange={(e) => setSupplierUbication(e.target.value)}
            >
              <option value="" disabled>
                Selecionar...
              </option>
              <option value="villa colombia">Villa Colombia</option>
            </select>
            <button
              type="button"
              className="button-edit-supplier"
              onClick={newSupplier}
            >
              Editar
            </button>
          </form>
        </ConfirmationMessage>
      )}

      <div className="search-supplier">
        <label>Buscar proveedor por ingrediente</label>
        <input
          type="text"
          placeholder="Ingrediente"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <button className="new-supplier-button" onClick={openFormNewSupp}>
        Registrar proveedor
      </button>
      <div className="suppliers">
        {filteredSuppliers.map((supplier) => (
          <section key={supplier.id}>
            {adminButtonsSuppliers && (
              <span
                onClick={() => deleteSupplier(supplier)}
                className="suppliers-buttons-close"
              >
                <RiDeleteBin6Line />
              </span>
            )}
            {adminButtonsSuppliers && (
              <span
                onClick={() => fillForm(supplier)}
                className="suppliers-buttons-edit"
              >
                <MdEdit color="yellow" />
              </span>
            )}
            <h2>{supplier.name}</h2>
            <p>{supplier.ingredient}</p>
            <p>{supplier.phone}</p>
            <p>{supplier.email}</p>
            <p>{supplier.ubication}</p>
            <p>{supplier.date}</p>
          </section>
        ))}
      </div>
    </div>
  );
}