import { useEffect, useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import { Categories } from "../Categories/Categories";
import { ShopCar } from "../ShopCar/ShopCar";
import { ProductCard } from "../ProductCard/ProductCard";
import { PopUp } from "../PopUp/PopUp";
import { getProducts } from "../../utils/api/bigjuice";
import "./Vender.css";

export const Vender = () => {
  const [products, setProducts] = useState([]);
  const [jugos, setJugos] = useState([]);
  const [otros, setOtros] = useState([]);
  const [filtredProducts, setFiltredProducts] = useState([]);
  const [dataShopcar, setDataShopcar] = useState([]);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [category, setCategory] = useState("jugos");
  const userUbication = localStorage.getItem("ubication");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataProducts = await getProducts();
        const productsUbiJugos = dataProducts.filter(
          (product) =>
            product.ubication === userUbication && product.category === "jugos"
        );
        const productsUbiOtros = dataProducts.filter(
          (product) =>
            product.ubication === userUbication && product.category === "otros"
        );
        setProducts(productsUbiJugos);
        setJugos(productsUbiJugos);
        setOtros(productsUbiOtros);
      } catch (error) {
        console.error(error);
        return error;
      }
    };
    fetchData();
  }, []);

  const addToShopcar = (product) => {
    const updatedShopcar = [...dataShopcar, product];
    setDataShopcar(updatedShopcar);
  };

  const removeFromShopcar = (product) => {
    const index = dataShopcar.findIndex((item) => item.name === product.name);
    if (index !== -1) {
      dataShopcar.splice(index, 1);
      const newDataShopcar = [...dataShopcar];
      setDataShopcar(newDataShopcar);
    }
  };

  const cleanShopCar = () => {
    setDataShopcar([]);
  };

  const saleSuccesMessage = (text) => {
    setMessage(text);
    setShowMessage(true);
  };

  const closeMessage = () => {
    setShowMessage(false);
  };

  const handleCategory = (categorySelected) => {
    setProducts(categorySelected);
  };

  return (
    <div className="main-vender-container">
      {showMessage && <PopUp message={message} closeMessage={closeMessage} />}
      <Navbar />
      <Categories handleCategory={handleCategory} jugos={jugos} otros={otros} />
      <ShopCar
        dataShopcar={dataShopcar}
        cleanShopCar={cleanShopCar}
        saleSuccesMessage={saleSuccesMessage}
      />
      <div className="main-product-card-container">
        {products &&
          products.map((data, index) => (
            <ProductCard
              key={index}
              data={data}
              addToShopcar={addToShopcar}
              removeFromShopcar={removeFromShopcar}
            />
          ))}
      </div>
    </div>
  );
};
