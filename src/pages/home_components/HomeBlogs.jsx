import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef } from "react";

import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";

import { Link } from "react-router-dom";

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

import blogHeading from '../../../public/home_blog_heading.png'

export default function HomeBlogs({LatestPost}){

    const swiperRefBlog = useRef(null);
    const handlePrevBlogSlide = () => {
        if (swiperRefBlog.current) {
            swiperRefBlog.current.slidePrev();
        }
    }
    const handleNextBlogSlide = () => {
        if (swiperRefBlog.current) {
            swiperRefBlog.current.slideNext();
        }
    };

  return (
    <div className="home_blog">
        <div className="home_blog_top_heading">
            <img src={blogHeading} alt="" className="home_blog_heading" loading="lazy"/>
            <p>Explore our Blog and witness a world where desires take shape.</p>
        </div>
        <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            }}
            onSwiper={(swiper) => (swiperRefBlog.current = swiper)} // Assign Swiper instance
        >
        {LatestPost.slice(0, 9).map((blog) => (
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

        <div className="blog-swiper-button view_on_desktop">
            <button type="button" className="swip_button" onClick={handlePrevBlogSlide}><FaChevronLeft className="right_arrow swip_button_icon"/></button>
            <button type="button" className="swip_button" onClick={handleNextBlogSlide}><FaChevronRight className="right_arrow swip_button_icon"/></button>
        </div>
        <button type="button" className="view_on_mobile" onClick={handleNextBlogSlide}>Swipe<BsArrowRight className="right_arrow "/></button>
        <Link to={'/blog'}>
            <button className="btn-primary">All Blogs</button>
        </Link>
    </div>
  )
}
