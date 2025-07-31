import { useState } from "react";
import Footer from "../../components/Footer";
import "../../styles/allProductVar.scss";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const AllVarProduct = () => {
  const initialProducts = [
    { id: 1, img: "/product/single_var1.png", name: "MODEL NO: ABCD1234" },
    { id: 2, img: "/product/single_var.png", name: "MODEL NO: ABCD1234" },
    { id: 3, img: "/product/single_var.png", name: "MODEL NO: ABCD1234" },
    { id: 4, img: "/product/single_var.png", name: "MODEL NO: ABCD1234" },
    // { id: 5, img: "/product/single_var.png", name: "Product 5" },
    // { id: 6, img: "/product/single_var.png", name: "Product 6" },
  ];

  const moreProducts = [
    { id: 7, img: "/product/single_var.png", name: "MODEL NO: ABCD1234 7" },
    { id: 8, img: "/product/single_var.png", name: "MODEL NO: ABCD1234 8" },
    { id: 9, img: "/product/single_var.png", name: "MODEL NO: ABCD1234 9" },
    { id: 10, img: "/product/single_var.png", name: "MODEL NO: ABCD1234 10" },
    { id: 11, img: "/product/single_var.png", name: "MODEL NO: ABCD1234 11" },
    { id: 12, img: "/product/single_var.png", name: "MODEL NO: ABCD1234 12" },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [visibleCount, setVisibleCount] = useState(6);

  const loadMoreProducts = () => {
    const newProducts = moreProducts.slice(0, 6);
    setProducts((prev) => [...prev, ...newProducts]);
    setVisibleCount((prev) => prev + newProducts.length);
  };

  return (
    <>
    <Navbar />
      <main className="allProductMain">
        <div className="prod_details">
          <h2>AENON</h2>
          <p>Inspired by the calmness of water springs and the majestic cascading waterfalls, our Aenon range of showers beautifully blends the power of flow and the feeling of rejuvenating refreshment.</p>
        </div>

        <div className="product_grid">
          {products.map((product) => (
            <div className="product_card" key={product.id} >
              <Link to={`/single_product`} >
              <img src={product.img} alt={product.name} />
              <p>{product.name}</p>
            </Link>
            </div>
            
          ))}
        </div>

        {products.length < initialProducts.length + moreProducts.length && (
          <button className="load-more" onClick={loadMoreProducts}>
            Load More
          </button>
        )}
      </main>

      <Footer />
    </>
  );
};

export default AllVarProduct;
