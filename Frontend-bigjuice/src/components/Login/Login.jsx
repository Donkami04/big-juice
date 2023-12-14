import React, { useState } from "react";
import { BASE_API_URL } from "../../utils/api/bigjuice";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Login.css";

export const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BASE_API_URL}/login`, {
        id: id,
        password: password,
      });
      console.log("Respuesta del servidor:", response.data);

      if (response.status === 200) {
        const token = response.data.data.token;
        localStorage.setItem("jwtToken", token);
      }
      
      const userRol = response.data.data.response.rol;
      const ubication = response.data.data.response.ubication;
      if (userRol === "admin") {
        navigate("admin-ubication")
      };
      if (userRol !== "admin") {
        navigate("/vender");
        localStorage.setItem("ubication", ubication);
      };
      localStorage.setItem("rol", userRol);

    } catch (error) {
      if (error.response) {
        console.error(
          "Error en la respuesta del servidor:",
          error.response.data
        );
        setErrorMessage(
          "Error en la autenticación. Por favor, verifica tus credenciales."
        );
      } else if (error.request) {
        // La solicitud fue realizada pero no se recibió respuesta
        console.error("No se recibió respuesta del servidor:", error.request);
        setErrorMessage(
          "No se recibió respuesta del servidor. Por favor, inténtalo de nuevo."
        );
      } else {
        // Error durante la configuración de la solicitud
        console.error(
          "Error durante la configuración de la solicitud:",
          error.message
        );
        setErrorMessage(
          "Error durante la configuración de la solicitud. Por favor, inténtalo de nuevo."
        );
      }
    }
  };

  return (
    <div className="main-login-container">
      <div className="login-container">
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form>
          <label>
            Id:
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button type="button" onClick={handleLogin}>
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};
