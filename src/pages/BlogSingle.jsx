import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


    function formatDate(dateString) {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const date = new Date(dateString);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        // Add ordinal suffix (st, nd, rd, th)
        const ordinal = (n) => {
            if (n > 3 && n < 21) return "th"; // 4th-20th
            switch (n % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
            }
        };

        return `${day}${ordinal(day)} ${month} ${year}`;
    }

export const BlogSingle = () => {

    const {blog} = useParams();
    const [singleBlog, setSingleBlog] = useState([])
    const baseUrl = import.meta.env.VITE_API_BASEURL;
    useEffect(()=>{
        const fetchData = async () =>{
            try{
                const response = await axios.get(baseUrl+'/api/blogs', { headers: { 'Content-Type': 'application/json' } });                                                           
                const findBlog = response.data.data.find(obj=>obj.title == blog.split("_").join(" "));                
                setSingleBlog(findBlog)
            }catch(err){
                console.log(err)
            }
        }

        fetchData()
    },[])


  return (
    <div className="single-blog">
        <div className="banner">
            <img src={singleBlog.banner_image} alt="" />
        </div>        
        <div className="blog-contents">
            <h1 className="title">{singleBlog.title}</h1>
            <p className="date">{formatDate(singleBlog.published_date)} <span className="space"></span> | <span className="space"> By Kerovit</span></p>
            <div className="blog-text-content" dangerouslySetInnerHTML={{ __html: singleBlog.description }}/>
        </div>
    </div>
  )
}
