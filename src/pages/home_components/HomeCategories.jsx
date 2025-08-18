import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef } from "react";

import { useState } from "react";
import { Link } from "react-router-dom";

import bsrightArrow from '../../../public/icons/right_arrow.webp';
import rightArrow from '../../../public/icons/right-arrow.webp';
import leftArrow from '../../../public/icons/left-arrow.webp';
import categoryHeading from '../../../public/categories_heading.png';


export default function HomeCategories({collectionSlide, homeData}){

    const [activeIndex, setActiveIndex] = useState(0);
    const handleTextClick = (index) => {
        setActiveIndex(index);
        if (swiperRef.current) {
            swiperRef.current.slideTo(index); // Use the Swiper instance to navigate
        }
    };
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

    const [loading, setLoading] = useState(true);
    const [allImg, setAllImg] = useState([]);
    const addLoadedImg = (index) =>{
        setAllImg(prev => {
            const newAllImg = [...prev, index];
            checkAllImageLoad(newAllImg);
            return newAllImg;
        });        
    }
    const checkAllImageLoad = (newArr) =>{
        if(newArr.length == 4){
            setLoading(false)
        }
    }

  return (
    <div className="skeleton-load home_categories">    

        <div className={`skeleton-show ${loading ? 'show' : 'hide'}`}>
            <div className="loading-heading"></div>
            <div className="loading-line"></div>
            <div className="loading-line"></div>
            <div className="loading-image-grid">
                <div className="loading-image"></div>
                <div className="loading-image"></div>
                <div className="loading-image"></div>                
            </div>
        </div>

        <div className={`section-contents ${loading ? '' : 'visible'}`}>
            <img src={categoryHeading} alt="" className="categories_heading" loading="lazy"/>
            <div dangerouslySetInnerHTML={{ __html: homeData?.categories_description }}/>

            <div className="categories-slide">
                <div className="category-option">            
                    {
                        Array.isArray(collectionSlide) && collectionSlide.map((item, index)=>(
                            <div className={`option ${activeIndex === index ? 'category-active': ''}`} onClick={() => handleTextClick(index)} key={index}><img src= {item.icon} alt="catalogue" className="categoryNameIcon" loading="lazy"/>{item.name}</div>
                        ))
                    }
                </div>
                <Swiper
                    modules={[Pagination]}
                    spaceBetween={10}
                    slidesPerView={2}
                    pagination={{ clickable: true }}
                    breakpoints={{
                    640: { slidesPerView: 2 },
                    1023: { slidesPerView: 1.5 },                
                    1440: { slidesPerView: 2.5 },
                    }}              
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                >
                    {Array.isArray(collectionSlide) && collectionSlide.map((product) => (
                    <SwiperSlide key={product.id}>
                        <div className="inside text-center">
                        <Link to={product.link}>
                            <img 
                                src={`${product.img}`} 
                                alt={product.name} 
                                height={600} width={400} 
                                loading="lazy" 
                                onLoad={()=>addLoadedImg(product.id)}
                            />
                        </Link>
                        <div className="background-layer"></div>
                        <div className="pop-on-hover">
                            <p>{product.name}</p>
                            <Link to={product.link}>
                            <button type="button" className="showMoreBtn">Show More 
                                <img src={bsrightArrow} alt="right-arrow" className="right_arrow"/>                                
                            </button>
                            </Link>
                        </div>
                        </div>
                    </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="swiper_action_button view_on_desktop">
                <button type="button" className="swip_button" onClick={handlePrevSlide}>                    
                    <img src={leftArrow} alt="left-arrow" className="left_arrow swip_button_icon"/>
                </button>
                <button type="button" className="swip_button" onClick={handleNextSlide}>                    
                    <img src={rightArrow} alt="right-arrow" className="right_arrow swip_button_icon"/>
                </button>            
            </div>          
            <button type="button" className="view_on_mobile" onClick={handleNextSlide}>Swipe <img src={bsrightArrow} alt="right-arrow" className="right_arrow"/></button>
        </div>
    </div>
  )
}
