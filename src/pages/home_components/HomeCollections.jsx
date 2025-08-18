import { Link } from "react-router-dom";
import rightArrow from '../../../public/icons/right_arrow.webp';

export default function HomeCollections({homeData }){
  return (
    <>
      <div className="home_collections">
        <h2>Collections</h2>        
        <div dangerouslySetInnerHTML={{__html: homeData?.collections?.description}}/>
      </div>
      <div className="aurum-klassic-row">
          <div className="vertical-line"></div>
          <div className="home_aurum">
              <div className="title-container">            
              <img src="aurum_heading.png" alt="" className="aurum_heading" loading="lazy"/>
              <img src="/aurum_A.png" alt="A icon" className="aurum-icon"  loading="lazy"/>
              </div>          
              <div dangerouslySetInnerHTML={{__html: homeData?.collections?.aurum?.description}}/>
              <div className="img-container">            
              <img src={homeData?.collections?.aurum?.image} alt="A icon" loading="lazy"/>

              <button type="button" className="desktop-card-button">
                  <Link to="/collection/aurum" className="showMoreBtn">Show More <img src={rightArrow} alt="right-icon" className="right_arrow" /></Link>
              </button>
              </div>
              <button type="button">
              <Link to="/collection/aurum" className="showMoreBtn">Show More <img src={rightArrow} alt="right-icon" className="right_arrow" /></Link>
              </button>
          </div>
          <div className="home_klassic">
              <div className="title-container">            
              <img src="klassic_heading.png" alt="" className="klassic_heading" loading="lazy"/>
              <img src="/klassic_K.png" alt="K icon" className="klassic-icon"  loading="lazy"/>
              </div>                  
              <div dangerouslySetInnerHTML={{__html: homeData?.collections?.klassic?.description}}/>
              <div className="img-container">
              <img  src={homeData?.collections?.klassic?.image} alt="Single Product image"  loading="lazy"/>

              <button type="button" className="desktop-card-button">
                  <Link to="/collection/klassic" className="showMoreBtn">Show More <img src={rightArrow} alt="right-icon" className="right_arrow" /></Link>
              </button>
              </div>
              <button type="button">
              <Link to="/collection/klassic" className="showMoreBtn">Show More <img src={rightArrow} alt="right-icon" className="right_arrow" /></Link>
              </button>
          </div>
      </div>
    </>
  )
}
