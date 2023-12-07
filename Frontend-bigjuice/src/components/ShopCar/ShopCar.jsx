import React, { useState } from "react";
import { useColMoney } from "../../hooks/useColMoney";
import "./ShopCar.css";

export const ShopCar = ({ dataShopcar }) => {
  const [pagaConMoneyFormat, setPagaConMoneyFormat] = useState("");
  const [change, setChange] = useState(0);
  const [changeMoneyFormat, setChangeMoneyFormat] = useState("$");

  const handleInputChange = (e) => {
    let inputValue = e.target.value;
    let inputValueMoneyFormat = inputValue.replace(/[^0-9]/g, "");
    if (inputValueMoneyFormat.length > 0) {
      inputValueMoneyFormat = useColMoney(Number(inputValueMoneyFormat));
    }
    setPagaConMoneyFormat(inputValueMoneyFormat);

  };

  const uniqueObjects = {};

  dataShopcar.forEach(obj => {
    const key = JSON.stringify(obj);
    if (uniqueObjects[key]) {
      uniqueObjects[key].quantity++;
    } else {
      uniqueObjects[key] = { ...obj, quantity: 1 };
    }
  });

  const shopcar = Object.values(uniqueObjects);
  shopcar.forEach(obj => {
    obj.amount = obj.quantity * obj.sale_price;
  });
  
  let total = 0;
  shopcar.forEach((product) => {
    total += product.amount;
  });


  const changeMoney = () => {
    const integerPagaCon = parseInt(pagaConMoneyFormat.replace(/[^\d]/g, ''), 10);
    setChangeMoneyFormat(useColMoney(integerPagaCon - total));
    integerPagaCon < total ? setChangeMoneyFormat("Dinero insuficiente") : setChange(useColMoney(integerPagaCon - total))
    
  }
  return (
    <div className="main-shopcar-container">
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
                <td>{useColMoney((product.sale_price*product.quantity))}</td>
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
          <input type="checkbox" id="nequi" value="nequi" />
        </label>
        <label htmlFor="nequiCheckbox">
          Rappi
          <input type="checkbox" id="rappi" value="rappi" />
        </label>
      </div>
      <div className="input-cash-container">
        <p>PAGA CON:</p>
        <input
          type="text"
          placeholder="$"
          value={pagaConMoneyFormat}
          onChange={handleInputChange}
        />
      </div>
      <div className="buttons-container">
        <button className="shopcar-button pay-button" onClick={() => changeMoney()}>PAGAR</button>
        <button className="shopcar-button cancel-button">CANCELAR</button>
      </div>
      <div className="change-container">
        <h1>DEVUELTA</h1>
        <h2>{changeMoneyFormat}</h2>
      </div>
    </div>
  );
};
