import React, { useState } from 'react';
import "./ShopCar.css";

export const ShopCar = () => {
  const [pagaCon, setPagaCon] = useState('');

  const handleInputChange = (e) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/[^0-9]/g, '');

    if (inputValue.length > 0) {
      inputValue = Number(inputValue).toLocaleString('es-CL', {
        style: 'currency',
        currency: 'CLP',
      });
    }

    setPagaCon(inputValue);
  };

  return (
    <div className="main-shopcar-container">
      <div className="sale-title">
        <h1>VENTA</h1>
      </div>
      <div>
        <table className="products-in-shopcar">
          <thead>
            <th>PRODUCTO</th>
            <th>Und</th>
            <th>VALOR</th>
          </thead>
          <tbody>
            <tr>
              <td>MORA</td>
              <td>2</td>
              <td>$12.000</td>
            </tr>
            <tr>
              <td>LULO</td>
              <td>1</td>
              <td>$6.000</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="total-sale">
        <h1>TOTAL: $30.000</h1>
      </div>
      <div className="input-cash-container">
        <p>PAGA CON:</p>
        <input
          type="text"
          placeholder="$"
          value={pagaCon}
          onChange={handleInputChange}
        />

      </div>
      <div className="buttons-container">
      <button className="shopcar-button pay-button">PAGAR</button>
      <button className="shopcar-button cancel-button">CANCELAR</button>
      </div>
      <div className="change-container">
        <h2>DEVUELTA</h2>
        <h1>$20.000</h1>
      </div>

    </div>
  );
}
