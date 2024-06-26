import Breadcrumb from "./Breadcrumb/Breadcrumb";
import Gallery from "./Gallery/Gallery";
import Info from "./Info/Info";
import Tabs from "./Tabs/Tabs";
import "./ProductDetails.css";

const ProductDetails = ({ product, setProduct, addToCart }) => {
  return (
    <section className="single-product">
      <div className="container">
        <div className="single-product-wrapper">
          <Breadcrumb />
          <div className="single-content">
            <main className="site-main">
              <Gallery images={product.img} />
              <Info product={product} addToCart={addToCart} />
            </main>
          </div>
          <Tabs product={product} setProduct={setProduct} />
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
