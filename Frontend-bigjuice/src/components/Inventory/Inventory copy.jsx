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
  const userUbication = localStorage.getItem("ubication");
  const jwtToken = localStorage.getItem("jwtToken");
  const rol = localStorage.getItem("rol");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataInventory = await getInventory(jwtToken);
        const dataProducts = await getProducts();
        setInventory(dataInventory);
        setProducts(dataProducts);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((element) => (
                <tr key={element.id + element.name}>
                  <td>
                    {element.category === "jugos"
                      ? `Jugo de ${element.name}`
                      : element.name}
                  </td>
                  <td>{element.quantity}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
