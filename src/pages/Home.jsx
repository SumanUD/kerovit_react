import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import axios from "axios";


import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { Loader } from "../components/Loader";


const nameMap = {
  accessories: "Accessories",
  basin: "Basin",
  faucet: "Faucets",
  furniture: "Bathroom Furniture",
  showers: "Showers",
  toilet: "Toilet",
};

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

export const Home = () => {

  const swiperRef = useRef(null);

  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  }
  const handlePrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  }

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

  const swiperHomeRef = useRef(null);
  const handlePrevHomeSlide = () =>{
    if(swiperHomeRef.current){
      swiperHomeRef.current.slidePrev()
    }
  }
  const handleNextHomeSlide = () =>{
    if(swiperHomeRef.current){
      swiperHomeRef.current.slideNext()
    }
  }

  //swiper category
  const [activeIndex, setActiveIndex] = useState(0);
  const handleTextClick = (index) => {
    setActiveIndex(index);
    if (swiperRef.current) {
      swiperRef.current.slideTo(index); // Use the Swiper instance to navigate
    }
  };

  const homeURL = import.meta.env.VITE_API_HOME;  
  const catelogueURL = import.meta.env.VITE_API_CATALOGUE;  
  const baseUrl = import.meta.env.VITE_API_BASEURL;
  const [homeData, setHomeData] = useState({})
  const [catelogueData, setCatelogueData] = useState({})
  const [collectionSlide, setCollectionSlide] = useState({})
  const [LatestPost, setLatestPost] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        const res2 = await axios.get(catelogueURL , {
          headers: {
            'Authorization': `Bearer gVSYUDhjLSXMDZSpVdPCiz9s`, // Replace with your actual API key
            'Content-Type': 'application/json', // Set content type if required
          },
        });
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
        setCatelogueData(res2.data.data)
      } catch (err) {
        console.error('Error:', err.message);
      }
    }

    getData();
  }, []);


  const [success, setSuccess] = useState('')
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [numError, setError]= useState('')
  const [btnLoading, setBtnLoading] = useState(false)
  const [apiError, setApiError] = useState({})
  const generateNumber = () =>{
    setNum1(Math.floor(Math.random() * 100) + 1);
    setNum2(Math.floor(Math.random() * 100) + 1);
  }
  useEffect(()=>{
    generateNumber()
  },[])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    state: '',
    city: '',
    message: '',  
  })
  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  function handleSubmit(e){
    e.preventDefault()            
    setSuccess("")  
    setApiError({})
    async function submitForm(){
      try{
        const res = await axios.post(baseUrl+'/api/contact', formData , {
          headers: {
            'Content-Type': 'application/json',
          },
        });        
        generateNumber()             
        e.target.check_human.value = ''
        setSuccess(res.data.message)               
        setFormData({
          name: '',
          email: '',
          phone: '',
          state: '',
          city: '',
          message: '', 
        })
        setSuccess("✅ Message sent successfully!")     
      }catch(err){
        console.log(err.response)
        setApiError(err.response.data.errors)
        setSuccess("❌ Failed to send message!") 
      }finally{
        setBtnLoading(false)        
      }
    }

    if(e.target.check_human.value == (num1 + num2)){
      setBtnLoading(true)
      submitForm()
      setError('')             
    }else{
      setError('Incorrect!!!')      
    }    
  }   

  const [show, setShow] = useState(true)  
  const functionOnVideoLoad = () =>{
    setShow(false)    
  }

  return (
    <>
      <Loader showLoader={show}/>      
      <main className="home">
        <div className="homebanner">
          <Swiper
            loop={homeData?.banner_videos?.length > 1}          
            onSwiper={(swiper) => (swiperHomeRef.current = swiper)} // Assign Swiper instance
          >
            {
              homeData?.banner_videos?.map((item, index)=>(
                <SwiperSlide key={index}>
                  <video 
                    src={item} autoPlay loop muted
                    onLoadedData={functionOnVideoLoad}                  
                  ></video>        
                </SwiperSlide>          
              ))
            }
          </Swiper>

          {homeData?.banner_videos?.length > 1 && 
            <>
              <div className="action-button home-prev" onClick={handlePrevHomeSlide}><FaChevronLeft/></div>
              <div className="action-button home-next" onClick={handleNextHomeSlide}><FaChevronRight/></div>
            </>
          }
        </div>

        <div className="home_categories">
          {/* <h2>Categories</h2> */}
          <img src="categories_heading.png" alt="" className="categories_heading" loading="lazy"/>
          <div dangerouslySetInnerHTML={{ __html: homeData.categories_description }}/>

          <div className="categories-slide">
            <div className="category-option">
              {/* <div className="heading">CATEGORIES</div> */}
              {
                Array.isArray(collectionSlide) && collectionSlide.map((item, index)=>(
                  <div className={`option ${activeIndex === index ? 'category-active': ''}`} onClick={() => handleTextClick(index)} key={index}><img src= {item.icon} alt="catalogue" className="categoryNameIcon" loading="lazy"/>{item.name}</div>
                ))
              }
            </div>
            <Swiper
              modules={[Pagination]}
              spaceBetween={10}
              slidesPerView={2}
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1023: { slidesPerView: 1.5 },                
                1440: { slidesPerView: 2.5 },
              }}              
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            >
              {Array.isArray(collectionSlide) && collectionSlide.map((product) => (
                <SwiperSlide key={product.id}>
                  <div className="inside text-center">
                    <Link to={product.link}><img src={product.img} alt={product.name} loading="lazy"/></Link>
                    <div className="background-layer"></div>
                    <div className="pop-on-hover">
                      <p>{product.name}</p>
                      <Link to={product.link}>
                        <button type="button" className="showMoreBtn">Show More <BsArrowRight className="right_arrow"/></button>
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="swiper_action_button view_on_desktop">
            <button type="button" className="swip_button" onClick={handlePrevSlide}><FaChevronLeft className="right_arrow swip_button_icon"/></button>
            <button type="button" className="swip_button" onClick={handleNextSlide}><FaChevronRight className="right_arrow swip_button_icon"/></button>            
          </div>          
          <button type="button" className="view_on_mobile" onClick={handleNextSlide}>Swipe <BsArrowRight className="right_arrow"/></button>
        </div>

        <div className="home_collections">
          <h2>Collections</h2>        
          <div dangerouslySetInnerHTML={{__html: homeData?.collections?.description}}/>
        </div>

        <div className="aurum-klassic-row">
          <div className="vertical-line"></div>
          <div className="home_aurum">
            <div className="title-container">            
              <img src="aurum_heading.png" alt="" className="aurum_heading" loading="lazy"/>
              <img src="/aurum_A.png" alt="A icon" className="aurum-icon"  loading="lazy"/>
            </div>          
            <div dangerouslySetInnerHTML={{__html: homeData?.collections?.aurum?.description}}/>
            <div className="img-container">            
              <img src={homeData?.collections?.aurum?.image} alt="A icon" loading="lazy"/>

              <button type="button" className="desktop-card-button">
                <Link to="/collection/aurum" className="showMoreBtn">Show More <BsArrowRight className="right_arrow"/></Link>
              </button>
            </div>
            <button type="button">
              <Link to="/collection/aurum" className="showMoreBtn">Show More <BsArrowRight className="right_arrow"/></Link>
            </button>
          </div>
          <div className="home_klassic">
            <div className="title-container">            
              <img src="klassic_heading.png" alt="" className="klassic_heading" loading="lazy"/>
              <img src="/klassic_K.png" alt="K icon" className="klassic-icon"  loading="lazy"/>
            </div>                  
            <div dangerouslySetInnerHTML={{__html: homeData?.collections?.klassic?.description}}/>
            <div className="img-container">
              <img  src={homeData?.collections?.klassic?.image} alt="Single Product image"  loading="lazy"/>

              <button type="button" className="desktop-card-button">
                <Link to="/collection/klassic" className="showMoreBtn">Show More <BsArrowRight className="right_arrow"/></Link>
              </button>
            </div>
            <button type="button">
              <Link to="/collection/klassic" className="showMoreBtn">Show More <BsArrowRight className="right_arrow"/></Link>
            </button>
          </div>
        </div>

        <div className="first_banner desktop_view" style={{ backgroundImage: `url(${homeData?.store?.banner_image})` }}>          
          <div className="inside_banner_content">
            <h2>{homeData?.store?.header}</h2>
            <div dangerouslySetInnerHTML={{__html: homeData?.store?.description}}/>
            <Link to="/locate-our-store"><button className="locate">locate a store</button></Link>
          </div>
          <div className="inside_banner_image">
            {/* <img src={homeData?.store?.banner_image} alt="" className="inside_banner_img" loading="lazy"/>           */}
          </div>
        </div>
        <div className="first_banner mobile_view" style={{ backgroundImage: `url(${homeData?.store?.banner_image})` }}>
          <div className="inside_banner_content">
            <h2>{homeData?.store?.header}</h2>
            <div dangerouslySetInnerHTML={{__html: homeData?.store?.description}}/>          
          </div>        
        </div>

        <div className="second_banner mobile_view">
          <div className="inside_banner_content">
            <h2>the catalogue</h2>
            <p>Browse our latest catalogue and discover the perfect bathroom solutions for your home.</p>
            {/* <button className="locate">locate a store</button> */}
          </div>
          <div className="catalogue">          
            {            
              catelogueData?.categories?.map((item, index)=>(
                <div className="the_catelogue" key={index}>
                  <img src={item.thumbnail_image} alt="" loading="lazy" />
                  <a href={item.pdf_link} target="_blank">{item.title}</a>
                </div>
              ))
            }

          </div>
        </div>
        <div className="second_banner desktop_view">
          <div className="inside_banner_content">
            <h2>the catalogue</h2>
            <p>Browse our latest catalogue and discover the perfect bathroom solutions for your home.</p>            
          </div>
          <div className="catalogue">
            {            
              catelogueData?.categories?.map((item, index)=>(
                <div className="the_catelogue" key={index}>
                  <img src={item.thumbnail_image} alt="" loading="lazy" />
                  <a href={item.pdf_link} target="_blank">{item.title}</a>
                </div>
              ))
            }
          </div>
        </div>

        <div className="home_aboutus desktop_view">
          <video src={homeData?.about_us?.video} muted loop autoPlay></video>
          <div className="inside_banner_content">
            {/* <h2>about us</h2> */}          
            <img src="aboutus_heading.png" alt="" className="aboutus_heading" loading="lazy"/>                    
            <div dangerouslySetInnerHTML={{__html: homeData?.store?.description}}/>        
            <Link to="/about">
              <button className="read_more">
                read more 
              </button>
              </Link>
          </div>
        </div>

        <div className="home_aboutus mobile_view">
          <video src={homeData?.about_us?.video} muted loop autoPlay></video>
          <div className="inside_banner_content">
            {/* <h2>about us</h2> */}
            <img src="aboutus_heading.png" alt="" className="aboutus_heading" loading="lazy"/>
            <div dangerouslySetInnerHTML={{__html: homeData?.store?.description}}/>        
            <Link to="/about">
              <button className="read_more">
                read more 
              </button>
              </Link>
          </div>
        </div>

        <div className="home_blog">
          <div className="home_blog_top_heading">
            <img src="home_blog_heading.png" alt="" className="home_blog_heading" loading="lazy"/>
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

          <div className="blog-swiper-button view_on_desktop">
            <button type="button" className="swip_button" onClick={handlePrevBlogSlide}><FaChevronLeft className="right_arrow swip_button_icon"/></button>
            <button type="button" className="swip_button" onClick={handleNextBlogSlide}><FaChevronRight className="right_arrow swip_button_icon"/></button>
          </div>
          <button type="button" className="view_on_mobile" onClick={handleNextBlogSlide}>Swipe<BsArrowRight className="right_arrow "/></button>
          <Link to={'/blog'}>
            <button className="btn-primary">All Blogs</button>
          </Link>
        </div>

        <div className="home_contact">
          <div className="inside_banner_content">
            <div className="contact_header"><span>submit</span> <h2>your query</h2></div>
            <form className="contact_form" onSubmit={e=>handleSubmit(e)}>
              <input type="text" name="name" placeholder="Name  |" onChange={e=>handleChange(e)} value={formData.name} required/>
              <input type="email" name="email" placeholder="Email  |" onChange={e=>handleChange(e)} value={formData.email} required/>            
              <input type="tel" name="phone" placeholder="Phone  |" onChange={e=>handleChange(e)} value={formData.phone} required/>            
              {apiError.phone && <span style={{color:'red', marginLeft:'15px'}}>{apiError.phone}</span>}
              <input type="text" name="state" placeholder="State  |" onChange={e=>handleChange(e)} value={formData.state} required/>
              <input type="text" name="city" placeholder="City  |"onChange={e=>handleChange(e)} value={formData.city} required/>
              <input type="text" name="message" placeholder="Message  |" onChange={e=>handleChange(e)} value={formData.message} required/>
              <label forhtml="check_human">What is {num1} + {num2}? <span style={{color:'red', marginLeft:'15px'}}>{numError}</span></label>
              <input type="number" id="check_human" name="check_human" placeholder="Are You Human?" required />
              
              <button type="submit" disabled={btnLoading}>{btnLoading ? <span className='btn-loader'></span>:'Submit'} </button>
              {success && (
                <p style={{color:"white", marginTop:'12px'}}>
                  {success}
                </p>
              )}
            </form>
          </div>
        </div>
      </main>
    </>    
  )
}
