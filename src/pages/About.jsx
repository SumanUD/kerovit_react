import whatsapp from '../../public/icons/whatsapp.webp';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay,  Navigation, Pagination } from "swiper/modules";
import { useState, useEffect } from "react";
import axios from "axios";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import rightArrow from '../../public/icons/right-arrow.webp';
import leftArrow from '../../public/icons/left-arrow.webp';

import { useLocation} from "react-router-dom";

export const About = () => {

  const [swiperInstance, setSwiperInstance] = useState(null);
  const [swiperCertificateInstance, setSwiperCertificateInstance] = useState(null);

  const [readMoreOne, setReadMoreOne] = useState(false);
  const [readMoreTwo, setReadMoreTwo] = useState(false);

  const [readMore, setReadMore] = useState('')
  const handleReadMore = (id) =>{
    if(id == readMore){
      setReadMore('')
    }else{
      setReadMore(id)
    }
  }
  const handleNextSlide = () => {
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };
  const handlePrevSlide = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  const handleNextCertificateSlide = () => {
    if (swiperCertificateInstance) {
      swiperCertificateInstance.slideNext();
    }
  };
  const handlePrevCertificateSlide = () => {
    if (swiperCertificateInstance) {
      swiperCertificateInstance.slidePrev();
    }
  };
  
  const [aboutData, setAboutData] = useState({})
  const aboutURL = import.meta.env.VITE_API_ABOUT;  
  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(aboutURL , {
          headers: {
            'Authorization': `Bearer gVSYUDhjLSXMDZSpVdPCiz9s`, // Replace with your actual API key
            'Content-Type': 'application/json', // Set content type if required
          },
        });
        setAboutData(res.data.data)        
      } catch (err) {
        console.error('Error:', err.message);
      }
    }

    getData();
  }, []);

  
  const location = useLocation();  
  const title = location.state?.title;  
  const from = location.state?.from;
  useEffect(() => {
    const isSamePage = from == "/about";
    const delay = isSamePage ? 50 : 600;    
     if (title) {
      const timeout = setTimeout(() => {
        const element = document.getElementById(title);        
        if (element) {
          element.scrollIntoView();
        } else {
          console.warn("Section not found:", title);
        }
      }, delay); // wait 100ms for DOM to render

      return () => clearTimeout(timeout);
    }
  }, [title]);

  return (
    <main className="aboutus_main">      
      <div className="homebanner">
        <video className="aboutus_video" src={aboutData.banner_video} autoPlay loop muted/>
        {/* <div className="bannerText">
          <div className="banner-title-center">
            <h2>bathrooms</h2>
            <span className="h2_second">
              you <h2>desire</h2>
            </span>
          </div>
          <div className="bannerdescp">
            <img src="home page-08.png" alt="" className="line_image" />
            <p>
              Kerovit's distinguished range of products encircle your soul into a sensational experience. made with utmost precision, we bring wellness into your home with great style and panache.
            </p>
          </div>
        </div> */}
        <div className="whatsapp-icon">
          <img src={whatsapp} alt="whatsapp-icons" />
        </div>        
      </div>

      <div className="about-page-contents" >
        <div className="belowbanner"  id="Who_We_Are">
          {/* <h2>who we are</h2> */}
          <div className="whoWeAre">
            <div className="belowBannerText">
              <h2>who</h2>
              <span className="h2_second">
                <p>we</p> <h2>are</h2>
              </span>
            </div>
            <div dangerouslySetInnerHTML={{ __html: aboutData.below_banner_description }}/>
          </div>
          <p className={`p2 ${readMoreOne ? '' : 'one_close'}`} ></p>
          <div className={readMoreOne ? '' : 'one_close_content'}>
          <h2>Proudly Made in India</h2><br/>
            <p className="p3">Kerovit is a brand Made in India. Our journey is powered by a dedicated workforce and a strong presence across the country:</p>
            <ul>
              <li>
              <p>16 Experience Centers</p>
              </li>
              <li>
                <p>212 Kerovit Studios</p>
              </li>
              <li>
                <p>84 Kerovit World</p>
              </li>
            </ul>

            <p className="p3">
            Our state-of-the-art manufacturing plant in Gailpur, Rajasthan, spans over 2 lakh sq. ft., with an annual capacity of 1.8 million faucets. Crafted with solid metal for superior strength and durability, our faucets exude excellence throughout all its designs. <br/><br/>

            Meanwhile, our sanitaryware unit in Morbi, Gujarat, upholds international manufacturing standards with meticulous processes. Certified by ISI, this facility has an impressive annual capacity of 1.2 million sanitaryware units. <br/><br/>

            Adding golden feathers to our relentless pursuit of excellence, we established the Kerovit Global Private Limited (KGPL), our second sanitaryware plant, in Morbi, Gujarat. Spanning over 6 lakh sq. meters, this cutting-edge facility is designed to shape the future of the Indian sanitaryware industry.<br/><br/>

            With a focus on precision engineering, automation, and sustainability, complemented by a talented pool of skilled technicians, the KGPL plant is a powerhouse of innovation, ensuring unmatched quality, reliability and efficiency.<br/><br/></p>
            <h2>Driven By Ethos of  Sustainability</h2> <br/>
            <p className="p3">
            
            At Kerovit, we believe in striding towards progress by keeping the best interest of both people and the planet. Our Green Innovation range is designed to conserve water and energy without compromising performance. <br/><br/>

            We also adhere to the Zero Liquid Discharge (ZLD) principle, ensuring that our plants release zero liquid effluent into the environment. By embracing advanced wastewater management, we are actively contributing to water conservation and a sustainable future.
            </p>
          </div>
          <button className="read_more" onClick={()=> setReadMoreOne(!readMoreOne)}>{readMoreOne ? "close":"read more"}</button>
        </div>

        <div className="directorMessage" id="Directors_Message">
          <img src={aboutData.director_image} alt="" />
          <div className="belowImageContent">
            <div dangerouslySetInnerHTML={{ __html: aboutData.director_description }}/>

            {/* <button className="read_more" onClick={()=>setReadMoreTwo(!readMoreTwo)}>{readMoreTwo ? 'close' : 'read more'}</button> */}
          </div>
        </div>

        <div className="manufacturingPlant" id="Manufacturing_Plants">
          <h2 className="mpTitle">manufacturing plants</h2>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={10}
            pagination={{ clickable: true }}
            navigation={{ nextEl: ".next-btn", prevEl: ".prev-btn" }}
            loop={aboutData?.plants?.length > 1}
            onSwiper={setSwiperInstance}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
            }}
          >

            {aboutData?.plants?.map((plant, index) => (
              <SwiperSlide key={index}>
                <div className="inside">
                  <h2>{plant.title}</h2>
                  <img src={plant.image} alt={plant.title} />                                    
                  <p dangerouslySetInnerHTML={{ __html: plant.description }} className="text-center"></p>      
                  {/* <div className="primary-btn" onClick={()=>handleReadMore(plant.id)}>{plant.id == readMore ? 'read less' : 'read more'}</div> */}
                </div>                
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="swipeButton" onClick={handleNextSlide}>            
            <img src={rightArrow} alt="right-icon" />
          </button>
          <button className="swipeButton" onClick={handlePrevSlide}>            
            <img src={leftArrow} alt="left-icon" />
          </button>

          
          {/* <button type="button" className="swipeButton" onClick={handleNextSlide}><FaChevronRight className="right_arrow disableOnMobile" /><span className="disableOnDesktop">Swipe < BsArrowRight  className="right_arrow" /></span></button> */}
        </div>

        <div className="certifications" id="Certification">
          <h2 className="mpTitle text-center">Certifications</h2>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={10}
            slidesPerView={4}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={aboutData?.certification_images?.length > 1}
            pagination={{ clickable: true }}
            
            navigation={{ nextEl: ".next-btn-cert", prevEl: ".prev-btn-cert" }}
            breakpoints={{
              0:{slidesPerView: 3},
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            onSwiper={setSwiperCertificateInstance}            
          >
            {aboutData?.certification_images?.map((certificate, index) => (
              <SwiperSlide key={index}>
                <div className="inside">
                  <img src={certificate} alt="Certificate" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* <button className="prev-btn-cert"><MdKeyboardArrowLeft /></button>
          <button className="next-btn-cert"><MdKeyboardArrowRight /></button> */}

          <div className="swiper-button-2 disableOnMobile">
            <button type="button" className="swipeButton dissable_button" onClick={handleNextCertificateSlide}>
              <img src={rightArrow} alt="right-icon" className="right_arrow" /></button>
            <button type="button" className="swipeButton" onClick={handlePrevCertificateSlide}>             
              <img src={leftArrow} alt="left-icon"  className="right_arrow" />
            </button>
          </div>
        </div>
      </div>      
    </main>
  );
};
