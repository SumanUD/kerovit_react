import { useState } from "react";
import "../../styles/singleProduct.scss";

const variants = [
  { color: "#E0E0E0", image: "https://via.placeholder.com/300?text=Variant+1" },
  { color: "#C0A080", image: "https://via.placeholder.com/300?text=Variant+2" },
  { color: "#705040", image: "https://via.placeholder.com/300?text=Variant+3" },
  { color: "#000000", image: "https://via.placeholder.com/300?text=Variant+4" },
];

export default function SingleProduct() {
  const [selectedImage, setSelectedImage] = useState(variants[0].image);

  return (
    <div className="singlePro">

    </div>
  );
}
