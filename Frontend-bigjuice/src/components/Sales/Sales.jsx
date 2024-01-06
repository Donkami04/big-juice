import { useEffect, useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import { useColMoney } from "../../hooks/useColMoney";
import axios from "axios";
import { BASE_API_URL } from "../../utils/api/bigjuice";
import { FaMagnifyingGlass } from "react-icons/fa6";
import "./Sales.css";

export function Sales() {
  const [sales, setSales] = useState([]);
  const [salesNequi, setSalesNequi] = useState("$ 0");
  const [salesRappi, setSalesRappi] = useState("$ 0");
  const [total, setTotal] = useState("$ 0");
  const [totalJugos, setTotalJugos] = useState("$ 0");
  const [totalOthers, setTotalOthers] = useState("$ 0");
  const [sdate, setSdate] = useState("");
  const [edate, setEdate] = useState("");
  const [ubication, setUbication] = useState("");
  const userUbication = localStorage.getItem("ubication");
  const jwtToken = localStorage.getItem("jwtToken");
  const rol = localStorage.getItem("rol");
  const [showSalesTable, setShowSalesTable] = useState("false");
  const [showUbicationSelector, setShowUbicationSelector] = useState("false");
  const [showSalesMessage, setShowSalesMessage] = useState("false");
  const [salesMessage, setSalesMessage] = useState("");

  useEffect(() => {
    rol !== "admin"
      ? setShowUbicationSelector("false")
      : setShowUbicationSelector("");

      setUbication(userUbication)
  }, []);

  const handleSubmit = async () => {
    if (!sdate || !edate) {
      setShowSalesMessage("")
      setSalesMessage("Por favor, selecciona ambas fechas.");
      return;
    }
    try {
      const dataTotal = await axios.post(
        `${BASE_API_URL}/sales/total`,
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

      const dataTotalJugos = await axios.post(
        `${BASE_API_URL}/sales/category`,
        {
          initialDate: sdate,
          finalDate: edate,
          category: "jugos",
          ubication: ubication || userUbication,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      const dataTotalOthers = await axios.post(
        `${BASE_API_URL}/sales/category`,
        {
          initialDate: sdate,
          finalDate: edate,
          category: "otros",
          ubication: ubication || userUbication,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      setSales(dataTotal.data.data.sales);
      setTotal(useColMoney(dataTotal.data.data.totalSales));
      setTotalJugos(useColMoney(dataTotalJugos.data.data));
      setTotalOthers(useColMoney(dataTotalOthers.data.data));
      setShowSalesTable("");
      setShowSalesMessage("false");
      
    } catch (error) {
      setShowSalesTable("false");
      setShowSalesMessage("");
      setSalesMessage(error.response.data.message);
      console.error(error);
    }
  };

  useEffect(() => {
    classifySales(sales);
  }, [sales]);

  const classifySales = (data) => {
    let nequiSales = 0;
    let rappiSales = 0;

    data.forEach((s) => {
      if (s.nequi === true) {
        nequiSales += s.amount;
      }
      if (s.rappi === true) {
        rappiSales += s.amount;
      }
    });
    const nequiSalesMoneyFormat = useColMoney(nequiSales);
    const rappiSalesMoneyFormat = useColMoney(rappiSales);
    setSalesNequi(nequiSalesMoneyFormat);
    setSalesRappi(rappiSalesMoneyFormat);
  };

  return (
    <div>
      <Navbar />

      <div className="sales-dates-container">
        <form className="form-sales-dates">
          <div>
            <label>Fecha Inicial</label>
            <input
              className="date-selector-sales"
              value={sdate}
              type="date"
              onChange={(e) => setSdate(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Fecha Final</label>
            <input
              className="date-selector-sales"
              value={edate}
              type="date"
              onChange={(e) => setEdate(e.target.value)}
            ></input>
          </div>
          <div>
            <label className={`display-${showUbicationSelector}`}>
              Ubicación
            </label>
            <select
              id="ubication"
              value={ubication}
              onChange={(e) => setUbication(e.target.value)}
              className={`display-${showUbicationSelector} ubication-selector-sales`}
            >
              <option value="" disabled>
                Selecciona...
              </option>
              <option value="villa colombia">Villa Colombia</option>
              <option value="unico">Único</option>
            </select>
          </div>
          <div className="button-sales-find">
            <button type="button" onClick={handleSubmit}>
              <FaMagnifyingGlass />
            </button>
          </div>
        </form>
        <p className={`sales-message display-${showSalesMessage}`}>{salesMessage}</p>

        <section className={`totals-sales-messages display-${showSalesTable}`}>
          <table>
            <tbody>
              <tr>
                <td>Total</td>
                <td>{total}</td>
              </tr>
              <tr>
                <td>Jugos</td>
                <td>{totalJugos}</td>
              </tr>
              <tr>
                <td>Otros</td>
                <td>{totalOthers}</td>
              </tr>
              <tr>
                <td>Nequi</td>
                <td>{salesNequi}</td>
              </tr>
              <tr>
                <td>Rappi</td>
                <td>{salesRappi}</td>
              </tr>
            </tbody>
          </table>
        </section>

        <main className={`sales-table-container display-${showSalesTable}`}>
          <table className="sales-table">
            <thead>
              <tr>
                <th>Id Venta</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Rappi</th>
                <th>Nequi</th>
                <th>Usuario</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale.id}>
                  <td>{sale.id}</td>
                  <td>{sale.date}</td>
                  <td>{useColMoney(sale.amount)}</td>
                  <td>{sale.rappi === true ? "Si" : "No"}</td>
                  <td>{sale.nequi === true ? "Si" : "No"}</td>
                  <td>{sale.user}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}
