import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import bsrightArrow from '../../public/icons/right_arrow.webp';
import rightArrow from '../../public/icons/right-arrow.webp';
import leftArrow from '../../public/icons/left-arrow.webp';

    const blogPopularPosts = [
    { id: 1, img: "/blogs/blogs8.png", title: "The Benefits of Upgrading to a One Piece Toilet in Your Home", desc: "Bathroom faucets play a pivotal role in the overall design and functionality of your bathroom." },
    { id: 2, img: "blogs/blogs9.png", title: "10 Reasons Why Sensor Faucets Are the Future of Modern Bathrooms", desc: "Transforming your bathroom into a stylish and functional space starts with choosing the right faucet finish. Whether you want the timeless appeal of chrome" },
    { id: 3, img: "blogs/blogs4.jpeg",title: "Luxury Bathroom Accessories Your Guests Will Want for Themselves", desc: "The timeless charm of gold has symbolized wealth, power, and luxury throughout history. In interior design, gold evokes a sense of sophistication."  },
    { id: 4, img: "blogs/blogs5.png", title: "Top 3 Kitchen Faucets Types That Deliver Excellence, Performance, Durability, and Style", desc: "A kitchen faucet is more than just a functional fixture; it is a central element that enhances the aesthetics and efficiency of your kitchen." },
    { id: 5, img: "blogs/blogs6.jpg", title: "Drips, Leaks, and Sputters: Easy Fixes for Common Faucet Problems", desc: "Faucets are essential fixtures in any home, providing access to clean water for cooking, cleaning, and personal hygiene."},
    { id: 6, img: "blogs/blogs7.jpeg", title: "Small Space and Big Style: Space-Saving Bathroom Storage Solutions – Vanities vs. Cabinets", desc: "FWhen it comes to bathroom storage, maximising space is essential, especially when it pertains to a smaller bathroom space."},
  ];

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

export const Blogs = () => {

    const swiperRefBlog1 = useRef(null);
    const swiperRefBlog2 = useRef(null);
    const handleNextBlogSlide1 = () => {
        if (swiperRefBlog1.current) {
        swiperRefBlog1.current.slideNext();
        }
    };
    const handlePrevBlogSlide1 = () => {
        if (swiperRefBlog1.current) {
        swiperRefBlog1.current.slidePrev();
        }
    };
    const handleNextBlogSlide2 = () => {
        if (swiperRefBlog2.current) {
        swiperRefBlog2.current.slideNext();
        }
    };
    const handlePrevBlogSlide2 = () => {
        if (swiperRefBlog2.current) {
        swiperRefBlog2.current.slidePrev();
        }
    };

    const [popularPost, setPopularPost] = useState([]);
    const [LatestPost, setLatestPost] = useState([]);
    const baseUrl = import.meta.env.VITE_API_BASEURL;
    useEffect(()=>{
        const fetchData = async () => {
            try{        
                const response = await axios.get(baseUrl+'/api/blogs', { headers: { 'Content-Type': 'application/json' } });                                                           
                const pp = response.data.data.filter(obj => obj.is_popular == true);
                const lp = response.data.data.filter(obj => obj.is_popular == false);


                
                setLatestPost(lp);
                setPopularPost(pp);            
            }catch(err){
                console.log(err)
            }
        }

        fetchData()
    }, [])

  return (
    <main className="blogPage">
        <div className="banner">
            <div className="black-filter"></div>
            <div className="banner_content">
                <div className="text">

                <h2 className="banner_title">Blog</h2>
                <p>Explore our Blogs to get insights into the world where desires take shape.</p>
                </div>
            </div>
        </div>

        <div className="latest_post">
        <div className="content">

        <h2 className="blog_title">Latest Posts</h2>
        <p>Stay updated with tech innovation, product launches, and event showcases to know  how Kerovit continues to evolve bathrooms.</p>
        </div>
        <div className="swiper_action_button view_on_desktop">
            <button type="button" className="swip_button" onClick={handleNextBlogSlide1}>                
                <img src={rightArrow} alt="right-arrow" className="right_arrow swip_button_icon"/>
            </button>            
            <button type="button" className="swip_button" onClick={handlePrevBlogSlide1}>                
                <img src={leftArrow} alt="right-arrow" className="right_arrow swip_button_icon"/>
            </button>
        </div> 
        <Swiper
            modules={[Pagination]}
            spaceBetween={25}
            slidesPerView={1}
            pagination={{ clickable: true }}
            breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            }}
            onSwiper={(swiper) => (swiperRefBlog1.current = swiper)}
        >
            {LatestPost.map((blog) => (
            <SwiperSlide key={blog.id}>
                <div className="inside text-left">
                    <Link to={`/blog/${blog.title.split(" ").join("_")}`}>
                        <img src={blog.banner_image} alt="blogImg" className="swiperImg" />
                    </Link>
                    <p className="blog-date">{formatDate(blog.published_date)} <span className="space"></span> | <span className="space"></span> By Kerovit</p>
                    <h3>{blog.title}</h3>                
                </div>
            </SwiperSlide>
            ))}
        </Swiper>

        {/* <button type="button" onClick={handleNextBlogSlide1}>
            Swipe <img src={bsrightArrow} alt="right-icon" className="right_arrow"/>      
        </button> */}
        <Link to = "/blog/latestPost">
        <button type="button">
            More Blogs 
            <img src={bsrightArrow} alt="right-icon" className="right_arrow"/>            
        </button> 
        </Link>
        
        </div>

        <div className="latest_post">
        <h2 className="blog_title">Popular Posts</h2>
        <p>Catch up on the stories, ideas, insights, and inspiration that our readers can’t get enough of.</p>
        <div className="swiper_action_button view_on_desktop">
            <button type="button" className="swip_button" onClick={handleNextBlogSlide2}>
                <img src={rightArrow} alt="right-arrow" className="right_arrow swip_button_icon"/>                
            </button>            
            <button type="button" className="swip_button" onClick={handlePrevBlogSlide2}>                
                <img src={leftArrow} alt="right-arrow" className="right_arrow swip_button_icon"/>
            </button>
        </div> 

        <Swiper
            modules={[Pagination]}
            spaceBetween={25}
            slidesPerView={1}
            pagination={{ clickable: true }}
            breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            }}
            onSwiper={(swiper) => (swiperRefBlog2.current = swiper)}
        >
            {popularPost.map((blog) => (
            <SwiperSlide key={blog.id}>
                <div className="inside text-left">
                    <Link to={`/blog/${blog.title.split(" ").join("_")}`}>
                        <img src={blog.banner_image} alt="blogImg" className="swiperImg" />
                    </Link>
                    <p className="blog-date">{formatDate(blog.published_date)} <span className="space"></span> | <span className="space"></span> By Kerovit</p>
                    <h3>{blog.title}</h3>                
                </div>
            </SwiperSlide>
            ))}
        </Swiper>

        {/* <button type="button" onClick={handleNextBlogSlide2}>
            Swipe <img src={bsrightArrow} alt="right-icon" className="right_arrow"/>      
        </button> */}
        <Link to = "/blog/popularPost">

        <button type="button">
            More Blogs <img src={bsrightArrow} alt="right-icon" className="right_arrow"/>      
        </button>
        </Link>


        </div>
    </main>
  )
}
