import React, { useState, useEffect } from "react";
import { BASE_API_URL } from "../../utils/api/bigjuice";
import { useColMoney } from "../../hooks/useColMoney";
import axios from "axios";
import "./ShopCar.css";

export const ShopCar = ({ dataShopcar }) => {
  const [pagaConMoneyFormat, setPagaConMoneyFormat] = useState("");
  const [change, setChange] = useState(0);
  const [changeMoneyFormat, setChangeMoneyFormat] = useState("$");
  const [nequiChecked, setNequiChecked] = useState(false);
  const [rappiChecked, setRappiChecked] = useState(false);
  const token = localStorage.getItem('jwtToken');
  const ubication = localStorage.getItem('ubication');


  // Cambia el formato ingresado en el input "Paga Con" a formato de dinero
  const handleInputChange = (e) => {
    let inputValue = e.target.value;
    let inputValueMoneyFormat = inputValue.replace(/[^0-9]/g, "");
    if (inputValueMoneyFormat.length > 0) {
      inputValueMoneyFormat = useColMoney(Number(inputValueMoneyFormat));
    }
    setPagaConMoneyFormat(inputValueMoneyFormat);
  };

  // Aumenta la cantidad de un producto dependiendo del numero de
  // veces que se encuentre en el Shop Car
  const uniqueObjects = {};
  dataShopcar.forEach((obj) => {
    const key = JSON.stringify(obj);
    if (uniqueObjects[key]) {
      uniqueObjects[key].quantity++;
    } else {
      uniqueObjects[key] = { ...obj, quantity: 1 };
    }
  });

  // Calcula el valor de la venta solo por un producto dependiendo del numero de
  // veces que se encuentre en el Shop Car
  const shopcar = Object.values(uniqueObjects);
  shopcar.forEach((obj) => {
    obj.amount = obj.quantity * obj.sale_price;
  });

  const products = [];
  shopcar.forEach((product) => {
    const item = {
      name: product.name,
      amount: product.amount,
      category: product.category,
      quantity: product.quantity
    };
    products.push(item);
  })

  // Calculo del total del Shop Car
  let total = 0;
  shopcar.forEach((product) => {
    total += product.amount;
  });

  // Cambia el formato del dinero "Paga con" ($ 9.999) a un integer
  const changeMoney = () => {
    const integerPagaCon = parseInt(
      pagaConMoneyFormat.replace(/[^\d]/g, ""),
      10
    );
    setChangeMoneyFormat(useColMoney(integerPagaCon - total));
    pagaConMoneyFormat === ""
      ? setChangeMoneyFormat("Dinero insuficiente")
      : setChange(useColMoney(integerPagaCon - total));
    integerPagaCon < total
      ? setChangeMoneyFormat("Dinero insuficiente")
      : setChange(useColMoney(integerPagaCon - total));
  };

  // Se utiliza para enviar la peticion POST
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_API_URL}/sales/new`,
        {
          amount: total,
          nequi: nequiChecked,
          rappi: rappiChecked,
          products: products,
          ubication: ubication,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Vaciar datos del front

      console.log(response.data.message);
    } catch (error) {}
  };

  return (
    <form className="main-shopcar-container" onSubmit={handleSubmit}>
      <div className="sale-title">
        <h1>VENTA</h1>
      </div>
      <div className="products-in-shopcar-container">
        <table className="products-in-shopcar">
          <thead>
            <tr>
              <th>PRODUCTO</th>
              <th>Und</th>
              <th>VALOR</th>
            </tr>
          </thead>
          <tbody>
            {shopcar.map((product, index) => (
              <tr key={index}>
                <td>{product.name.toUpperCase()}</td>
                <td>{product.quantity}</td>
                <td>{useColMoney(product.sale_price * product.quantity)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="total-sale">
        <h1>TOTAL: {useColMoney(total)}</h1>
      </div>
      <div className="checkbox-container">
        <label htmlFor="nequiCheckbox">
          Nequi
          <input
            type="checkbox"
            id="nequi"
            value="nequi"
            onChange={() => setNequiChecked(!nequiChecked)}
          />
        </label>
        <label htmlFor="nequiCheckbox">
          Rappi
          <input
            type="checkbox"
            id="rappi"
            value="rappi"
            onChange={() => setRappiChecked(!rappiChecked)}
          />
        </label>
      </div>
      <div className="input-cash-container">
        <p>PAGA CON:</p>
        <input
          type="text"
          placeholder="$"
          value={pagaConMoneyFormat}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="buttons-container">
        <button
          type="submit"
          className="shopcar-button pay-button"
          onClick={() => changeMoney()}
          // onSubmit={handleSubmit}
        >
          PAGAR
        </button>
        <button className="shopcar-button cancel-button">CANCELAR</button>
      </div>
      <div className="change-container">
        <h1>DEVUELTA</h1>
        <h2>{changeMoneyFormat}</h2>
      </div>
    </form>
  );
};
