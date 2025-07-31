import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export const Career = () => {

    const [careerData, setCareerData] = useState({})
    const careerURL = import.meta.env.VITE_API_CAREER;  
    useEffect(() => {
        async function getData() {
            try {
                const res = await axios.get(careerURL , {
                headers: {
                    'Authorization': `Bearer gVSYUDhjLSXMDZSpVdPCiz9s`, // Replace with your actual API key
                    'Content-Type': 'application/json', // Set content type if required
                },
                });
                setCareerData(res.data.data)        
            } catch (err) {
                console.error('Error:', err.message);
            }
        }

        getData();
    }, []);


  return (
    <main className="career">
    <div className="homebanner" style={{backgroundImage: `url(${careerData.banner_image})`}}>
        <div className="bannerText">
            <p>Welcome</p>
            <p>to the <b>Kerovit</b></p>
            <p><b>team</b></p>
        </div>
        <div className="whatsapp-icon">
            <FaWhatsapp/>
        </div>
    </div>

    <div className="carrerText">
        <div dangerouslySetInnerHTML={{ __html: careerData.banner_description }}/>
    </div>

    <div className="belowbanner hide_on_desktop" style={{backgroundImage: `url(${careerData.below_image})`}}>
        <div className="belowBannerText">
            <img src="/career/belowBannerText.png" alt="belowBannerText" />
            <p>Send us your resume at</p>
            <Link to={careerData.apply_link} target="_blank">
                <div className="btn-primary">New Openings</div>
            </Link>
        </div>
    </div>

    <div className="below-banner-desktop" style={{backgroundImage: `url(${careerData.below_image})`}}>
        <div className="belowbanner">
            <div className="belowBannerText">
                <img src="/career/belowBannerText.png" alt="belowBannerText" />
                <p>Send us your resume at</p>                
                <Link to={careerData.apply_link} target="_blank">
                    <div className="btn-primary">New Openings</div>
                </Link>
            </div>
        </div>

    </div>

</main>
  )
}
