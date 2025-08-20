import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import { Fragment } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { RangeProductCard } from "../components/RangeProductCard";

export const ProductVariationListing = () => {

  const {series, product, variation} = useParams();  

  const baseURL = import.meta.env.VITE_API_BASEURL;     
  const [loadSimulate, setLoadSimulate] = useState(true);
  const [rangeDescription, setRangeDescription] = useState('');

  const location = useLocation();
  const rangeId = location.state.rangeId;
  const [allProducts, setAllProducts] = useState([]);
  
  useEffect(()=>{
    const fetchData = async () => {
      try{        
        const response = await axios.get(baseURL+`/api/ranges/${rangeId}/products`, { headers: { 'Content-Type': 'application/json' } });               
        setAllProducts(response.data.range.products)    
        setRangeDescription(response.data.range.description)      
      }catch(err){
        console.log(err)
      }finally{        
        setLoadSimulate(false)        
      }
    }

    fetchData()
  },[])    
    

  return (
    <main className={`allProductMain ${series == 'aurum' ? 'background-dark' : 'background-light'}`}>      
      {
        !loadSimulate ?
        <Fragment>
          <div className="prod_details">
            <h2>{variation.split("_").join(" ").toUpperCase()}</h2>
            <p>{rangeDescription}</p>
          </div>
          <div className="product_grid">
            {allProducts.map((item, index) => (
              <RangeProductCard key={index} item={item} series={series} product={product} variation={variation} rangeId={rangeId} index={index}/>
            ))}
          </div>

        </Fragment>: 
        <div className="productListing skeleton-load">
          <div className="loading-heading"></div>
          <div className="loading-line-group">
              <div className="loading-line"></div>
              <div className="loading-line"></div>                    
          </div>
          <div className="grid-loading-container">
              <div className="loading-box"></div>
              <div className="loading-box"></div>
              <div className="loading-box"></div>
              <div className="loading-box"></div>  
          </div>              
      </div>
      }
    </main>
  )
}
