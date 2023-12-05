import "./ProductCard.css";

export const ProductCard = () => {
  return (
    <div className="product-card">
      <div className="name-product-container">
        <p>MORA</p>
      </div>
      <div className="product-image-container">
        <img src="/jugo.png" />
      </div>
      <div className="add-remove-buttons-container">
        <p>+</p>
        <p>-</p>
      </div>
      <div className="price-product-container">
        <p>
        $6.000
        </p>
      </div>
    </div>
  );
};
