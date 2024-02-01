import { useEffect, useState } from "react";
import { useColMoney } from "../../../hooks/useColMoney";
import { BASE_API_URL } from "../../../utils/api/bigjuice";
import { OptionsBill } from "./OptionsBill";
import { ConfirmationMessage } from "../../ConfirmationMessage/ConfirmationMessage";
import axios from "axios";
import { FaTrashCan } from "react-icons/fa6";
import { CiCirclePlus } from "react-icons/ci";
import { FaCirclePlus } from "react-icons/fa6";
import BarLoader   from "react-spinners/BarLoader";	
import "./NewBill.css";

export function NewBill({
  ubication,
  jwtToken,
  closeNewBillForm,
  products,
  ingredients,
  ingredientsAndProducts,
}) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [newBillMessage, setNewBillMessage] = useState("");
  const [amountMoneyFormat, setAmountMoneyFormat] = useState("");
  const [selectedData, setSelectedData] = useState([]);
  const [unityMesure, setUnityMesure] = useState("");
  const [showButtonCreate, setShowButtonCreate] = useState(true);
  const [showButtonConfirmate, setShowButtonConfirmate] = useState(false);
  const [showButtonAdd, setShowButtonAdd] = useState(true);
  const [showButtonNew, setShowButtonNew] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([{}]);
  const [showSpinner, setShowSpinner] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleSendData();
    console.log(selectedData);
    try {
      const request = await axios.post(
        `${BASE_API_URL}/bills/new`,
        {
          name: name,
          amount: amount,
          description: "" || description,
          ubication: ubication,
          dataBill: selectedData,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      closeNewBillForm();
      setName("");
      setAmount("");
      setDescription("");
      setAmountMoneyFormat("");
      setShowButtonConfirmate(false);
      setShowButtonCreate(true);
      setNewBillMessage("");
    } catch (error) {
      console.error(error.response.data.message);
      setNewBillMessage(error.response.data.message);
    }
  };

  const handleSelectChange = (index, field, value) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = {
      ...newSelectedOptions[index],
      [field]: value,
    };
    setSelectedOptions(newSelectedOptions);

    // if (value && index === newSelectedOptions.length - 1) {
    //   setSelectedOptions([...newSelectedOptions, {}]);
    // }
  };

  const handleSendData = () => {
    const filteredOptions = selectedOptions.filter(
      (option) =>
        option.name && option.category && option.quantity && option.unityMesure
    );

    const newData = filteredOptions.map((option) => ({
      name: option.name,
      category: option.category,
      quantity:
        option.unityMesure === "kg" ? option.quantity * 1000 : option.quantity,
      unityMesure: option.unityMesure,
    }));

    setSelectedData(newData);
  };

  const categoriesArray = [
    { id: 1, category: "Productos", value: "otros" },
    { id: 2, category: "Ingredientes", value: "ingredient" },
    { id: 3, category: "Otros", value: "others" },
  ];

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

  const changeMessageButton = () => {
    changeMoney();
    handleSendData();
    setShowButtonCreate(false);
    // setShowButtonConfirmate(true);
    setShowButtonAdd(false);
    setShowSpinner(true)
    setTimeout(() => {
      setShowSpinner(false);
      setShowButtonConfirmate(true);
    }, 3000);
  };

  const handleDeleteOption = (index) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions.splice(index, 1);
    setSelectedOptions(newSelectedOptions);
  };

  const handleAddOption = () => {
    setSelectedOptions([...selectedOptions, {}]);
  };

  return (
    <div>
      <ConfirmationMessage height={"38rem"} width={"35rem"}>
        {/* <div className="close-button-container-newbill">
        <IoMdClose
          onClick={closeNewBillForm}
          style={{ position: "absolute", right: "5px", cursor: "pointer" }}
        />
      </div> */}
      <p title="Cerrar" className="close-button-newbill" onClick={closeNewBillForm}>x</p>
        <h2>Crear Compra / Registrar Gasto</h2>
        <div className="form-newbill-container">
          <form>
            <label>Nombre</label>
            <input
              className="date-selector-bills"
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
            ></input>
            <label>Valor</label>
            <input
              className="date-selector-bills"
              value={amountMoneyFormat}
              type="text"
              onChange={handleInputChange}
            ></input>
            <label>Informacion de la compra</label>
            <section className="options-container">
              {selectedOptions.map((option, index) => (
                <main key={`${option.name}-${index}`} className="option-group">
                  <select
                    value={option.name || ""}
                    onChange={(e) =>
                      handleSelectChange(index, "name", e.target.value)
                    }
                  >
                    <option value="" disabled>
                      Elemento
                    </option>
                    {ingredientsAndProducts.map((item) => (
                      <option key={item.id + item.name} value={item.name}>
                        {item.name.toUpperCase()}
                      </option>
                    ))}
                  </select>

                  <select
                    value={option.category || ""}
                    onChange={(e) =>
                      handleSelectChange(index, "category", e.target.value)
                    }
                  >
                    <option value="" disabled>
                      Categoria
                    </option>
                    {categoriesArray.map((item) => (
                      <option key={item.id} value={item.value}>
                        {item.category.toUpperCase()}
                      </option>
                    ))}
                  </select>

                  <select
                    name="mesure"
                    type="text"
                    value={option.unityMesure || ""}
                    onChange={(e) =>
                      handleSelectChange(index, "unityMesure", e.target.value)
                    }
                  >
                    <option value="" disabled>
                      Selecciona
                    </option>
                    <option value="und">Unidades</option>
                    <option value="kg">Kilogramos</option>
                    <option value="gr">Gramos</option>
                  </select>

                  <input
                    type="number"
                    value={option.quantity || ""}
                    onChange={(e) =>
                      handleSelectChange(index, "quantity", e.target.value)
                    }
                    placeholder="Cantidad"
                  />
                  <p onClick={() => handleDeleteOption(index)}>
                    <FaTrashCan
                      title="Eliminar elemento de la compra"
                      style={{ color: "red", cursor: "pointer" }}
                    />
                  </p>
                </main>
              ))}
              {showButtonAdd && (
                <p onClick={handleAddOption}>
                  <FaCirclePlus
                    title="Agregar más elementos a la compra"
                    className="more-elements-button-newbill"
                  />
                </p>
              )}
            </section>
            <label>Observación</label>
            <textarea
              className="date-selector-bills"
              placeholder="Opcional"
              value={description}
              type="text"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <div className="button-send-newbill-container">
              {showButtonCreate && (
                <button
                  className="send-newbill-button"
                  onClick={changeMessageButton}
                >
                  Registrar compra
                </button>
              )}
              {showSpinner && (<BarLoader   color="red" />)}
              {showButtonConfirmate && (
                <button
                  className="confirmate-newbill-button"
                  onClick={handleSubmit}
                >
                  ⚠️ Confirmar ⚠️
                </button>
              )}
            </div>
            <p className="newbill-message">{newBillMessage}</p>
          </form>
        </div>
      </ConfirmationMessage>
    </div>
  );
}
