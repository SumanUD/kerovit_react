import { Link } from "react-router-dom";

import AboutHeading from '../../../public/aboutus_heading.png';

export default function HomeAbout({homeData}){

  console.log(homeData)

  return (
    <>
        <div className="home_aboutus desktop_view">
          <video src={homeData?.about_us?.video} muted loop autoPlay width={1400} height={600}></video>
          <div className="inside_banner_content">
            {/* <h2>about us</h2> */}          
            <img src={AboutHeading} alt="" className="aboutus_heading" loading="lazy"/>                    
            <div dangerouslySetInnerHTML={{__html: homeData?.about_us?.description}}/>        
            <Link to="/about">
              <button className="read_more">
                read more 
              </button>
              </Link>
          </div>
        </div>

        <div className="home_aboutus mobile_view">
          <video src={homeData?.about_us?.video} muted loop autoPlay></video>
          <div className="inside_banner_content">
            {/* <h2>about us</h2> */}
            <img src={AboutHeading} alt="" className="aboutus_heading" loading="lazy"/>
            <div dangerouslySetInnerHTML={{__html: homeData?.about_us?.description}}/>        
            <Link to="/about">
              <button className="read_more">
                read more 
              </button>
              </Link>
          </div>
        </div>
    </>
  )
}
