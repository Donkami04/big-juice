import { useEffect, useState } from "react";
import { ConfirmationMessage } from "../ConfirmationMessage/ConfirmationMessage";
import {
  BASE_API_URL,
  getInventory,
  getProducts,
} from "../../utils/api/bigjuice";
import axios from "axios";
import "./Inventory.css";

export function NewProduct({setShowNewProduct, getData}) {

  const [category, setCategory] = useState("");
  const [showJugosForm, setShowJugosForm] = useState(false);
  const [showOtrosForm, setShowOtrosForm] = useState(false);
  const [showIngredientForm, setShowIngredientForm] = useState(false);
  const [heightForm, setHeightForm] = useState("");
  const jwtToken = localStorage.getItem("jwtToken");
  const [showUnityMesuer, setShowUnityMesuer] = useState(false)
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
  // const userUbication = localStorage.getItem("ubication");
  // const rol = localStorage.getItem("rol");

  const selectCategory = (categorySelected) => {
    setCategory(categorySelected);
    const initialForm = { ...productForm };
    initialForm["category"] = categorySelected;
    setProductForm(initialForm);

    if (categorySelected === "jugos") {
      const initialForm = { ...productForm };
      initialForm["tarrina"] = 1;
      initialForm["pitillo"] = 1;
      setProductForm(initialForm);
      setShowJugosForm(true);
      setShowOtrosForm(false);
      setShowIngredientForm(false)
      setHeightForm("30rem");
    }
    if (categorySelected === "otros") {
      const initialForm = { ...productForm };
      initialForm["tarrina"] = 0;
      initialForm["pitillo"] = 0;
      setShowOtrosForm(true);
      setShowJugosForm(false);
      setShowIngredientForm(false);
      setHeightForm("");
    }
    if (categorySelected === "ingredient" || categorySelected === "others") {
      setShowIngredientForm(true);
      setShowOtrosForm(false);
      setShowJugosForm(false);
      setHeightForm("");
    }
  };

  const selectRequest = (event) => {
    event.preventDefault();
    if (category === "jugos" || category === "otros") {
      newProductRequest(event)
    }
    if (category === "ingredient" || category === "others") {
      newIngredientRequest(event)
    }
  }

  const newProductRequest = async (event) => {
    event.preventDefault();
    const finalData = { ...productForm };
    for (var key in finalData) {
      if (finalData.hasOwnProperty(key)) {
        if (finalData[key] === "") {
          finalData[key] = 0;
        }
      }
    }
    console.log(finalData)
    try {
      const request = await axios.post(
        `${BASE_API_URL}/products/new`,
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
      getData()
      setShowNewProduct(false)
    } catch (error) {
      console.error(error);
    }
  };

  const newIngredientRequest = async (event) => {
    event.preventDefault();
    const dataForm = { ...ingredientForm };

    if (unityMesure === "kg") {
      dataForm.quantity = ( dataForm.quantity * 1000)
    }

    try {
      const request = await axios.post(
        `${BASE_API_URL}/ingredients/new`,
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
      getData()
      setShowNewProduct(false)
    } catch (error) {
      console.error(error);
    }
  };

  const fillFormNewProduct = (e) => {
    const newProductForm = { ...productForm };
    // Convertir a número si es un campo numérico
    let value = parseFloat(e.target.value);
    // Redondear a dos decimales si es un número
    if (!isNaN(value)) {
      value = parseFloat(value.toFixed(2));
      console.log(parseFloat(value))
      newProductForm[e.target.name] = value;
      newProductForm["category"] = category;
      setProductForm(newProductForm);
      return
    }
    newProductForm[e.target.name] = e.target.value;
    newProductForm["category"] = category;
    setProductForm(newProductForm);
  };
  
  const fillFormNewIngredient = (e) => {
    const newIngredientForm = { ...ingredientForm };
    // Convertir a número si es un campo numérico
    let value = parseFloat(e.target.value);
    // Redondear a dos decimales si es un número
    if (!isNaN(value)) {
      value = parseFloat(value.toFixed(2));
      console.log(parseFloat(value))
      newIngredientForm[e.target.name] = value;
      newIngredientForm["category"] = category;
      setIngredientForm(newIngredientForm);
      return
    }
    newIngredientForm[e.target.name] = e.target.value;
    newIngredientForm["category"] = category;
    setIngredientForm(newIngredientForm);
  };

  return (
    <div>
      <ConfirmationMessage height={heightForm}>
        <h2>Registrar Producto / Elemento</h2>
        <p>Categoria:</p>
        <form>
          <select
            type="text"
            value={category}
            onChange={(e) => selectCategory(e.target.value)}
          >
            <option value="" disabled></option>
            <option value="jugos">Producto - Jugos</option>
            <option value="otros">Producto - Otros</option>
            <option value="ingredient">Elemento - Ingrediente</option>
            <option value="others">Elemento - Otros</option>
          </select>
          {showJugosForm && (
            <div className="new-jugo-form">
              <div>
                <label>Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={productForm.name}
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
                <label>Stock Inicial (Und)</label>
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
                value={productForm.name}
                onChange={fillFormNewProduct}
              />
              <label>Precio ($)</label>
              <input
                type="number"
                name="sale_price"
                value={productForm.sale_price}
                onChange={fillFormNewProduct}
              />
              <label>Stock Inicial (Und)</label>
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
                value={ingredientForm.name}
                onChange={fillFormNewIngredient}
              />
              <label>Unidad de medida</label>
              <select
                name="mesure"
                type="text"
                value={unityMesure}
                onChange={(e) => setUnityMesure(e.target.value)}
              >
                <option value="" disabled></option>
                <option value="und">Unidades</option>
                <option value="kg">Kilogramos</option>
                <option value="gr">Gramos</option>
              </select>
              <label>Cantidad</label>
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
          <button onClick={(e) => selectRequest(e)}>Crear</button>
        </form>
      </ConfirmationMessage>
    </div>
  );
}
