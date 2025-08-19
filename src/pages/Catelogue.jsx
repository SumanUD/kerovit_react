import { useState, useEffect } from "react";
import axios from "axios";

export const Catelogue = () => {

  const catelogueURL = import.meta.env.VITE_API_CATALOGUE;  
  const [catelogueData, setCatelogueData] = useState({})
  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(catelogueURL , {
          headers: {
            'Authorization': `Bearer gVSYUDhjLSXMDZSpVdPCiz9s`, // Replace with your actual API key
            'Content-Type': 'application/json', // Set content type if required
          },
        });
        setCatelogueData(res.data.data)
      } catch (err) {
        console.error('Error:', err.message);
      }
    }

    getData();
  }, []);

  return (
    <div className="catalogueSingle">
      <div className="second_banner desktop_view">
        <div className="inside_banner_content">
          {/* <h2>the catalogue</h2> */}
          <img src="./catalogue/year.png" alt="" />

          <p>Browse our latest catalogue and discover the perfect bathroom solutions for your home.</p>
        </div>
        <div className="catalogue">
          {            
            catelogueData?.categories?.map((item, index)=>(
              <div className="the_catelogue" key={index}>                
                <a href={item.pdf_link} target="_blank">
                  <img src={item.thumbnail_image} alt="" loading="lazy" />
                </a>                                   
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
