import { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate  } from "react-router-dom";
import { Helmet } from "react-helmet";

// Componentes
import { Vender } from "./components/Vender/Vender"

// Hooks
import { useTabsName } from "./hooks/useTabsName"

import './App.css'


function App() {
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
        <Route path="/vender" element={<Vender />} />
      </Routes>
    </>
  )
}

export default App
