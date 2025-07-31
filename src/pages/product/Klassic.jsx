import Navbar from "../../components/Navbar";
// import Header from "../components/Header";
import Footer from "../../components/Footer";
import "../../styles/klassic.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { BsArrowLeft } from "react-icons/bs";

import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";



const Klassic = () => {

  const products = [
    { id: 1, img: "/product/single_product.png", name: "Faucet", description:"From sculptural silhouettes to everyday essentials, our range of faucets, spanning the Aurum and Klassic collections, blends style with smooth performance in every turn." },
    { id: 2, img: "/aurum_shower.png", name: "Shower", description:"Whether you need an energizing start or a calming wind-down, our vast range of Aurum and Klassic collections has it all to match your space." },
    { id: 3, img: "/aurum_basin.png", name: "Basin",description:"Whether you’re drawn to the sculptural beauty of Aurum or the simplicity of Klassic, our basins bring a sense of balance to your daily rituals." },
    { id: 4, img: "/aurum_toilet.png", name: "Toilet",description:"Be it the refined hues of Aurum or the everyday comfort of Klassic, our toilets are cleverly designed to keep things clean and sophisticated." },
    { id: 5, img: "/aurum_bath_fur.png", name: "Bathroom Furniture",description:"From Aurum’s sleek sophistication to Klassic’s practical ease, our bathroom furniture range keeps your space organised, elevated, and unmistakably yours." },
    { id: 6, img: "/aurum_accessories.png", name: "Accessories",description:"From the finely crafted details of Aurum to the everyday functionality of Klassic, our accessories are made to accentuate your space." },
  ];

  const swiperRef = useRef(null);
  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };
  const handlePrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const swiperDesktopRef = useRef(null);
  const handleNextSlideDesktop = () => {
    if (swiperDesktopRef.current) {
      swiperDesktopRef.current.slideNext();
    }
  };
  const handlePrevSlideDesktop = () => {
    if (swiperDesktopRef.current) {
      swiperDesktopRef.current.slidePrev();
    }
  };

  return (
    <>
      <Navbar />

      
      <div className="main-klassic-content">

      <main className="klassic">

        <div className="klassic_slider view_on_desktop">
          <Swiper
            modules={[Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            loop={true}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 2 },
            }}
            onSwiper={(swiper) => (swiperDesktopRef.current = swiper)}
          >
        

            {products.map((product) => (
              <SwiperSlide key={product.id}>
                
                <div className="inside">
                  <Link to="/product_listing" className="inside_contents">
                    <img src={product.img} alt={product.name} />
                    <div className="inside_text_content">
                      <h2>{product.name}</h2>
                      <p>{product.description}</p>
                    </div>
                  </Link>
                    {/* <p>{product.name}</p> */}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="swiper_nav_buttons">
            <button type="button" onClick={handlePrevSlideDesktop}><FaChevronLeft className="left_arrow"/></button>
            <button type="button" onClick={handleNextSlideDesktop}><FaChevronRight className="right_arrow"/></button>
          </div>
        </div>

        <div className="klassic_slider view_on_mobile">
          <Swiper
            modules={[Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 2 },
            }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
        

            {products.map((product) => (
              <SwiperSlide key={product.id}>
                
                <div className="inside">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <Link to="/product_listing">
                    <img src={product.img} alt={product.name} />
                </Link>

                  {/* <p>{product.name}</p> */}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button type="button" onClick={handleNextSlide}>Swipe <BsArrowRight className="right_arrow"/></button>
        </div>

        

      </main>
      </div>

      <Footer />
    </>
  );
};

export default Klassic;
