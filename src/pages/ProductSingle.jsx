import { useEffect, useState } from "react";
import plusIcon from "../../public/icons/plus.webp";
import minusIcon from "../../public/icons/minus.webp";
import 'react-inner-image-zoom/lib/styles.min.css';
import InnerImageZoom from 'react-inner-image-zoom';
import { Link, useLocation, useParams } from 'react-router-dom'
import axios from "axios";

const variants = [
    { sku: "KSR001-WH", image: "/product/1.jpg", alt: "White Variant" },
    { sku: "KSR001-BE", image: "/product/2.jpg", alt: "Beige Variant" },
    { sku: "KSR001-BR", image: "/product/3.jpg", alt: "Brown Variant" },
    { sku: "KSR001-BK", image: "/product/4.jpg", alt: "Black Variant" },
];

export const ProductSingle = () => {

    const { series, product, variation, id } = useParams();
    const [selectedImage, setSelectedImage] = useState(variants[0].image);
    const [openSection, setOpenSection] = useState(null);

    const location = useLocation();
    const rangeId = location.state.range;    

    console.log(location.state)

    const toggleSection = (sectionIndex) => {
        setOpenSection(openSection === sectionIndex ? null : sectionIndex);
    };

    const [loadSimulate, setLoadSimulate] = useState(true);

    const [singleProduct, setSingleProduct] = useState({})
    const [mainProduct, setMainProduct] = useState({})
    const [allVariants, setVariants] = useState([])

    const baseUrl = import.meta.env.VITE_API_BASEURL;

    const {pathname} = useLocation()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(baseUrl + `/api/ranges/${rangeId}/products`, { headers: { 'Content-Type': 'application/json' } });
                const getProduct = (response.data.range.products.find(obj => obj.product_code == id))
                const { variants, ...rest } = getProduct;
                setMainProduct(getProduct)
                setSingleProduct(getProduct)
                const newVariants = [rest, ...getProduct.variants]
                setVariants(newVariants)

                setSelectedImage(getProduct.product_picture)
                setLoadSimulate(false)
                
            } catch (err) {
                console.log(err)
            }
        }

        fetchData()
    }, [pathname])

    function handleVariant(code) {
        const variant = allVariants.find(obj => obj.product_code == code)
        setSelectedImage(variant.product_picture)
        setSingleProduct(variant)
    }    

    return (
        <>
            {
                !loadSimulate ?
                    <div className="single-product-page">
                        <div className="singlePro">
                            <div className="main-image">
                                <InnerImageZoom
                                    src={selectedImage}
                                    zoomSrc={selectedImage}
                                    zoomScale={0.8}
                                />
                            </div>

                            <div className="product-details">
                                <div className="description">
                                    <h2>{product.toUpperCase()}</h2>
                                    <p className="model">MODEL NO.: {singleProduct.product_code}</p>
                                    <p className="series">SERIES: {series.toUpperCase()}</p>

                                    {
                                        mainProduct.variants.length > 0 &&
                                        <>
                                            <h3>Variants</h3>
                                            <div className="variants">
                                                {allVariants.map((variant, index) => (
                                                    <span
                                                        key={index}
                                                        style={{ background: variant.product_color_code }}
                                                        onClick={() => handleVariant(variant.product_code)}
                                                        className={`variant-image ${selectedImage === variant.product_picture ? "active" : ""}`}
                                                    />

                                                ))}
                                            </div>
                                        </>
                                    }

                                    <h3>Product Description</h3>
                                    <p className="description_p">{singleProduct.product_description}</p>

                                    <Link to={'/locate-our-store'}>
                                        <button className="nearest-showroom-btn">NEAREST SHOWROOM</button>
                                    </Link>
                                </div>


                                <div className="dropdown-section">
                                    {/* {singleProduct.product_feature &&
                                        <div className="dropdown-item">
                                            <button onClick={() => toggleSection(0)}>
                                                Features
                                                <span className="dropdown-icon">
                                                    <img
                                                        src={openSection === 0 ? minusIcon : plusIcon}
                                                        alt={openSection === 0 ? "Collapse" : "Expand"}
                                                        width="16"
                                                        height="16"
                                                    />
                                                </span>
                                            </button>
                                            {openSection === 0 && (
                                                <div className="dropdown-content">
                                                    <p>{singleProduct.product_feature}</p>
                                                </div>
                                            )}
                                        </div>
                                    } */}

                                    {/* {singleProduct.product_installation_service_parts &&
                                <div className="dropdown-item">
                                    <button onClick={() => toggleSection(1)}>
                                        Installation & Service Parts
                                        <span className="dropdown-icon">
                                        <img
                                            src={openSection === 1 ? minusIcon : plusIcon}
                                            alt={openSection === 1 ? "Collapse" : "Expand"}
                                            width="16"
                                            height="16"
                                        />
                                        </span>
                                    </button>
                                    {openSection === 1 && (
                                        <div className="dropdown-content">
                                        <p>{singleProduct.product_installation_service_parts}</p>
                                        </div>
                                    )}
                                </div>
                            } */}

                                    {singleProduct.design_files &&
                                        <div className="dropdown-item">
                                            <button onClick={() => toggleSection(2)}>
                                                Design Files
                                                <span className="dropdown-icon">
                                                    <img
                                                        src={openSection === 2 ? minusIcon : plusIcon}
                                                        alt={openSection === 2 ? "Collapse" : "Expand"}
                                                        width="16"
                                                        height="16"
                                                    />
                                                </span>
                                            </button>
                                            {openSection === 2 && (
                                                <div className="dropdown-content">
                                                    <a href={singleProduct.design_files} target="__blank" alt="design_file">View PDF</a>
                                                </div>
                                            )}
                                        </div>
                                    }

                                    {/* {singleProduct.additional_information &&
                                <div className="dropdown-item">
                                    <button onClick={() => toggleSection(3)}>
                                        Additional Information
                                        <span className="dropdown-icon">
                                        <img
                                            src={openSection === 3 ? minusIcon : plusIcon}
                                            alt={openSection === 3 ? "Collapse" : "Expand"}
                                            width="16"
                                            height="16"
                                        />
                                        </span>
                                    </button>
                                    {openSection === 3 && (
                                        <div className="dropdown-content">
                                        <p>{singleProduct.additional_information}</p>
                                        </div>
                                    )}
                                </div>
                            } */}
                                </div>
                            </div>
                        </div>
                    </div> :

                    <div className="single-product-page skeleton-load">
                        <div className="singlePro">
                            <div className="main-image">
                                <div className="loading-image"></div>
                            </div>

                            <div className="product-details">
                                <div className="loading-heading"></div>
                                <div className="loading-line-group">
                                    <div className="loading-line"></div>
                                    <div className="loading-line"></div>
                                    <div className="loading-line"></div>
                                </div>
                                <div className="loading-heading"></div>
                                <div className="loading-box"></div>
                            </div>
                        </div>
                    </div>
            }

        </>
    )
}
