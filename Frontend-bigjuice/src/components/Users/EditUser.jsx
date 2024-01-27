import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../utils/api/bigjuice";
import { ConfirmationMessage } from "../ConfirmationMessage/ConfirmationMessage";
import { IoCloseSharp } from "react-icons/io5";
import "./Users.css";

export function EditUser({ user, setShowUserForm, getData, closeEditUserFormFunction }) {
  const jwtToken = localStorage.getItem("jwtToken");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    rol: "",
    ubication: "",
    password: "",
  });

  useEffect(() => {
    user.password = "";
    setUserData(user);
  }, []);

  const editRequest = async (event) => {
    event.preventDefault();
    try {
      const request = await axios.put(
        `${BASE_API_URL}/users/edit/${user.id}`,
        {
          ...userData,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      console.log(request.data.status);
      if (request.data.status === 200) {
        getData();
        setShowUserForm(false);
        setShowEditUserForm(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fillDataForm = (e) => {
    const newUserData = { ...userData };
    newUserData[e.target.name] = e.target.value;
    console.log(newUserData.password);
    setUserData(newUserData);
  };

  return (
    <div>
      <ConfirmationMessage height={"25rem"}>
        <h2 style={{ textAlign: "center" }}>{`Editar Usuario ${user.name}`}</h2>
        <div className="edituser-container-form">
          <form>
            <label htmlFor="">Id</label>
            <input
              type="number"
              name="id"
              id="id"
              value={userData.id}
              onChange={fillDataForm}
            />
            <label htmlFor="">Nombre</label>
            <input
              type="text"
              name="name"
              id="name"
              value={userData.name}
              onChange={fillDataForm}
            />
            <label htmlFor="">Rol</label>
            <select
              name="rol"
              type="text"
              value={userData.rol}
              onChange={fillDataForm}
            >
              <option value="" disabled>
                ...
              </option>
              <option value="vendedor">Vendedor</option>
              <option value="admin">Administrador</option>
            </select>
            <label htmlFor="">Ubicación</label>
            <select
              name="ubication"
              type="text"
              value={userData.ubication}
              onChange={fillDataForm}
            >
              <option value="" disabled>
                ...
              </option>
              <option value="villa colombia">Villa Colombia</option>
              <option value="unico">Unico</option>
            </select>
            <label htmlFor="">Password</label>
            <input
              type="text"
              name="password"
              id="password"
              value={userData.password}
              onChange={fillDataForm}
              placeholder="Opcional"
            />
            <div className="buttons-edituser-container">
              <button
                className="confirm-edit-user"
                onClick={(e) => editRequest(e)}
              >
                Editar
              </button>
              <button
                className="confirm-cancel-user"
                onClick={(e) => closeEditUserFormFunction(e)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </ConfirmationMessage>
    </div>
  );
}
