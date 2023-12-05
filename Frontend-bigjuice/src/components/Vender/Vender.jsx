import { Navbar } from "../Navbar/Navbar"
import { Categories } from "../Categories/Categories"
import { ShopCar } from "../ShopCar/ShopCar"
import { ProductCard } from "../ProductCard/ProductCard"
import "./Vender.css"

export const Vender = () => {
    return (
      <div className="main-vender-container">
        <Navbar />
        <Categories />
        <ShopCar />
        <div className="main-product-card-container">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />

        </div>

      </div>
    )
  }