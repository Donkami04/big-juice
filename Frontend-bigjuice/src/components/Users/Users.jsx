import { useEffect, useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import axios from "axios";
import { BASE_API_URL } from "../../utils/api/bigjuice";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ConfirmationMessage } from "../ConfirmationMessage/ConfirmationMessage";
import "./Users.css";

export function Users() {
  const [users, setUsers] = useState([]);
  const [showUsersData, setShowUsersData] = useState(false);
  const [showUsersMessage, setShowUsersMessage] = useState(false);
  const [usersMessage, setUsersMessage] = useState("");

  const jwtToken = localStorage.getItem("jwtToken");
  const rol = localStorage.getItem("rol");

  useEffect(() => {
    const fetchData = async () => {
      if (rol === "admin") {
        setShowUsersData(true);
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
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
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
                  <td>{<RiDeleteBin6Line />}</td>
                  <td>{<MdEdit />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
