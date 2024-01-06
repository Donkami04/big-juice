import { useEffect, useState } from "react";
import { useColMoney } from "../../../hooks/useColMoney";
import { BASE_API_URL } from "../../../utils/api/bigjuice";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import "./NewBill.css";

export function NewBill({ ubication, jwtToken, closeNewBillForm }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [newBillMessage, setNewBillMessage] = useState("");
  const [amountMoneyFormat, setAmountMoneyFormat] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await axios.post(
        `${BASE_API_URL}/bills/new`,
        {
          name: name,
          amount: amount,
          description: "" || description,
          ubication: ubication,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      console.log(data.data.message);
      setName("");
      setAmount("");
      setDescription("");
      setAmountMoneyFormat("")
      setNewBillMessage(data.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    let inputValue = e.target.value;
    let inputValueMoneyFormat = inputValue.replace(/[^0-9]/g, "");
    if (inputValueMoneyFormat.length > 0) {
      inputValueMoneyFormat = useColMoney(Number(inputValueMoneyFormat));
    }
    setAmountMoneyFormat(inputValueMoneyFormat);
  };

  const changeMoney = () => {
    let intPagaCon = 0;
    if (amountMoneyFormat.length <= 5) {
      intPagaCon = parseInt(amountMoneyFormat.replace(/\D/g, ""));
    }

    if (amountMoneyFormat.length > 5) {
      intPagaCon = parseInt(amountMoneyFormat.replace(/[^\d]/g, ""), 10);
    }
    setAmount(intPagaCon);
  };


  return (
    <div className="newbill-main-container">
      <div className="close-button-container-newbill">
        <IoMdClose onClick={closeNewBillForm}
          style={{ position: "absolute", right: "5px", cursor: "pointer" }}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <h2>Crear Compra</h2>
        <div>
          <label>Compra</label>
          <input
            className="date-selector-bills"
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Valor</label>
          <input
            className="date-selector-bills"
            value={amountMoneyFormat}
            type="text"
            onChange={handleInputChange}
          ></input>
        </div>
        <div>
          <label>Observación</label>
          <textarea
            className="date-selector-bills"
            placeholder="Opcional"
            value={description}
            type="text"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="button-bills-find">
          <p className="newbill-message">{newBillMessage}</p>
          <button type="submit" onClick={changeMoney}>
            Crear
          </button>
        </div>
      </form>
    </div>
  );
}
