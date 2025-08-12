import { Link } from "react-router-dom"

export default function HomeFirstBanner({homeData}){
  return (
    <div>
        <div className="first_banner desktop_view" style={{ backgroundImage: `url(${homeData?.store?.banner_image})` }}>          
            <div className="inside_banner_content">
            <h2>{homeData?.store?.header}</h2>
            <div dangerouslySetInnerHTML={{__html: homeData?.store?.description}}/>
            <Link to="/locate-our-store"><button className="locate">locate a store</button></Link>
            </div>
            <div className="inside_banner_image">
            {/* <img src={homeData?.store?.banner_image} alt="" className="inside_banner_img" loading="lazy"/>           */}
            </div>
        </div>
        <div className="first_banner mobile_view" style={{ backgroundImage: `url(${homeData?.store?.banner_image})` }}>
            <div className="inside_banner_content">
            <h2>{homeData?.store?.header}</h2>
            <div dangerouslySetInnerHTML={{__html: homeData?.store?.description}}/>          
            </div>        
        </div>
    </div>
  )
}
