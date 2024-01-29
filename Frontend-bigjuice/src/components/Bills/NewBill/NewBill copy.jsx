import { useEffect, useState } from "react";
import { useColMoney } from "../../../hooks/useColMoney";
import { BASE_API_URL } from "../../../utils/api/bigjuice";
import { OptionsBill } from "./OptionsBill";
import { ConfirmationMessage } from "../../ConfirmationMessage/ConfirmationMessage";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
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
  const [selectedOptions, setSelectedOptions] = useState([{}]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleSendData();
    console.log(selectedData);
    try {
      const data = await axios.post(
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

      setName("");
      setAmount("");
      setDescription("");
      setAmountMoneyFormat("");
      setNewBillMessage(data.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectChange = (index, field, value) => {
    console.log(index)
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = {
      ...newSelectedOptions[index],
      [field]: value,
    };
    setSelectedOptions(newSelectedOptions);

    if (value && index === newSelectedOptions.length - 1) {
      setSelectedOptions([...newSelectedOptions, {}]);
    }
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
    { id: 1, category: "Productos", values: "otros" },
    { id: 2, category: "Ingredientes", values: "ingredient" },
    { id: 3, category: "Otros", values: "others" },
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
    setShowButtonConfirmate(true);
  };

  return (
    <div>
      <ConfirmationMessage height={"35rem"} width={"35rem"}>
        {/* <div className="close-button-container-newbill">
        <IoMdClose
          onClick={closeNewBillForm}
          style={{ position: "absolute", right: "5px", cursor: "pointer" }}
        />
      </div> */}
        <h2>Crear Compra</h2>
        <div className="form-newbill-container">
          <form>
            <label>Compra</label>
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
                </main>
              ))}
            </section>
            <label>Observación</label>
            <textarea
              className="date-selector-bills"
              placeholder="Opcional"
              value={description}
              type="text"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <div className="button-bills-find">
              <p className="newbill-message">{newBillMessage}</p>
              {showButtonCreate && <button onClick={changeMessageButton}>Crear</button>}
              {showButtonConfirmate && (
                <button onClick={handleSubmit}>Confirmar</button>
              )}
            </div>
          </form>
        </div>
      </ConfirmationMessage>
    </div>
  );
}
