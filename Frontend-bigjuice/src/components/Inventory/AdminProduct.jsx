import { ConfirmationMessage } from "../ConfirmationMessage/ConfirmationMessage";
import axios from "axios";
import {
  BASE_API_URL,
  getInventory,
  getProducts,
} from "../../utils/api/bigjuice";
import { useEffect, useState } from "react";

export function AdminProduct({ element, getData, setShowEditDeleteButton }) {
  const [height, setHeight] = useState("");
  const [optionButton, setOptionButton] = useState(false);
  const [showAdminButtons, setShowAdminButtons] = useState(true);
  const jwtToken = localStorage.getItem("jwtToken");
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const [showJugosForm, setShowJugosForm] = useState(false);
  const [showOtrosForm, setShowOtrosForm] = useState(false);
  const [showIngredientForm, setShowIngredientForm] = useState(false);
  const [unityMesure, setUnityMesure] = useState("");
  const [productForm, setProductForm] = useState({
    name: "",
    quantity: "",
    sale_price: "",
    category: "",
    ubication: "",
    hielo: "",
    leche: "",
    leche_polvo: "",
    azucar: "",
    pulpa: "",
    saborizante: "",
    canela: "",
    miel: "",
    tarrina: 0,
    pitillo: 0,
  });
  const [ingredientForm, setIngredientForm] = useState({
    name: "",
    quantity: "",
    category: "",
    ubication: "",
  });

  useEffect(() => {
    if (element.category === "jugos" || element.category === "otros") {
      setProductForm(element);
    } else {
      setIngredientForm(element);
    }
  }, []);

  const editElement = () => {
    if (element.category === "jugos") {
      setShowJugosForm(true);
      setShowOtrosForm(false);
      setShowIngredientForm(false);
    }
    if (element.category === "otros") {
      setShowOtrosForm(true);
      setShowJugosForm(false);
      setShowIngredientForm(false);
    }
    if (element.category === "ingredient" || element.category === "others") {
      setShowIngredientForm(true);
      setShowJugosForm(false);
      setShowOtrosForm(false);
    }
    setOptionButton(true);
    if (element.category === "jugos") {
      setHeight("25rem");
    }
    setShowAdminButtons(false);
  };

  const deleteElement = () => {
    setDeleteConfirmation(true);
    setShowAdminButtons(false);
  };

  const fillFormNewProduct = (e) => {
    try {
      const newProductForm = { ...productForm };
      let value = parseFloat(e.target.value);
      if (!isNaN(value)) {
        value = parseFloat(value.toFixed(2));
        console.log(parseFloat(value));
        newProductForm[e.target.name] = value;
        setProductForm(newProductForm);
        return;
      }
      newProductForm[e.target.name] = e.target.value;

      setProductForm(newProductForm);
    } catch (error) {
      console.error(error);
    }
  };

  const fillFormNewIngredient = (e) => {
    console.log(e.target.value);
    const newIngredientForm = { ...ingredientForm };
    // Convertir a número si es un campo numérico
    let value = parseFloat(e.target.value);
    // Redondear a dos decimales si es un número
    if (!isNaN(value)) {
      value = parseFloat(value.toFixed(2));
      console.log(parseFloat(value));
      newIngredientForm[e.target.name] = value;

      setIngredientForm(newIngredientForm);
      return;
    }
    newIngredientForm[e.target.name] = e.target.value;

    setIngredientForm(newIngredientForm);
  };

  const selectRequest = (event) => {
    event.preventDefault();
    if (element.category === "jugos" || element.category === "otros") {
      editProductRequest(event);
    }
    if (element.category === "ingredient" || element.category === "others") {
      editIngredientRequest(event);
    }
  };

  const editProductRequest = async (event) => {
    event.preventDefault();
    const finalData = { ...productForm };
    for (var key in finalData) {
      if (finalData.hasOwnProperty(key)) {
        if (finalData[key] === "") {
          finalData[key] = 0;
        }
      }
    }

    try {
      const request = await axios.put(
        `${BASE_API_URL}/products/edit/${element.id}`,
        {
          ...finalData,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      console.log(request);
      getData();
      setShowEditDeleteButton(false);
    } catch (error) {
      console.error(error);
    }
  };

  const editIngredientRequest = async (event) => {
    event.preventDefault();
    const dataForm = { ...ingredientForm };

    try {
      const request = await axios.put(
        `${BASE_API_URL}/ingredients/edit/${element.id}`,
        {
          ...dataForm,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      console.log(request);
      getData();
      setShowEditDeleteButton(false);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRequest = async () => {
    if (element.category === "jugos" || element.category === "otros") {
      const request = await axios.delete(
        `${BASE_API_URL}/products/remove/${element.id}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      console.log(request);
      getData();
      setShowEditDeleteButton(false);
    }
    if (element.category === "ingredient" || element.category === "others") {
      const request = await axios.delete(
        `${BASE_API_URL}/ingredients/remove/${element.id}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      console.log(request);
      getData();
      setShowEditDeleteButton(false);
    }
  };

  const cancelDeleteForm = () => {
    setShowEditDeleteButton(false);
    setDeleteConfirmation(false);
    setOptionButton(false);
  }

  return (
    <div>
      <ConfirmationMessage height={height}>
        {showAdminButtons && (
          <div className="edit-delete-product-buttons">
            <button onClick={deleteElement}>Eliminar</button>
            {/* <button onClick={() => deleteElement()}>Eliminar</button> */}
            <button onClick={() => editElement()}>Editar</button>
          </div>
        )}
        {deleteConfirmation && (
          <>
            <h2 style={{ textAlign: "center" }}>¿Desea realmente eliminar</h2>
            <h2 style={{ textAlign: "center" }}>
              {element.name.toUpperCase()} ?
            </h2>
            <div className="edit-delete-product-buttons">
              <button onClick={deleteRequest}>Confirmar</button>
              <button onClick={cancelDeleteForm}>Cancelar</button>
            </div>
          </>
        )}
        {optionButton && (
          <form>
            <h2>Editar Producto / Elemento</h2>
            {showJugosForm && (
              <div className="new-jugo-form">
                <div>
                  <label>Nombre</label>
                  <input
                    type="text"
                    name="name"
                    value={productForm.name.toUpperCase()}
                    onChange={fillFormNewProduct}
                  />
                  <label>Precio ($)</label>
                  <input
                    type="number"
                    name="sale_price"
                    value={productForm.sale_price}
                    onChange={fillFormNewProduct}
                  />
                  <label>Hielo (gr)</label>
                  <input
                    type="number"
                    name="hielo"
                    value={productForm.hielo}
                    onChange={fillFormNewProduct}
                  />
                  <label>Leche (gr)</label>
                  <input
                    type="number"
                    name="leche"
                    value={productForm.leche}
                    onChange={fillFormNewProduct}
                  />
                  <label>Leche en Polvo (gr)</label>
                  <input
                    type="number"
                    name="leche_polvo"
                    value={productForm.leche_polvo}
                    onChange={fillFormNewProduct}
                  />
                  <label>Azucar (gr)</label>
                  <input
                    type="number"
                    name="azucar"
                    value={productForm.azucar}
                    onChange={fillFormNewProduct}
                  />
                </div>
                <div>
                  <label>Pulpa (gr)</label>
                  <input
                    type="number"
                    name="pulpa"
                    value={productForm.pulpa}
                    onChange={fillFormNewProduct}
                  />
                  <label>Saborizante (gr)</label>
                  <input
                    type="number"
                    name="saborizante"
                    value={productForm.saborizante}
                    onChange={fillFormNewProduct}
                  />
                  <label>Canela (gr)</label>
                  <input
                    type="number"
                    name="canela"
                    value={productForm.canela}
                    onChange={fillFormNewProduct}
                  />
                  <label>Miel (gr)</label>
                  <input
                    type="number"
                    name="miel"
                    value={productForm.miel}
                    onChange={fillFormNewProduct}
                  />
                  <label>Cantidad (Und)</label>
                  <input
                    type="number"
                    name="quantity"
                    value={productForm.quantity}
                    onChange={fillFormNewProduct}
                  />
                  <label>Ubicación</label> <br />
                  <select
                    name="ubication"
                    type="text"
                    value={productForm.ubication}
                    onChange={fillFormNewProduct}
                  >
                    <option value="" disabled></option>
                    <option value="villa colombia">Villa Colombia</option>
                    <option value="unico">Unico</option>
                  </select>
                </div>
              </div>
            )}
            {showOtrosForm && (
              <div className="new-product-form">
                <label>Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={productForm.name.toUpperCase()}
                  onChange={fillFormNewProduct}
                />
                <label>Precio ($)</label>
                <input
                  type="number"
                  name="sale_price"
                  value={productForm.sale_price}
                  onChange={fillFormNewProduct}
                />
                <label>Cantidad (Und)</label>
                <input
                  type="number"
                  name="quantity"
                  value={productForm.quantity}
                  onChange={fillFormNewProduct}
                />
                <label>Ubicación</label>
                <select
                  name="ubication"
                  type="text"
                  value={productForm.ubication}
                  onChange={fillFormNewProduct}
                >
                  <option value="" disabled></option>
                  <option value="villa colombia">Villa Colombia</option>
                  <option value="unico">Unico</option>
                </select>
              </div>
            )}
            {showIngredientForm && (
              <div className="new-product-form">
                <label>Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={ingredientForm.name.toUpperCase()}
                  onChange={fillFormNewIngredient}
                />
                <label>
                  Cantidad{" "}
                  {ingredientForm.category === "ingredient" ? "(gr)" : "(Und)"}
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={ingredientForm.quantity}
                  onChange={fillFormNewIngredient}
                />
                <label>Ubicación</label>
                <select
                  name="ubication"
                  type="text"
                  value={ingredientForm.ubication}
                  onChange={fillFormNewIngredient}
                >
                  <option value="" disabled></option>
                  <option value="villa colombia">Villa Colombia</option>
                  <option value="unico">Unico</option>
                </select>
              </div>
            )}
            <button onClick={(e) => selectRequest(e)}>Editar</button>
          </form>
        )}
      </ConfirmationMessage>
    </div>
  );
}
