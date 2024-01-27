import { useEffect, useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import axios from "axios";
import { BASE_API_URL } from "../../utils/api/bigjuice";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ConfirmationMessage } from "../ConfirmationMessage/ConfirmationMessage";
import { EditUser } from "./EditUser";
import "./Users.css";

export function Users() {
  const [users, setUsers] = useState([]);
  const [showUsersData, setShowUsersData] = useState(true);
  const [showUsersMessage, setShowUsersMessage] = useState(false);
  const [usersMessage, setUsersMessage] = useState("");
  const [showEditUserForm, setShowEditUserForm] = useState(false);
  const [showButtonNewUserForm, setShowButtonNewUserForm] = useState(true);
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const jwtToken = localStorage.getItem("jwtToken");
  const rol = localStorage.getItem("rol");
  const [showNewUserForm, setShowNewUserForm] = useState(false);
  const [userForm, setUserForm] = useState({
    name: "",
    rol: "",
    ubication: "",
    id: "",
    password: "",
  });

  const getData = async () => {
    if (rol !== "admin") {
      setShowUsersData(false);
      setShowUsersMessage(true);
      setShowButtonNewUserForm(false);
    }

    try {
      const getUsers = await axios.get(`${BASE_API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      setUsers(getUsers.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const passUserData = (dataUser) => {
    setUser(dataUser);
    setShowEditUserForm(true);
    console.log(user);
  };

  const deleteRequest = async () => {
    try {
      const request = await axios.delete(
        `${BASE_API_URL}/users/remove/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (request.data.status === 200) {
        setUserId("");
        setUser({});
        setShowDelete(false);
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const showDeleteUserMessage = (user) => {
    setUserId(user.id);
    setUser(user);
    setShowDelete(true);
    getData();
  };

  const cancelDeleteFunciton = () => {
    setUserId("");
    setUser({ name: "", rol: "", ubication: "", id: "", password: "" });
    setShowDelete(false);
  };

  const newUserFunction = async (e) => {
    e.preventDefault();
    try {
      const request = await axios.post(
        `${BASE_API_URL}/users/new`,
        {
          ...userForm,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      console.log(request);
      if (request.data.status === 201) {
        getData();
        setShowNewUserForm(false);
        setUser({ name: "", rol: "", ubication: "", id: "", password: "" });
      }
    } catch (error) {}
  };

  const fillDataUserForm = async (e) => {
    const dataNewUser = { ...userForm };
    dataNewUser[e.target.name] = e.target.value;
    setUserForm(dataNewUser);
  };

  const openNewUserForm = () => {
    setShowNewUserForm(true);
  };

  const closeNewUserForm = (e) => {
    e.preventDefault();
    setShowNewUserForm(false);
    setUserId("");
    setUser({ name: "", rol: "", ubication: "", id: "", password: "" });
  };

  const closeEditUserFormFunction = (e) => {
    e.preventDefault();
    setShowEditUserForm(false);
    setUserId("");
    setUser({ name: "", rol: "", ubication: "", id: "", password: "" });
  }

  return (
    <div>
      <Navbar />
      {showUsersMessage && (
        <p className="inventory-message">
          Inicia Sesión con una cuenta autorizada.
        </p>
      )}
      {showButtonNewUserForm && (
        <button className="register-user-button" onClick={openNewUserForm}>
          Nuevo
        </button>
      )}
      {showEditUserForm && (
        <EditUser
          user={user}
          setShowEditUserForm={setShowEditUserForm}
          getData={getData}
          closeEditUserFormFunction={closeEditUserFormFunction}
        />
      )}
      {showDelete && (
        <ConfirmationMessage>
          <h2
            style={{ textAlign: "center" }}
          >{`¿Desea eliminar al usuario ${user.name.toUpperCase()}?`}</h2>
          <div className="buttons-delete-supplier-container">
            <button className="confirm-delete-supplier" onClick={deleteRequest}>
              Confirmar
            </button>
            <button
              className="confirm-cancel-supplier"
              onClick={cancelDeleteFunciton}
            >
              Cancelar
            </button>
          </div>
        </ConfirmationMessage>
      )}
      {showNewUserForm && (
        <ConfirmationMessage height={"25rem"}>
          <h2 style={{ textAlign: "center" }}>Crear nuevo usuario</h2>
          <form className="form-new-user">
            <label>Nombre</label>
            <input
              type="text"
              name="name"
              value={userForm.name}
              onChange={fillDataUserForm}
            />
            <label>Rol</label>
            <select
              name="rol"
              type="text"
              value={userForm.rol}
              onChange={fillDataUserForm}
            >
              <option value="" disabled>
                ...
              </option>
              <option value="vendedor">Vendedor</option>
              <option value="admin">Administrador</option>
            </select>
            <label>Ubicación</label>
            <select
              name="ubication"
              type="text"
              value={userForm.ubication}
              onChange={fillDataUserForm}
            >
              <option value="" disabled>
                ...
              </option>
              <option value="villa colombia">Villa Colombia</option>
              <option value="unico">Unico</option>
            </select>
            <label>Id</label>
            <input
              type="text"
              name="id"
              value={userForm.id}
              onChange={fillDataUserForm}
            />
            <label>Password</label>
            <input
              type="text"
              name="password"
              value={userForm.password}
              onChange={fillDataUserForm}
              required
            />
            <div className="buttons-edituser-container">
              <button className="confirm-edit-user" onClick={(e) => newUserFunction(e)}>Crear</button>
              <button className="confirm-cancel-user" onClick={(e) => closeNewUserForm(e)}>Cancelar</button>
            </div>
          </form>
        </ConfirmationMessage>
      )}
      {showUsersData && (
        <div className="user-table-container">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Id Usuario</th>
                <th>Rol</th>
                <th>Fecha de Registro</th>
                <th>Ubicación</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.id}</td>
                  <td>{user.rol.toUpperCase()}</td>
                  <td>{user.registration_date}</td>
                  <td>{user.ubication.toUpperCase()}</td>
                  <td onClick={() => showDeleteUserMessage(user)}>
                    {<RiDeleteBin6Line />}
                  </td>
                  <td onClick={() => passUserData(user)}>{<MdEdit />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
