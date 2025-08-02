import { AllRoutes } from "./routes/AllRoutes"
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { FaWhatsapp } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader } from "./components/Loader";
import { Link } from "react-router-dom";

function App() {  

  const [show, setShow] = useState(true)  
  const {pathname} = useLocation();

  function hideLoader(){
    setTimeout(() => {
      setShow(false)
    }, 3000);
  }

  useEffect(()=>{
    setShow(true)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    hideLoader()    
  }, [pathname])  

  return (
    <>
      {pathname == '/' ? '' : <Loader showLoader={show}/> }
      <Header/>
        <AllRoutes/>    
            
        <Link to={'https://wa.me/9289077800'} target="__blank" className="whatsapp-icon">
          <FaWhatsapp />
        </Link>
      <Footer/>
    </>
  )
}

export default App
