import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavigationMenuDesktop = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubmenu = (index, e) => {
    e.stopPropagation();
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav id="navbarMenu" className={scrolled ? "scrolled navbar navbar-expand-lg navbar-light bg-light" : "navbar navbar-expand-lg navbar-light bg-light"}>

      <div className="nav-left">
        <div className="toggleMenu" onClick={toggleMenu}>
          <img
            src="/kerovit_logo.png"
            alt="Logo"
            className="kerovit_logo"
          />
        </div>
      </div>

      {/* Menu Items */}
      <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
        <ul className="navbar-nav ml-auto">
          {/* Products Dropdown */}
          <li
            className={`nav-item dropdown submenu ${activeIndex === 0 ? "active openSub" : ""}`}
            onClick={(e) => toggleSubmenu(0, e)}
          >
            <Link to="#" className="nav-link dropdown-toggle" role="button">
              Productss
            </Link>
            <div
              className="dropdown-menu"
              style={{ display: activeIndex === 0 ? "block" : "none" }}
            >
              {[
                { img: "/icons/faucet.png", name: "Faucet", link: "/faucet" },
                { img: "/icons/shower.png", name: "Shower", link: "/shower" },
                { img: "/icons/basin.png", name: "Basin", link: "/basin" },
                { img: "/icons/toilet.png", name: "Toilet", link: "/toilet" },
                { img: "/icons/bathroom_furniture.png", name: "Bathroom Furniture", link: "/bathroomFurniture" },
                { img: "/icons/accessories.png", name: "Accessories", link: "/accessories" }
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className="dropdown-item d-flex align-items-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img src={item.img} alt={item.name} style={{ width: "20px", marginRight: "10px" }} />
                  {item.name}
                </Link>
              ))}
            </div>
          </li>

          <li className="nav-item">
            <Link to="/catalogue" className="nav-link">E-Catalogue</Link>
          </li>

          <li className="nav-item">
            <Link to="/where-to-buy" className="nav-link">Where to Buy</Link>
          </li>

          {/* More Dropdown */}
          <li
            className={`nav-item dropdown submenu ${activeIndex === 1 ? "active openSub" : ""}`}
            onClick={(e) => toggleSubmenu(1, e)}
          >
            <Link to="#" className="nav-link dropdown-toggle" role="button">
              More
            </Link>
            <div
              className="dropdown-menu"
              style={{ display: activeIndex === 1 ? "block" : "none" }}
            >
              {[
                { label: "What's New", link: "#" },
                { label: "Career", link: "/career" },
                { label: "Resources", link: "/blog" }
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className="dropdown-item"
                  onClick={(e) => e.stopPropagation()}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </li>
        </ul>
      </div>

      <div className="nav-right ml-auto d-flex align-items-center">
        <img src="/menu_location.png" alt="Location" className="menu_location" />
        <img src="/menu_search.png" alt="Search" className="menu_search" />
      </div>
    </nav>
  );
};

export default NavigationMenuDesktop;
