import { useEffect, useState } from "react";
import { BASE_API_URL } from "../../utils/api/bigjuice";
import { Navbar } from "../Navbar/Navbar";
import { PopUp } from "../PopUp/PopUp";
import axios from "axios";
import "./Production.css";

export function Production() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const userUbication = localStorage.getItem("ubication");
  const jwtToken = localStorage.getItem("jwtToken");
  const [productionMessage, setProductionMessage] = useState("");
  const [showProductionMessage, setShowProductionMessage] = useState("false");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const openConfirmationMessage = () => {
    setShowMessage(true);
  };

  const handleSubmit = async () => {
    setShowMessage(false);

    if (!name || quantity <= 0 || !quantity) {
      setShowProductionMessage("true");
      setProductionMessage("Selecciona un producto y especifica la cantidad");
      return;
    }

    const dataProduct = {
      name: name,
      quantity: quantity,
      ubication: userUbication,
    };

    setName("");
    setQuantity("");
    setShowProductionMessage("false");
    try {
      const productionRequest = await axios.post(
        `${BASE_API_URL}/products/produce`,
        {
          listProducts: [dataProduct],
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      setShowProductionMessage(" green-message");
      setProductionMessage(productionRequest.data.message);

      // Borramos el mensaje exitoso despues de 5 segundos
      setTimeout(() => {
        setShowProductionMessage("false");
        setProductionMessage("");
      }, 5000);
    } catch (error) {
      console.error(error);
      setShowProductionMessage("");
      setProductionMessage(error.response.data.message);
    }
  };

  const closeMessage = () => {
    setShowMessage(false);
  };

  

  return (
    <>
      {showMessage && (
        <div className="confirmation-message-container">
          <div>
            <span onClick={closeMessage}>X</span>
            <p>{`¿Desea realmente agregar ${quantity} unidades de ${name.toUpperCase()} al inventario?`}</p>
            <button onClick={handleSubmit}>Confirmar</button>
          </div>
        </div>
      )}

      <Navbar />
      <main className="production-container">
        <form>
          <div>
            <label className="label-production">Producto</label>
            <select
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            >
              <option value="" disabled>
                Selecciona...
              </option>
              <option value="mora">Mora</option>
              <option value="lulo">Lulo</option>
              <option value="maracuya">Maracuyá</option>
              <option value="mango">Mango</option>
            </select>
          </div>

          <div>
            <label className="label-production">Cantidad Producida</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <p className={`production-message display-${showProductionMessage}`}>
            {productionMessage}
          </p>
          <div className="button-production-container">
            <button type="button" onClick={openConfirmationMessage}>
              Enviar
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
