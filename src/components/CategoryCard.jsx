import React, { useState, useRef } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import aurumTabImg from "/public/aurum_collection.png";
import klassicTabImg from "/public/klassic_logo2.png";

export const CategoryCard = ({ aurumImages, klassicImages, categoryInfo }) => {
    const [activeTab, setActiveTab] = useState("aurum");
    const sliderRef = useRef(null);

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: false,
        dots: false,
    };
    return (
        <main className="catMain">
            <div className="catContent">
                <h2>{categoryInfo.name}</h2>
                <p style={{color:"#888686"}}>{categoryInfo.description}</p>
            </div>
            <section className={`categories ${activeTab === "aurum" ? "kerovit-theme" : "kerovit-theme"}`}>
                <div className="tab-container text-center">
                    <div className="tab-header d-flex justify-content-center img-header">
                        <div className="collection">
                            <img
                                src={aurumTabImg}
                                alt="Aurum Collection"
                                className={`tab-image ${activeTab === "aurum" ? "active" : ""}`}
                                onClick={() => setActiveTab("aurum")}
                                loading="lazy"
                            />
                            <p>Our premium range crafted for symphony of expressions</p>
                        </div>
                        <div className="collection">
                            <img
                                src={klassicTabImg}
                                alt="Klassic Collection"
                                className={`tab-image ${activeTab === "klassic" ? "active" : ""}`}
                                onClick={() => setActiveTab("klassic")}
                                loading="lazy"
                            />
                            <p>Our Klassic range that fits in seamlessly for your daily use</p>
                        </div>
                    </div>

                    <div className="tab-content mt-3 img-content">
                        {(activeTab === "aurum" ? aurumImages : klassicImages).map((image, index) => (
                            <div key={index} className="slider-item">
                                <Link to={activeTab == 'aurum' ? `/collection/aurum/${categoryInfo.name.split(" ").join('_').toLowerCase()}`: `/collection/klassic/${categoryInfo.name.split(" ").join('_').toLowerCase()}` }>
                                    <img src={image} alt={`Slide ${index + 1}`} className="content-image" loading="lazy" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
