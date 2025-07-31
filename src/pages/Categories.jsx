import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CateData from '../../data/cate-data';

import { CategoryCard } from '../components/CategoryCard';
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";

export const Categories = () => {

  const {cate} = useParams();  
  const [reqCategory, setReqCategory] = useState([])

  useEffect(()=>{
    const catePageData = CateData.filter(obj => obj.page == cate);
    setReqCategory(catePageData[0]);
  }, [cate])

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

  return(
    <div className="category-page">
      <div className="swiper-container">
        {
          reqCategory.items ? 
          <Swiper
            spaceBetween={0}
            slidesPerView={3}
            centeredSlides={true}
            roundLengths={true}
            loop={true}
            navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            }}
            breakpoints={{
            0:  { slidesPerView: 1 },
            740: { slidesPerView: 3 },
            1024: { slidesPerView: 3 },
            }}
            modules={[Navigation]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}              
          >
            {reqCategory.items.map((item, index) => (
              <SwiperSlide key={index}>
                <CategoryCard
                  aurumImages={item.aurumImages}
                  klassicImages={item.klassicImages}
                  categoryInfo={item.categoryInfo}
                />
              </SwiperSlide>              
            ))}
          </Swiper> : ''
        }

        <div className="swiper_action_button view_on_desktop">
          <button type="button" className="swip_button" onClick={handlePrevSlide}><FaChevronLeft className="right_arrow swip_button_icon"/></button>
          <button type="button" className="swip_button" onClick={handleNextSlide}><FaChevronRight className="right_arrow swip_button_icon"/></button>            
        </div> 

        <div className="swiper-button-prev">
          <FaChevronLeft/>
        </div>
        <div className="swiper-button-next">
          <FaChevronRight/>
        </div>
      </div>
    </div> 
  ) 
}
