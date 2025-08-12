import React, { useState, useEffect } from "react";
import axios from "axios";
import HomeBannerVid from '../../public/videos/keroHero.webm';
import { HomeForm } from "./home_components/HomeForm";
import HomeCategories from "./home_components/HomeCategories";
import HomeCollections from "./home_components/HomeCollections";
import HomeFirstBanner from "./home_components/HomeFirstBanner";
import HomeSecondBanner from "./home_components/HomeSecondBanner";
import HomeAbout from "./home_components/HomeAbout";
import HomeBlogs from "./home_components/HomeBlogs";


const nameMap = {
  accessories: "Accessories",
  basin: "Basin",
  faucet: "Faucets",
  furniture: "Bathroom Furniture",
  showers: "Showers",
  toilet: "Toilet",
};


export const Home = () => {  

  const homeURL = import.meta.env.VITE_API_HOME;  
  
  const baseUrl = import.meta.env.VITE_API_BASEURL;
  const [homeData, setHomeData] = useState({})
  const [collectionSlide, setCollectionSlide] = useState({})
  const [LatestPost, setLatestPost] = useState([]);
  useEffect(() => {
    async function getData() {
      try {        
        const res = await axios.get(homeURL , {
          headers: {
            'Authorization': `Bearer gVSYUDhjLSXMDZSpVdPCiz9s`, // Replace with your actual API key
            'Content-Type': 'application/json', // Set content type if required
          },
        });
        const response = await axios.get(baseUrl+'/api/blogs', { headers: { 'Content-Type': 'application/json' } });
        setLatestPost(response.data.data)    
        setHomeData(res.data.data)
        const cateImages = res.data.data.categories_images
        const products = Object.keys(cateImages).map((key, index) => ({
          id: index + 1,
          img: cateImages[key],
          name: nameMap[key],
          link: `/category/${key}`,
          icon: `./icons/${key}.png`,
        }));                
        setCollectionSlide([...products, {}])        
      } catch (err) {
        console.error('Error:', err.message);
      }
    }

    getData();
  }, []);


  const [show, setShow] = useState(true)  
  const functionOnVideoLoad = () =>{
    setTimeout(() => {
      setShow(false)    
    }, 2000);
  }

  return (
    <div>       
      <main className="home">        
        <div className="homebanner">
          <video 
            src={HomeBannerVid} autoPlay loop muted
            onLoadedData={()=> functionOnVideoLoad()}                             
          ></video>
        </div>        
        <HomeCategories collectionSlide={collectionSlide} homeData={homeData}/>      
        <HomeCollections homeData={homeData}/>                                
        <HomeFirstBanner homeData={homeData} />                
        <HomeSecondBanner/>                        
        <HomeAbout homeData={homeData}/>      
        <HomeBlogs LatestPost={LatestPost}/>

        <HomeForm/>
      </main>
    </div>    
  )
}
