import { FaPhoneAlt } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from 'swiper/modules';
import "swiper/css";
import 'swiper/css/pagination';
// import 'swiper/css/navigation';

import { MdLocationPin } from "react-icons/md";


const StoreCard = ({
        storeHeader,
        storeImage,
        location
    }) => {
    if (!location || location.length < 1) return null;
    
    return (
        <main className="all-store-card">
            <div className="store-card">
                <div className="store-images">
                    {
                        location[0].dealertype == 'Experience Center' ? 
                        <div className="storeHeader text-header"><h2>KEROVIT</h2> <h2>|</h2> {location[0].dealertype}</div> :
                        <img src={storeHeader} alt="Store header" className="storeHeader" />
                    }
    
                    
                    <img src={storeImage} alt="Store preview" className="store-image" />
                </div>
                <Swiper 
                    className="location_swiper"
                    spaceBetween={10}
                    loop={location.length > 1}
                    pagination={{
                        type: 'fraction',
                    }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    modules={[Pagination, Autoplay]}                    
                >
                    {
                        location.map((item, index)=>(
                            <SwiperSlide key={index}>
                                <div className="store-text-contents">
                                    <div className="store-info">
                                        <h3 className="store-name">{item.dealername}</h3>
                                        <p className="owner-name">{item.contactperson}</p>
                                        <p className="store-details">{item.address}</p>
                                        <p className="store-phone">
                                        <FaPhoneAlt /> <a href={`tel:${item.contactnumber}`}>{item.contactnumber}</a>
                                        </p>

                                        {
                                            item.google_link != "" ?
                                            <div className="actions">
                                                <a href={item?.google_link} target="_blank" rel="noopener noreferrer">
                                                    <button className="direction-btn">
                                                        Get Direction{" "}
                                                        <img
                                                            src="/locate-our-store/arrow-top-right.png"
                                                            alt="arrow-top-right"
                                                            className="arrow-top-right"
                                                        />
                                                    </button>
                                                </a>                            
                                            </div> : 
                                            <p>
                                               <MdLocationPin />  {item.state}, {item.city}
                                            </p>
                                        }
                                    </div>
                                </div>                                
                            </SwiperSlide>
                        ))
                    }
                </Swiper>

            </div>
        </main>
    );
};

export default StoreCard;