import { useEffect, useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import { Categories } from "../Categories/Categories";
import { ShopCar } from "../ShopCar/ShopCar";
import { ProductCard } from "../ProductCard/ProductCard";
import { getProducts } from "../../utils/api/bigjuice";
import "./Vender.css";

export const Vender = () => {
  const [products, setProducts] = useState([]);
  const [dataShopcar, setShopcar] = useState([]);

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
    setShopcar(updatedShopcar);
  };

  return (
    <div className="main-vender-container">
      <Navbar />
      <Categories />
      <ShopCar dataShopcar={dataShopcar} />
      <div className="main-product-card-container">
        {products.map((data, index) => (
          <ProductCard key={index} data={data} addToShopcar={addToShopcar} />
        ))}
      </div>
    </div>
  );
};
