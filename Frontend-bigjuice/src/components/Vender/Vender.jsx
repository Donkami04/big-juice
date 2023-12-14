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
  const [dataShopcar, setDataShopcar] = useState([]);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataProducts = await getProducts();
        setProducts(dataProducts);
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
    setShowMessage(false)
  }

  return (
    <div className="main-vender-container">
      {showMessage && <PopUp message={message} closeMessage={closeMessage}/>}
      <Navbar />
      <Categories />
      <ShopCar
        dataShopcar={dataShopcar}
        cleanShopCar={cleanShopCar}
        saleSuccesMessage={saleSuccesMessage}
        
      />
      <div className="main-product-card-container">
        {products.map((data, index) => (
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
