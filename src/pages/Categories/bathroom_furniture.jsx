import Navbar from "../../components/Navbar";
// import Header from "../components/Header";
import Footer from "../../components/Footer";
import Categories from "../../components/Categories";
import "../../styles/categories1.scss";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";

const categorieList = [    
  {
    aurumImages:[
      "/product/1.jpg",
      // "/product/2.jpg",
      // "/product/3.jpg",
    ],
    
    klassicImages:[
      "/product/4.jpg",
      // "/product/5.jpg",    
    ],  
    categoryInfo:{
      name: "faucet",
      description: "From sculptural silhouettes to everyday essentials, our range of faucets, spanning the Aurum and Klassic collections, blends style with smooth performance in every turn.",
    }
  },
  {
    aurumImages:[
      // "/product/1.jpg",
      "/product/2.jpg",
      // "/product/3.jpg",
    ],    
    klassicImages:[
      // "/product/4.jpg",
      "/product/5.jpg",      
    ],    
    categoryInfo:{
      name: "shower",
      description: "Whether you need an energizing start or a calming wind-down, our vast range of Aurum and Klassic collections has it all to match your space.",
    }
  },
  {
    aurumImages:[
      // "/product/1.jpg",
      // "/product/2.jpg",
      "/product/3.jpg",
    ],
    klassicImages:[
      // "/product/4.jpg",
      "/product/5.jpg",      
    ],
    categoryInfo:{
      name: "basin",
      description: "Whether you’re drawn to the sculptural beauty of Aurum or the simplicity of Klassic, our basins bring a sense of balance to your daily rituals.",
    }
  },
  {
    aurumImages:[
      "/product/1.jpg",
      // "/product/2.jpg",
      // "/product/3.jpg",
    ],    
    klassicImages:[
      "/product/4.jpg",
      // "/product/5.jpg",      
    ],    
    categoryInfo:{
      name: "toilet",
      description: "Be it the refined hues of Aurum or the everyday comfort of Klassic, our toilets are cleverly designed to keep things clean and sophisticated.",
    }  
  },
  {
    aurumImages:[
      // "/product/1.jpg",
      "/product/2.jpg",
      // "/product/3.jpg",
    ],    
    klassicImages:[
      // "/product/4.jpg",
      "/product/5.jpg",      
    ],    
    categoryInfo:{
      name: "Bathroom Furniture",
      description: "From Aurum’s sleek sophistication to Klassic’s practical ease, our bathroom furniture range keeps your space organised, elevated, and unmistakably yours.",
    }
  },  
  {
    aurumImages:[
      // "/product/1.jpg",
      // "/product/2.jpg",
      "/product/3.jpg",
    ],
    klassicImages:[
      "/product/4.jpg",
      // "/product/5.jpg",      
    ],
    categoryInfo:{
      name: "accessories",
      description: "From the finely crafted details of Aurum to the everyday functionality of Klassic, our accessories are made to accentuate your space.",
    }
  },
]

const BathroomFurniture = () => {
  const swiperRef = useRef(null);
  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  }
  const handlePrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  }
  return (
    <>
      <Navbar />

      <div className="category-page">
        <div className="swiper-container">
          <Swiper
            spaceBetween={0}
            slidesPerView={3}
            centeredSlides={true}
            roundLengths={true}
            loop={true}
            // loopAdditionalSlides={30}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            breakpoints={{
              0:  { slidesPerView: 1 },
              740: { slidesPerView: 1 },
              1024: { slidesPerView: 3 },
            }}
            modules={[Navigation]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}  
          >
            {categorieList.map((item, index) => (
              <SwiperSlide key={index}>
                <Categories
                  aurumImages={item.aurumImages}
                  klassicImages={item.klassicImages}
                  categoryInfo={item.categoryInfo}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="swiper_action_button view_on_desktop">
              <button type="button" className="swip_button" onClick={handlePrevSlide}><FaChevronLeft className="right_arrow swip_button_icon"/></button>
              <button type="button" className="swip_button" onClick={handleNextSlide}><FaChevronRight className="right_arrow swip_button_icon"/></button>            
            </div> 

          {/* Navigation buttons */}
          <div className="swiper-button-prev">
            <FaChevronLeft/>
          </div>
          <div className="swiper-button-next">
            <FaChevronRight/>
          </div>
        </div>
      </div>

      
      <Footer />
    </>
  );
};

export default BathroomFurniture;
