import { Navbar } from "../Navbar/Navbar";
import { useEffect, useState } from "react";
import {
  BASE_API_URL,
  getInventory,
  getProducts,
} from "../../utils/api/bigjuice";
import axios from "axios";
import "./Inventory.css";

export function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [products, setProducts] = useState([]);
  const [productsUbication, setProductsUbication] = useState([]);
  const [inventoryUbication, setInventoryUbication] = useState([]);
  const [ubication, setUbication] = useState("");
  const userUbication = localStorage.getItem("ubication");
  const jwtToken = localStorage.getItem("jwtToken");
  const rol = localStorage.getItem("rol");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setUbication(userUbication);
        const dataInventory = await getInventory(jwtToken);
        const dataProducts = await getProducts();
        setInventory(dataInventory);
        setProducts(dataProducts);

        const dataInventoryFiltered = dataInventory.filter(
          (e) => e.ubication === userUbication
        );
        const dataProductsFiltered = dataProducts.filter(
          (e) => e.ubication === userUbication
        );
        setInventoryUbication(dataInventoryFiltered);
        setProductsUbication(dataProductsFiltered);

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const changeInventoryUbication = (event) => {
    event.preventDefault();
    const selectedUbication = event.target.value;
    setUbication(selectedUbication);

    const filteredProducts = products.filter((e) => e.ubication === selectedUbication);
    const filteredInventory = inventory.filter((e) => e.ubication === selectedUbication);
    setProductsUbication(filteredProducts);
    setInventoryUbication(filteredInventory);
  };
  
  return (
    <div>
      <Navbar />
      <div className="select-ubication-inventory-container">
        <form>
          <select className="select-ubication-inventory" value={ubication} onChange={changeInventoryUbication}>
            <option value="" disabled>
              Selecciona
            </option>
            <option value="villa colombia">Villa Colombia</option>
            <option value="unico">Unico</option>
          </select>
        </form>
      </div>
      <div className="tables-inventory-container">
        <div>
          <table className="inventory-table">
            <thead>
              <tr>
                <th>PRODUCTO</th>
                <th>CANTIDAD (Und)</th>
              </tr>
            </thead>
            <tbody>
              {productsUbication &&
                productsUbication.map((element) => (
                  <tr key={element.id + element.name}>
                    <td>
                      {element.category === "jugos"
                        ? `JUGO DE ${element.name.toUpperCase()}`
                        : element.name.toUpperCase()}
                    </td>
                    <td
                      className={
                        element.quantity >= 7 && element.quantity <= 10
                          ? "yellow-color"
                          : element.quantity < 7
                          ? "red-color"
                          : "green-color"
                      }
                    >
                      {element.quantity}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div>
          <table className="inventory-table">
            <thead>
              <tr>
                <th>COMPONENTE</th>
                <th>CANTIDAD (gr)</th>
                <th>CANTIDAD (kg)</th>
              </tr>
            </thead>
            <tbody>
              {inventoryUbication &&
                inventoryUbication.map((element) => (
                  <tr key={element.id + element.name}>
                    <td>{element.name.toUpperCase()}</td>
                    <td>{Math.floor(element.quantity)}</td>
                    <td>{(element.quantity / 1000).toFixed(1)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
