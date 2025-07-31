import { Link } from "react-router-dom";
import { useState } from "react";

export const ProductCard = ({productArr=[], series, product}) => {

    const [loadedImg, setLoadedImg] = useState([]);
    function handleloadedImage(index){
        setLoadedImg((prev) => [...prev, index]);        
    }    

  return (
    <>
        {
            productArr.map((item, index)=>(
                <div key={index} className="product_card">                                                                           
                    <Link 
                        to={`/collection/${series}/${product}/${item.name.toLowerCase()}`}
                        state={{ rangeId: item.id }}
                        className={loadedImg.includes(index + item.id) ? 'show-img':'hide'}
                    >
                        <img 
                            src={item.thumbnail == null ? '/no-image.jpg' : item.thumbnail} 
                            alt="image" 
                            onLoad={()=>handleloadedImage(index+item.id)}
                        />                                        
                    </Link>
                    <div className={`loader ${loadedImg.includes(index + item.id) ? 'hide':'show-ld'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><radialGradient id="a9" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stopColor="#0B62DA"></stop><stop offset=".3" stopColor="#0B62DA" stopOpacity=".9"></stop><stop offset=".6" stopColor="#0B62DA" stopOpacity=".6"></stop><stop offset=".8" stopColor="#0B62DA" stopOpacity=".3"></stop><stop offset="1" stopColor="#0B62DA" stopOpacity="0"></stop></radialGradient><circle transformOrigin="center" fill="none" stroke="url(#a9)" strokeWidth="15" strokeLinecap="round" strokeDasharray="200 1000" strokeDashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle transformOrigin="center" fill="none" opacity=".2" stroke="#0B62DA" strokeWidth="15" strokeLinecap="round" cx="100" cy="100" r="70"></circle></svg>
                    </div>                            
                    <p>{item.name}</p>                    
                </div>
            ))
        }
    </>
  )
}
