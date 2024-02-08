import { useEffect, useState } from "react";
import { useColMoney } from "../../../hooks/useColMoney";
import React from "react";
import "./CuadreCaja.css";

export function CuadreCaja({ total, salesNequi, salesRappi }) {
  const [initialMoneyBox, setInitialMoneyBox] = useState("");
  const [showTotal, setShowTotal] = useState(false);
  const [totalMoney, setTotalMoney] = useState("");

  total = parseInt(total.replace("$", "").replace(".", ""));
  salesNequi = parseInt(salesNequi.replace("$", "").replace(".", ""));
  salesRappi = parseInt(salesRappi.replace("$", "").replace(".", ""));

  const calculateTotal = () => {
    const result = parseInt(initialMoneyBox) + total - salesNequi - salesRappi;
    setTotalMoney(result);
    setShowTotal(true);
  };

  return (
    <div className="cuadre-container">
      <h3>Cuadre Caja $:</h3>
      <label>Caja Inicial:</label>
      <input
        value={initialMoneyBox}
        onChange={(e) => setInitialMoneyBox(e.target.value)}
        type="number"
      />
      <button onClick={calculateTotal}>Calcular</button>
      {showTotal && (
        <p className="total-moneybox">
          Dinero que debe haber en la caja:{" "}
          <span>{useColMoney(totalMoney)}</span>
        </p>
      )}
    </div>
  );
}
