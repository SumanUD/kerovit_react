import { useState, useEffect, useRef, Suspense, useDeferredValue } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import subMenuIcon from "../../public/icons/down.png"; // Import your submenu icon
import { GiHamburgerMenu } from "react-icons/gi";

import { CiLocationOn } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { MdCall } from "react-icons/md";
import axios from "axios";
import dictionary from "../../data/api-dictionary";


const collectionType = {
  1:"aurum",
  2:"klassic"
}
const categoryType = {
  1: "faucet",
  2: "shower",
  3: "toilet",
  4: "basin",
  5: "accessories",
  6: "bathroom_furniture",
  7: "faucet",
  8: "shower",
  9: "toilet",
  10: "basin",
  11: "accessories",
  12: "bathroom_furniture"
}

const productSubMenu = [
  { img: "/icons/faucet.png", name: "Faucet", link: "/product/faucet" },
  { img: "/icons/shower.png", name: "Shower", link: "/product/shower" },
  { img: "/icons/basin.png", name: "Basin", link: "/product/basin" },
  { img: "/icons/toilet.png", name: "Toilet", link: "/product/toilet" },
  { img: "/icons/bathroom_furniture.png", name: "Bathroom Furniture", link: "/product/bathroomFurniture" },
  { img: "/icons/accessories.png", name: "Accessories", link: "/product/accessories" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [openMenuList, setOpenMenuList] = useState(false);  
  
  const {pathname} = useLocation();
  const searchURL = import.meta.env.VITE_API_SEARCH;  
  // Toggle menu open/close
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  // Toggle submenus
  const toggleSubmenu = (index, e) => {
    e.stopPropagation();
    if(activeIndex === index) {
      setActiveIndex(null);
      setOpenMenuList(false);
    }else{
      setActiveIndex(index);
      setOpenMenuList(true); 
    }
  };

  // Detect scrolling for background effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const searchInputRef = useRef(null);
  //handleling search input
  const [openSearch, setOpenSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const defferedValue = useDeferredValue(searchInput);
  const [searchArr, setSearchArr] = useState([]);
  const [searchMessage, setSearchMessage] = useState(null)

  const [width, setWidth] = useState(window.innerWidth);
  let itemsToShow = width > 800 ? 10 : 5;
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);  

useEffect(() => {
  setSearchMessage('searching...');
  let isMounted = true;

  async function handleSearch(text) {
    try {
      const res = await axios.get(`${searchURL}?q=${text.trim()}`);
      if (isMounted) {
        setSearchArr(res.data.products); 
        console.log(res.data)

        setSearchMessage(res.data.products.length >= 1 ? null : "No products found.");
      }
    } catch (err) {
      console.log(err);
      setSearchMessage("Something went wrong while searching.");
    }
  }

  if (defferedValue.length > 1) {
    handleSearch(defferedValue);
  } else {
    setSearchArr([]);
  }

  return () => {
    isMounted = false;
  };
}, [defferedValue]);


  const handleOpenSearch = () => {    
    setOpenSearch(!openSearch);
    setSearchInput(" ");
    searchInputRef.current.value = null
    setActiveIndex(null)
    setIsOpen(false)
  }
  const handleCloseSearch = () => {
    setOpenSearch(false);
    setSearchInput(" ");
    searchInputRef.current.value = null
  }

  useEffect(()=>{
    if(activeIndex == null){
      setOpenMenuList(false)
    }else{      
      setOpenSearch(false)
    }
  }, [activeIndex])

  useEffect(()=>{
    if(isOpen){
      setOpenSearch(false)
    }
  },[isOpen])

  useEffect(()=>{
    setIsOpen(false)
    setOpenMenuList(false)
    setActiveIndex(null)
    handleCloseSearch()
  }, [pathname])  

  const handleAboutSubMenuToggle = (toggleSwitch, event) =>{    
    toggleSubmenu(toggleSwitch, event)
    setIsOpen(false)
  }

  return (
    <div className="onlyNav">
      {isOpen && <div className="nav-overlay active" onClick={toggleMenu}></div>}      
      <nav id="navbarMenu" className={`${scrolled ? "scrolled" : ""} ${openMenuList ? "scrolled" : ""} ${openSearch ? "scrolled" : ""}`}>         
        <div className="nav-contents">
          <div className="nav-left">
            <div className="toggleMenu" >
              <GiHamburgerMenu onClick={toggleMenu}/>
              <NavLink to="/">
              <img
                  src="/kerovit_logo.png"
                alt="Logo"
                className="kerovit_logo"
                loading="lazy"
              />
              </NavLink>
            </div>
          </div>
          <div className="the_logo">
            <NavLink to="/">
              <img
                  src="/kerovit_logo.png"
                  alt="Logo"
                  className="kerovit_logo"
                  loading="lazy"
                />
            </NavLink>          
          </div>
          
          <div className="nav-right">
            <NavLink to="/customer-care">              
              {/* <CiLocationOn  />      */}
              <MdCall className="menu_location"/>         
              
            </NavLink>            

            <IoIosSearch onClick={handleOpenSearch} className="menu_search desktop"/>
          </div>

          <div className={`search-desktop ${openSearch ? "open" : ""}`}>
            <div className="search-desktop-container">
              <input type="text" ref={searchInputRef} placeholder="Search..." onChange={( )=> setSearchInput(searchInputRef.current.value)} className="search-desktop-input" />              
              <IoClose className="close_icon" onClick={handleCloseSearch}/>                      
            </div>
            {
              searchInputRef?.current?.value &&
              <div className="search-contents">
                <p className="search-message">{searchInputRef?.current?.value && searchMessage}</p>                
                <div className="search-list">                            
                  {                    
                    searchArr.slice(0, itemsToShow).map((item, index)=>(
                    <Link to={`/collection/${collectionType[item.collection_id]}/${categoryType[item.category_id]}/${item.range_id ? dictionary.Range[item.range_id] : "single"}/${item.product_code}`} key={index}>
                      <div className="list-card">
                        <div className="list-img">
                        
                          <img src={`https://admin.kerovit.com/storage/${item.product_picture}`} alt="" />


                        </div>
                        <div>
                          <p className="list-card-head">{item.product_title}</p>
                          <p>{item.product_code}</p>
                        </div>
                      </div>
                    </Link>
                    ))
                  }
                </div>
              </div>              
            }

          </div>
          
          <ul className={isOpen ? "open" : ""}>
            {/* Products Submenu */}
            <li className={`submenu ${activeIndex === 0 ? "active openSub hidemenuDesktop" : "hidemenuDesktop"}`} onClick={(e) => toggleSubmenu(0, e)}>
              <NavLink to="#">
              {/* <img src="/icons/Products.png" alt="Products icon" /> */}
              {/* <img src= "/icons/Products.png" alt="catalogue" className="hideInDesktop" loading="lazy" /> */}
                Products <span className="submenu-icon">
                  <img src={subMenuIcon} alt="" loading="lazy"/>
                </span>
                <div className="submenu-button"></div>
              </NavLink>
              <ul className="dropdown" style={{ display: activeIndex === 0 ? "block" : "none" }}>
                {productSubMenu.map((item, index) => (
                  <li key={index} onClick={(e) => e.stopPropagation()}>
                    <img src={item.img} alt={item.name} loading="lazy"/>
                    <NavLink to={item.link}>{item.name}</NavLink>
                  </li>
                ))}
              </ul>
            </li>

            <li className={`submenu ${activeIndex === 2 ? "active openSub" : ""}`} onClick={(e) => toggleSubmenu(2, e)}>
              <p>
                <img src= "/icons/More.png" alt="catalogue" className="hideInDesktop" loading="lazy" />
                About Us <span className="submenu-icon">
                  <img src={subMenuIcon} alt="" loading="lazy"/>
                </span>
                <span className="submenu-button"></span>
              </p>
              <ul className="dropdown" style={{ display: activeIndex === 2 ? "block" : "none" }}>
                {[                  
                  { img: "/icons/info.png", label: "Who We Are", link: "/about" },
                  { img: "/icons/messenger.png", label: "Director's Message", link: "/about" },
                  { img: "/icons/factory.png", label: "Manufacturing Plants", link: "/about" },
                  { img: "/icons/certificate.png", label: "Certification", link: "/about" },
                ].map((item, index) => (
                  <li key={index} onClick={(e) => e.stopPropagation()}>
                    <img src={item.img} alt={item.name} className="moreIcon" loading="lazy"/>
                    <NavLink to={item.link} state={{ title: item.label.split(" ").join("_").split("'").join("") , from: location.pathname }} onClick={(e) => handleAboutSubMenuToggle(2, e)}>{item.label}</NavLink>
                  </li>
                ))}
              </ul>
            </li>

                
              <li className={`submenu ${activeIndex === 0 ? "active openSub hideInMobile" : "hideInMobile"}`} onClick={(e) => toggleSubmenu(0, e)}>
                <NavLink to="/product/faucet">
                  <img src= "/icons/Products.png" alt="catalogue" className="hideInDesktop" loading="lazy" />

                  Products 
                </NavLink>

              </li>


            <li><NavLink to="/catalogue"><img src= "/icons/catalogue.png" alt="catalogue" className="hideInDesktop" loading="lazy" />E-Catalogue</NavLink></li>
            <li><NavLink to="/locate-our-store"><img src= "/icons/wheretobuy.png" alt="wheretobuy" className="hideInDesktop" loading="lazy" />Where to Buy</NavLink></li>



            <li className={`submenu ${activeIndex === 1 ? "active openSub" : ""}`} onClick={(e) => toggleSubmenu(1, e)}>
              <p>
                <img src= "/icons/More.png" alt="catalogue" className="hideInDesktop" loading="lazy" />
                More <span className="submenu-icon">
                  <img src={subMenuIcon} alt="" loading="lazy"/>
                </span>
                <span className="submenu-button"></span>
              </p>
              <ul className="dropdown" style={{ display: activeIndex === 1 ? "block" : "none" }}>
                {[
                  // { img: "/icons/whatsnew.png", label: "What's New", link: "#" },
                  { img: "/icons/career.png", label: "Career", link: "/our-career" },
                  { img: "/icons/resources.png", label: "Blog", link: "/blog" },
                  { img: "/icons/phone.png", label: "Customer Care", link: "/customer-care" },
                ].map((item, index) => (
                  <li key={index} onClick={(e) => e.stopPropagation()}>
                    <img src={item.img} alt={item.name} className="moreIcon" loading="lazy"/>
                    <NavLink to={item.link}>{item.label}</NavLink>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
