import axios from 'axios';
import { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard';

export const ProductListing = () => {   
    
    const {product, series} = useParams();    
    const [loadSimulate, setLoadSimulate] = useState(true);   
    const [allRanges, setAllRanges] = useState([])

    const rangeURL = import.meta.env.VITE_API_RANGE; 
    useEffect(()=>{    
        const fetchData = async () => {
            try {
                const response = await axios.get(rangeURL, { headers: { 'Content-Type': 'application/json' }})                
                const filterWithCollection = response.data.data.find(obj => obj.name.toLowerCase() == series);
                const filterWithCategory = filterWithCollection.categories.find(obj => obj.name.toLowerCase() == product)                
                setAllRanges(filterWithCategory.ranges)                   

            }catch(err){
                console.log(err)
            }finally{
                setLoadSimulate(false)                
            }
        }

        fetchData();
    },[])        

  return (
    <main className={`allProductMain ${series == 'aurum' ? 'background-dark' : 'background-light'}`}>    
        {
            !loadSimulate ? 
            <Fragment>
                <div className="prod_details">
                    <h2>{product.split("_").join(" ").toUpperCase()}</h2>
                    <p>
                        Designed with a skillful unification of creativity and engineering.
                        Kerovit has combined unmatched functional expertise with a promise
                        of excellence, giving customers an alluring experience they desire!
                    </p>
                </div>
                <div className="product_grid">
                    <ProductCard productArr={allRanges} series={series} product={product}/>                                                       
                </div>

            </Fragment> : 
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
