import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef } from "react";

import HomeBannerVid from '../../../public/videos/keroHero.webm';

export const HeroBanner = ({bannerVideos}) => {

    const swiperHomeRef = useRef(null);
    const handlePrevHomeSlide = () =>{
        if(swiperHomeRef.current){
        swiperHomeRef.current.slidePrev()
        }
    }
    const handleNextHomeSlide = () =>{
        if(swiperHomeRef.current){
        swiperHomeRef.current.slideNext()
        }
    }    

  return (
    <div className="homebanner">        
        {/* {bannerVideos?.length > 1 ? 
            <>
                <Swiper
                    loop={bannerVideos?.length > 1}          
                    onSwiper={(swiper) => (swiperHomeRef.current = swiper)} // Assign Swiper instance
                >
                    {
                        bannerVideos?.map((item, index)=>(
                        <SwiperSlide key={index}>
                            <video 
                                src={item} autoPlay loop muted
                                onLoadedData={()=>console.log('video load complete')}             
                                height={900}     
                                width={1600}
                            ></video>        
                        </SwiperSlide>          
                        ))
                    }
                </Swiper>
                <div className="action-button home-prev" onClick={handlePrevHomeSlide}><FaChevronLeft/></div>
                <div className="action-button home-next" onClick={handleNextHomeSlide}><FaChevronRight/></div>
            </> : }*/}                            
        <video 
            src={HomeBannerVid} autoPlay loop muted
            onLoadedData={()=>console.log('video load complete')}                             
        ></video>
    </div>
  )
}
