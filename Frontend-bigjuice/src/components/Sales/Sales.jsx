import { useEffect, useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import { useColMoney } from "../../hooks/useColMoney";
import axios from "axios";
import { BASE_API_URL } from "../../utils/api/bigjuice";
import { FaMagnifyingGlass } from "react-icons/fa6";
import "./Sales.css";

export function Sales() {
  const [sdate, setSdate] = useState("");
  const [sales, setSales] = useState([]);
  const [salesNequi, setSalesNequi] = useState("");
  const [salesRappi, setSalesRappi] = useState("");
  const [edate, setEdate] = useState("");
  const [total, setTotal] = useState("$");
  const [totalJugos, setTotalJugos] = useState("$");
  const [totalOthers, setTotalOthers] = useState("$");
  const ubication = localStorage.getItem("ubication");
  const jwtToken = localStorage.getItem("jwtToken");

  const handleSubmit = async () => {
    try {
      const dataTotal = await axios.post(
        `${BASE_API_URL}/sales/total`,
        {
          initialDate: sdate,
          finalDate: edate,
          ubication: ubication,
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
          ubication: ubication,
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
          ubication: ubication,
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
    } catch (error) {
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
              id="sdate"
              value={sdate}
              type="date"
              onChange={(e) => setSdate(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Fecha Final</label>
            <input
              value={edate}
              type="date"
              onChange={(e) => setEdate(e.target.value)}
            ></input>
          </div>
          <div className="button-sales-find">
            <button type="button" onClick={handleSubmit}>
            <FaMagnifyingGlass />
            </button>
          </div>
        </form>

        <section className="totals-sales-messages">
          <div>
            <p>Total ventas: {total}</p>
            <p>Total ventas Jugos: {totalJugos}</p>
            <p>Total ventas Otros: {totalOthers}</p>
            <p>Total ventas Nequi: {salesNequi}</p>
            <p>Total ventas Rappi: {salesRappi}</p>
          </div>
        </section>

        <main>
          <table className="sales-table">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Total</th>
                <th>Rappi</th>
                <th>Nequi</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale.id}>
                  <td>{sale.user}</td>
                  <td>{sale.amount}</td>
                  <td>{sale.rappi === true ? "Si" : "No"}</td>
                  <td>{sale.nequi === true ? "Si" : "No"}</td>
                  <td>{sale.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}
