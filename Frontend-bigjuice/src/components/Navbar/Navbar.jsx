import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  const jwtToken = localStorage.getItem("jwtToken");
  const isLoggedIn = !!jwtToken; // Convertir a un valor booleano

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("ubication");
    localStorage.removeItem("rol");
    navigate("/login"); // Redirigir a la página de login
  };

  return (
    <div className="main-navbar-container">
      <div className="logo-container">
        <img src="/logo.png" alt="logo-big-juice" />
      </div>
      <div className="links-container">
        <p><Link to="/vender">VENDER</Link></p>
        <p><Link to="/ventas">VENTAS</Link></p>
        <p><Link to="/produccion">PRODUCCIÓN</Link></p>
        <p><Link to="/compras">COMPRAS</Link></p>
        <p><Link to="/proveedores">PROVEEDORES</Link></p>
        <p><Link to="/inventario">INVENTARIO</Link></p>
        <p><Link to="/usuarios">USUARIOS</Link></p>
        <div className="logout-button-container">
          <p className="logout-button" onClick={isLoggedIn ? handleLogout : () => navigate("/login")}>
            {isLoggedIn ? "Cerrar Sesión" : "Iniciar Sesión"}
          </p>
        </div>
      </div>
    </div>
  );
};
