import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

// Componentes
import { Vender } from "./components/Vender/Vender";
import { Login } from "./components/Login/Login";
import { UbicationSelector } from "./components/UbicationSelector/UbicationSelector";

// Hooks
import { useTabsName } from "./hooks/useTabsName";

import "./App.css";

const PrivateRoute = ({ element }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken || jwtToken.length < 150) {
      // Redirigir a la página de login si no hay jwtToken
      navigate("/login");
    }
  }, [navigate]);

  return element;
};

function App() {
  const location = useLocation();
  const pageTitle = useTabsName(location.pathname);

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return (
    <>
      <Helmet>
        <title>{useTabsName(location.pathname)}</title>
      </Helmet>
      <Routes location={location}>
        <Route path="/login" element={<Login />} />
        <Route
          path="/login/admin-ubication"
          element={<PrivateRoute element={<UbicationSelector />} />}
        />
        <Route path="/vender" element={<PrivateRoute element={<Vender />} />} />
      </Routes>
    </>
  );
}

export default App;
