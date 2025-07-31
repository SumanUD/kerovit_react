import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import aurumTabImg from "/public/aurum_collection.png";
import klassicTabImg from "/public/klassic_collection.png";
import "../styles/Categories.scss";

const Categories = ({ aurumImages, klassicImages, categoryInfo }) => {
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
                <p>{categoryInfo.description}</p>
            </div>
            <section className={`categories ${activeTab === "aurum" ? "aurum-theme" : "kerovit-theme"}`}>
                <div className="tab-container text-center">
                    <div className="tab-header d-flex justify-content-center img-header">
                        <img
                            src={aurumTabImg}
                            alt="Aurum Collection"
                            className={`tab-image ${activeTab === "aurum" ? "active" : ""}`}
                            onClick={() => setActiveTab("aurum")}
                        />
                        <img
                            src={klassicTabImg}
                            alt="Klassic Collection"
                            className={`tab-image ${activeTab === "klassic" ? "active" : ""}`}
                            onClick={() => setActiveTab("klassic")}
                        />
                    </div>

                    <div className="tab-content mt-3 img-content">
                        {/* <Slider ref={sliderRef} {...settings}> */}
                            {(activeTab === "aurum" ? aurumImages : klassicImages).map((image, index) => (
                                <div key={index} className="slider-item">
                                    <img src={image} alt={`Slide ${index + 1}`} className="content-image" />
                                </div>
                            ))}
                        {/* </Slider> */}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Categories;
