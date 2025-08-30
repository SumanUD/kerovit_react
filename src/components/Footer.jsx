import { useState } from "react";
import { Link } from "react-router-dom";

import plusIcon from "../../public/icons/plus.webp";
import minusIcon from "../../public/icons/minus.webp";
import logo from "../../public/kerovit_logo.png";
import facebook from "../../public/facebook.png";
import instagram from "../../public/instagram.png";
import twitter from "../../public/twitter.png";
import youtube from "../../public/youtube.png";
import linkedin from "../../public/linkedin.png";
import down from "../../public/icons/down.webp";

export const Footer = () => {
    const [openAccordion, setOpenAccordion] = useState(null);
    const [openDesktopAccordion, setOpenDesktopAccordion] = useState(null);

    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

    const toggleDesktopAccordion = (index) => {
        setOpenDesktopAccordion(openDesktopAccordion === index ? null : index);
    }

    return (
        <>
            <div className="above-accordian">
                <div className="socials_links">
                    <a href="https://www.facebook.com/Kerovit/" target="_blank" rel="noopener noreferrer">
                        <img src={facebook} alt="Facebook" className="icon facebook" />
                    </a>
                    <a href="https://www.instagram.com/kerovit.kajaria/" target="_blank" rel="noopener noreferrer">
                        <img src={instagram} alt="Instagram" className="icon instagram" />
                    </a>
                    <a href="https://x.com/Kerovitindia" target="_blank" rel="noopener noreferrer">
                        <img src={twitter} alt="Twitter" className="icon twitter" />
                    </a>
                    <a href="https://www.youtube.com/channel/UC102RyBRts4VmjtnvwV-nww" target="_blank" rel="noopener noreferrer">
                        <img src={youtube} alt="YouTube" className="icon youtube" />
                    </a>
                    <a href="https://www.linkedin.com/company/kerovitbykajaria/?originalSubdomain=in" target="_blank" rel="noopener noreferrer">
                        <img src={linkedin} alt="LinkedIn" className="icon linkedin" />
                    </a>
                </div>


                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button custom-accordion-btn"
                                type="button"
                                onClick={() => toggleAccordion(1)}
                            >
                                Collection   <span className="accordion-icon">
                                    <img
                                        src={openAccordion === 1 ? minusIcon : plusIcon}
                                        alt={openAccordion === 1 ? "Collapse" : "Expand"}
                                        width="16"
                                        height="16"
                                    />
                                </span>
                            </button>
                        </h2>
                        {openAccordion === 1 && (
                            <div className="accordion-collapse">
                                <div className="accordion-body">
                                    <ul>
                                        <li><a href="/collection/aurum">Aurum</a></li>
                                        <li><a href="/collection/klassic">Klassic</a></li>

                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-3 non-accordian"><a href="/customer-care">Customer Care</a></div>
                    <div className="p-3 non-accordian"><Link to="/our-warranty">Warranty</Link></div>

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button custom-accordion-btn"
                                type="button"
                                onClick={() => toggleAccordion(2)}
                            >
                                More  <span className="accordion-icon">
                                    <img
                                        src={openAccordion === 2 ? minusIcon : plusIcon}
                                        alt={openAccordion === 2 ? "Collapse" : "Expand"}
                                        width="16"
                                        height="16"
                                    />
                                </span>
                            </button>
                        </h2>
                        {openAccordion === 2 && (
                            <div className="accordion-collapse">
                                <div className="accordion-body">
                                    <ul>
                                        <li><a href="/our-career">Career</a></li>
                                        <li><a href="/blog">Blog</a></li>
                                       <li>
                                        <a href="privacy-policy" target="_blank" rel="noopener noreferrer">
                                            Privacy Policy
                                        </a>
                                        </li>

                                    </ul>

                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="footer">
                    <p className="complaint-text">
                        Register Your Complaint On Our Customer Care App. Download Now
                    </p>

                    <div className="app-buttons">
                        <a href="https://play.google.com/store/apps/details?id=com.vcarekerovit1&hl=en_IN" target="_blank" rel="noopener noreferrer" className="app-button">
                            <img src="/google_play.png" alt="Google Play" className="icon playstore" />
                            {/* Get it on <br /> <strong>Google Play</strong> */}
                        </a>
                        <a href="https://apps.apple.com/in/app/kerovit-customer-care/id1508130570" target="_blank" rel="noopener noreferrer" className="app-button">
                            <img src="/app_store.png" alt="App Store" className="icon appstore" />
                            {/* Download on the <br /> <strong>App Store</strong> */}
                        </a>
                    </div>


                    <div className="footer-links">
                        <Link to="privacy-policy" className="footer-link">Privacy Policy</Link>
                        <Link to="/sitemap" className="footer-link">Sitemap</Link>
                    </div>
                </div>
            </div>
            <div className="desktop-footer">
                <div className="the_footer">
                    <div className="the_logo_section">
                        <img src={logo} alt="" />
                    </div>
                    <div className="quick_menu_section">
                        <div className="footer_heading">Quick Menu</div>
                        <div className="quick_menu">
                            <p onClick={() => toggleDesktopAccordion(1)}>Collection <span className={openDesktopAccordion == 1 ? 'flip' : ''}><img src={down} alt="" /></span></p>
                            <div className={` ${openDesktopAccordion === 1 ? "" : " hide"} footer_accordian `} onClick={() => toggleDesktopAccordion(1)}>
                                <ul>
                                    <li><a href="/collection/aurum">Aurum</a></li>
                                    <li><a href="/collection/klassic">Klassic</a></li>

                                </ul>
                            </div>
                            <a href="/customer-care">Customer Care</a>
                            <a href="/our-warranty">Warranty</a>
                            <p onClick={() => toggleDesktopAccordion(2)}>More <span className={openDesktopAccordion == 2 ? 'flip' : ''}><img src={down} alt="" /></span></p>
                            <div className={` ${openDesktopAccordion === 2 ? "" : " hide"} footer_accordian `} onClick={() => toggleDesktopAccordion(1)}>
                                <ul>
                                    <li><a href="/our-career">Career</a></li>
                                    <li><a href="/blog">Blog</a></li>
                                      <li>
                                        <a href="privacy-policy" target="_blank" rel="noopener noreferrer">
                                            Privacy Policy
                                        </a>
                                        </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="other_section">
                        <div className="apps">
                            <div className="appheading">Register your complaint on our customer care app. download now</div>
                            <div className="app-images">
                                <a href="https://play.google.com/store/apps/details?id=com.vcarekerovit1&hl=en_IN" target="_blank" rel="noopener noreferrer" className="app-button">
                                    <img src="/google_play.png" alt="Google Play" className="icon playstore" />
                                    {/* Get it on <br /> <strong>Google Play</strong> */}
                                </a>
                                <a href="https://apps.apple.com/in/app/kerovit-customer-care/id1508130570" target="_blank" rel="noopener noreferrer" className="app-button">
                                    <img src="/app_store.png" alt="App Store" className="icon appstore" />
                                    {/* Download on the <br /> <strong>App Store</strong> */}
                                </a>
                            </div>
                        </div>
                        <div className="underline"></div>
                        <div className="socials_links">
                            <a href="https://www.facebook.com/Kerovit/" target="_blank" rel="noopener noreferrer">
                                <img src={facebook} alt="Facebook" className="icon facebook" />
                            </a>
                            <a href="https://www.instagram.com/kerovit.kajaria/" target="_blank" rel="noopener noreferrer">
                                <img src={instagram} alt="Instagram" className="icon instagram" />
                            </a>
                            <a href="https://x.com/Kerovitindia" target="_blank" rel="noopener noreferrer">
                                <img src={twitter} alt="Twitter" className="icon twitter" />
                            </a>
                            <a href="https://www.youtube.com/channel/UC102RyBRts4VmjtnvwV-nww" target="_blank" rel="noopener noreferrer">
                                <img src={youtube} alt="YouTube" className="icon youtube" />
                            </a>
                            <a href="https://www.linkedin.com/company/kerovitbykajaria/?originalSubdomain=in" target="_blank" rel="noopener noreferrer">
                                <img src={linkedin} alt="LinkedIn" className="icon linkedin" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
