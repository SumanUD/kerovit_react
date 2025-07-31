import { useState } from "react";
import Footer from "../../components/Footer";
import "../../styles/allProducts.scss";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const AllProduct = () => {
  const initialProducts = [
    { id: 1, img: "/product/Collection  & Product pages-28.png", name: "Aenon" },
    { id: 2, img: "/product/Collection  & Product pages-27.png", name: "Agalia" },
    { id: 3, img: "/product/Collection  & Product pages-30.png", name: "Alana" },
    { id: 4, img: "/product/Collection  & Product pages-29.png", name: "Amelia" },
    { id: 5, img: "/random_product.png", name: "Product 5" },
    { id: 6, img: "/random_product.png", name: "Product 6" },
  ];

  const moreProducts = [
    { id: 7, img: "/random_product.png", name: "Product 7" },
    { id: 8, img: "/random_product.png", name: "Product 8" },
    { id: 9, img: "/random_product.png", name: "Product 9" },
    { id: 10, img: "/random_product.png", name: "Product 10" },
    { id: 11, img: "/random_product.png", name: "Product 11" },
    { id: 12, img: "/random_product.png", name: "Product 12" },
  ];

  const [products, setProducts] = useState(initialProducts.slice(0, 4)); // Show first 4 initially
  const [visibleCount, setVisibleCount] = useState(4); // Start with 4 products

  const loadMoreProducts = () => {
    const remainingProducts = [...initialProducts.slice(4), ...moreProducts]; // Remaining products after initial 4
    const nextProducts = remainingProducts.slice(0, 4); // Load 4 at a time

    setProducts((prev) => [...prev, ...nextProducts]); // Append to existing products
    setVisibleCount((prev) => prev + nextProducts.length);
  };

  return (
    <>
      <Navbar />
      <main className="allProductMain">
        <div className="prod_details">
          <h2>FAUCET</h2>
          <p>
            Designed with a skillful unification of creativity and engineering.
            Kerovit has combined unmatched functional expertise with a promise
            of excellence, giving customers an alluring experience they desire!
          </p>
        </div>

        {/* Product Grid */}
        <div className="product_grid">
          {products.map((product) => (
            <div key={product.id} className="product_card">
              <Link to="/product_var_listing">
                <img src={product.img} alt={product.name} />
              </Link>
              <p>{product.name}</p>
            </div>
          ))}
        </div>

        {/* Load More Button (Visible Only If More Products Exist) */}
        {visibleCount < initialProducts.length + moreProducts.length && (
          <button className="load-more" onClick={loadMoreProducts}>
            Load More
          </button>
        )}
      </main>

      <Footer />
    </>
  );
};

export default AllProduct;
