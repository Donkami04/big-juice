import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"
export const Navbar = () => {
  return (
    <div className="main-navbar-container">
        <div className="logo-container">
            <img src="/bigjuicelogo.png" alt="logo-big-juice" />
        </div>
        <div className="links-container">
            <p><Link to="/vender">VENDER</Link></p>
            <p><Link to="/produccion">PRODUCCIÓN</Link></p>
            <p><Link to="/compras">COMPRAS</Link></p>
            <p><Link to="/ventas">VENTAS</Link></p>
            <p><Link to="/proveedores">PROVEEDORES</Link></p>
            <p><Link to="/inventario">INVENTARIO</Link></p>
            <p><Link to="/usuarios">USUARIOS</Link></p>
        <div className="loggin-container">
          <p>Iniciar Sesión</p>
        </div>
        </div>
    </div>
  )
}
