import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import CollectionData from '../../data/collection-data';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";

export const Collection = () => {

  const {series} = useParams();
  const [collData, setCollData] = useState([]);
  const [pageHeaderData, setPageHeaderData] = useState([]);
  const [pageDescpData, setPageDescpData] = useState([]);

  useEffect(()=>{    
    const data = CollectionData.filter(ojb => ojb.page == series)
    setCollData(data[0].products)
    setPageHeaderData(data[0].pageHeader);
    setPageDescpData(data[0].pageDescription);


  },[series])
  
  const swiperRef = useRef(null);
  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
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

  const [loadSimulate, setLoadSimulate] = useState(true);
  useEffect(()=>{
    setTimeout(() => {
      setLoadSimulate(false)
    }, 1500);
  }, [])


  return (
    <div className={`main-klassic-content ${series == 'aurum' ? 'background-dark' : 'background-light'}`} >
      
      {
        !loadSimulate ?
        <main className="klassic">
            <div className="klassic-header">
              <h2>{pageHeaderData}</h2>
              <p>{pageDescpData}</p>
            </div>
          <div className="klassic_slider view_on_desktop">

            {
              collData.length > 0 &&
              
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
                {collData.map((product) => (
                  <SwiperSlide key={product.id}>
                    
                    <div className="inside">
                      <Link to={`/collection/${series}/${product.name.split(" ").join('_').toLowerCase()}`} className="inside_contents">
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
            }

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
          

              {collData.map((product) => (
                <SwiperSlide key={product.id}>
                  
                  <div className="inside">
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <Link to={`/collection/${series}/${product.name.split(" ").join('_').toLowerCase()}`}>
                      <img src={product.img} alt={product.name} />
                  </Link>

                    {/* <p>{product.name}</p> */}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <button type="button" onClick={handleNextSlide}>Swipe <BsArrowRight className="right_arrow"/></button>
          </div>          
        </main> : 
        <main className="klassic skeleton-load">
          <div className="loading-box"></div>
          <div className="loading-box"></div>
          <div className="loading-box"></div>
        </main>
      }
    </div>
  )
}
