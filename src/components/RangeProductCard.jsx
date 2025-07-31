import { Link } from "react-router-dom";
import { act, useEffect, useState } from "react";

export const RangeProductCard = ({item, series, product, variation, rangeId, index}) => {

    const [loadedImg, setLoadedImg] = useState([]);
    function handleloadedImage(index){
        setLoadedImg((prev) => [...prev, index]);        
    }  

    const [allVariants, setVariants] = useState([])
    const [activeVariant, setActiveVariant] = useState("");
    const [activeImage, setActiveImage] = useState("");
    useEffect(()=>{        
        const { variants, ...rest } = item;
        const newVariants = [rest, ...item.variants]
        setVariants(newVariants) 
        setActiveVariant(newVariants[0].product_code)
        setActiveImage(newVariants[0].product_picture)
    }, [])
    
    const handleVariants = (id, image) =>{
        setActiveVariant(id)
        setActiveImage(image)
    }
  return (
    <div className="product_card">     
        <div className="image-group">
            {
            item.variants.length > 0 ? 
            <>
                {
                    allVariants.map((variant, index)=>(
                        <span 
                            key={index} 
                            style={{background:variant.product_color_code}} 
                            onClick={()=>handleVariants(variant.product_code, variant.product_picture)}
                            className={activeVariant == variant.product_code ? 'active_variant' : ''}
                        />
                    ))
                }
            </>:
            <>
                <span />
                <span />
                <span />
                <span />
                <span />
            </>
            }
        </div>                                             
        <Link 
            to={`/collection/${series}/${product}/${variation}/${item.product_code}`}
            state={{ range:rangeId }}
            className={loadedImg.includes(index+item.id) ? 'show-img':'hide'}
        >
            {activeImage && (
                <img 
                    src={activeImage} 
                    alt="image" 
                    onLoad={() => handleloadedImage(index + item.id)} 
                />
            )}               
        </Link>                          
        <div className={`loader ${loadedImg.includes(index + item.id) ? 'hide':'show-ld'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><radialGradient id="a9" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stopColor="#0B62DA"></stop><stop offset=".3" stopColor="#0B62DA" stopOpacity=".9"></stop><stop offset=".6" stopColor="#0B62DA" stopOpacity=".6"></stop><stop offset=".8" stopColor="#0B62DA" stopOpacity=".3"></stop><stop offset="1" stopColor="#0B62DA" stopOpacity="0"></stop></radialGradient><circle transformOrigin="center" fill="none" stroke="url(#a9)" strokeWidth="15" strokeLinecap="round" strokeDasharray="200 1000" strokeDashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle transformOrigin="center" fill="none" opacity=".2" stroke="#0B62DA" strokeWidth="15" strokeLinecap="round" cx="100" cy="100" r="70"></circle></svg>
        </div> 
        <p>{variation.split("_").join(" ").toUpperCase()}</p>
        <p>Model No: {item.product_code}</p>    
        <p className="product_description">{item.product_description}</p>          
    </div>   
  )
}
