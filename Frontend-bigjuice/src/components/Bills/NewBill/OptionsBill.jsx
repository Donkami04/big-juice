import React, { useState } from "react";
import "./NewBill.css";

export const OptionsBill = ({ ingredientsAndProducts, setSelectedData }) => {
  const [selectedOptions, setSelectedOptions] = useState([{}]);
  const [unityMesure, setUnityMesure] = useState("");
  // const [selectedData, setSelectedData] = useState([]); // Nuevo estado para almacenar la información seleccionada

  const handleSelectChange = (index, field, value) => {
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
      (option) => option.name && option.category && option.quantity
    );

    const newData = filteredOptions.map((option) => ({
      name: option.name,
      category: option.category,
      quantity: option.quantity,
      unityMesure: unityMesure,
    }));

    setSelectedData(newData);
    // console.log(newData); // Puedes hacer lo que necesites con el array de datos, como enviarlo a un servidor o mostrarlo en la consola.
  };

  const categoriesArray = [
    { id: 1, category: "Productos" },
    { id: 2, category: "Ingredientes" },
    { id: 3, category: "Otros" },
  ];

  return (
    <section className="options-container">
      {selectedOptions.map((option, index) => (
        <main key={`${option.name}-${index}`} className="option-group">
          <select
            value={option.name || ""}
            onChange={(e) => handleSelectChange(index, "name", e.target.value)}
          >
            <option value="" disabled>
              Elemento
            </option>
            {ingredientsAndProducts.map((item) => (
              <option key={item.id+item.name} value={item.name}>
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
              <option key={item.id} value={item.category}>
                {item.category}
              </option>
            ))}
          </select>

          <select
            name="mesure"
            type="text"
            value={unityMesure}
            onChange={(e) => setUnityMesure(e.target.value)}
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
      <button onClick={handleSendData}>Enviar Datos</button>
    </section>
  );
};
