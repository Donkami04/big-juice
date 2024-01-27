import { useEffect, useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import { useColMoney } from "../../hooks/useColMoney";
import axios from "axios";
import { BASE_API_URL, getProducts, getInventory } from "../../utils/api/bigjuice";
import { NewBill } from "./NewBill/NewBill";
import "./Bills.css";

export function Bills() {
  const [sdate, setSdate] = useState("");
  const [bills, setBills] = useState([]);
  const [edate, setEdate] = useState("");
  const [total, setTotal] = useState("");
  const [ubication, setUbication] = useState("");
  const [showBillsMessage, setShowBillsMessage] = useState("false");
  const [showBillsTotals, setShowBillsTotals] = useState("false");
  const [showBillsTable, setShowBillsTable] = useState("false");
  const [billsMessage, setbillsMessage] = useState("");
  const [createBill, setCreateBill] = useState(true);
  const [products, setProducts] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsAndProducts, setIngredientsAndProducts] = useState([]);
  const userUbication = localStorage.getItem("ubication");
  const jwtToken = localStorage.getItem("jwtToken");
  const rol = localStorage.getItem("rol");

  const getData = async () => {
    const ingredientsList = await getInventory(jwtToken);
    const productsList = await getProducts();
    const ingredientsUbication = ingredientsList.filter((ingredient) => ingredient.ubication === userUbication);
    const productsUbication = productsList.filter((product) => product.ubication === userUbication);
    const data = [ ...ingredientsUbication, ...productsUbication ]
    setIngredients(ingredientsUbication);
    setProducts(productsUbication);
    setIngredientsAndProducts(data);
  }

  useEffect(() => {
    setUbication(userUbication);
    getData();
  }, []);

  useEffect(() => {
    setBills(bills);
  }, [bills]);

  const handleSubmit = async () => {
    if (rol !== "admin") {
      setbillsMessage("No estas autorizado.");
      setShowBillsMessage("");
      return;
    }

    try {
      const dataBills = await axios.post(
        `${BASE_API_URL}/bills`,
        {
          initialDate: sdate,
          finalDate: edate,
          ubication: ubication || userUbication,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      const totalAmount = await axios.post(
        `${BASE_API_URL}/bills/total`,
        {
          initialDate: sdate,
          finalDate: edate,
          ubication: ubication || userUbication,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      setBills(dataBills.data);
      setTotal(useColMoney(totalAmount.data.data));
      setShowBillsTotals("");
      setShowBillsTable("");
    } catch (error) {
      console.error(error);
    }
  };

  const showNewBillForm = () => {
    setCreateBill(true);
  };
  const closeNewBillForm = () => {
    setCreateBill(false);
  };

  return (
    <>
      <Navbar />
      {createBill && (
        <NewBill
          ubication={ubication}
          jwtToken={jwtToken}
          closeNewBillForm={closeNewBillForm}
          products={products}
          ingredients={ingredients}
          ingredientsAndProducts={ingredientsAndProducts}
        />
      )}
      <div className="form-bills-container">
        <form className="form-sales-dates">
          <button onClick={showNewBillForm} type="button" className="new-bill">
            Crear Compra
          </button>
          <div>
            <label>Fecha Inicial</label>
            <input
              className="date-selector-bills"
              value={sdate}
              type="date"
              onChange={(e) => setSdate(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Fecha Final</label>
            <input
              className="date-selector-bills"
              value={edate}
              type="date"
              onChange={(e) => setEdate(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Ubicación</label>
            <select
              id="ubication"
              value={ubication}
              onChange={(e) => setUbication(e.target.value)}
              className={` ubication-selector-bills`}
            >
              <option value="" disabled>
                Selecciona...
              </option>
              <option value="villa colombia">Villa Colombia</option>
              <option value="unico">Único</option>
            </select>
          </div>
          <div className="button-bills-find">
            <button type="button" onClick={handleSubmit}>
              Buscar
            </button>
          </div>
        </form>
        <p className={`bills-message display-${showBillsMessage}`}>
          {billsMessage}
        </p>
      </div>

      <section className={`totals-bills-messages display-${showBillsTotals}`}>
        <table>
          <tbody>
            <tr>
              <td>Total</td>
              <td>{total}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <main className={`bills-table-container display-${showBillsTable}`}>
        <table className="bills-table">
          <thead>
            <tr>
              <th>Gasto</th>
              <th>Total</th>
              <th>Fecha</th>
              <th>Observación</th>
              <th>Usuario</th>
              <th>Ubicación</th>
            </tr>
          </thead>
          <tbody>
            {bills &&
              bills.map((bill) => (
                <tr key={bill.id}>
                  <td>{bill.name}</td>
                  <td>{useColMoney(bill.amount)}</td>
                  <td>{bill.date}</td>
                  <td>{bill.description}</td>
                  <td>{bill.user}</td>
                  <td>{bill.ubication}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </main>

    </>
  );
}
