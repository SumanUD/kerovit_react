import searchIcon from '../../public/icons/search.webp';
import StoreCard from "../components/storeCard";
import { useEffect, useState } from "react";
import axios from "axios";

export const LocateOurStore = () => {

    const [allType, setAllType] = useState();
    const [studioType, setStudioType] = useState([])
    const [worldType, setWorldType] = useState([]);
    const [experienceType, setExperienceType] = useState([])

    const [search, setSearch] = useState() 
    const [state, setState] = useState([])
    const [city, setCity] = useState([])

    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [newList, setNewList] = useState([])
    const [message, setMessage] = useState('');
    const [searchErrorm, setSerarchError] = useState("");

    const storeUrl = import.meta.env.VITE_API_STORE;
    useEffect(()=>{
        const fetchData = async () => {
            try{
                const res = await axios.get(storeUrl)                
                const theData = res.data.data;                
                const studio = theData.filter((obj)=> obj.dealertype == 'Studio');
                const world = theData.filter((obj)=> obj.dealertype == "KerovitWorld")
                const experience = theData.filter((obj)=> obj.dealertype == "Experience Center")

                const onlystate = [...new Set(theData.map(obj => obj.state))];                
                setState(onlystate.sort())
                
                setAllType(theData)
                setStudioType(studio);
                setWorldType(world);
                setExperienceType(experience);                

                console.log(theData)

            }catch(err){
                console.log(err)
            }
        }

        fetchData();
    }, [])   
        

    function filterState(state){
        return allType.filter(obj => obj.state == state)        
    }

    const handleFindCities = (state) =>{
        setSelectedState(state);
        const newData = filterState(state);
        const cityFilter = [...new Set(newData.map(obj => obj.city))];     
        setCity(cityFilter.sort())                  

        setNewList(allType)        
    }

    const handleSubmitSearch = () =>{             

        const findCities = filterState(selectedState)
        const filterCitie = findCities.filter(obj => obj.city == selectedCity)    
        
        if(selectedState){
            setNewList(filterCitie);
        }else{
            const searchWord = allType.filter(obj => obj.pincode?.toLowerCase().includes(search))            
            setNewList(searchWord)

            if(searchWord.length == 0){
                setSerarchError('*Not Found*')                
            }
        }
        if(!search){
            setMessage('')
        }
        else if(!selectedState){
            setMessage(`Showing result for "${search}".`)
        }else if(selectedState && search){
            setMessage(`Showing result for "${search}" in ${selectedState}, ${selectedCity}.`)
        }else{
            setMessage(`Search of location: ${selectedState}, ${selectedCity}.`)
        }        
    }

    const handleSearchInput = (input) => {
        if(input.length == 0){
            setSearch(input)
            setSerarchError(" ")
            setNewList(allType)
        }else{
            setSearch(input)
        }
    }

    useEffect(()=>{
        const studio = newList.filter((obj)=> obj.dealertype == 'Studio');
        const world = newList.filter((obj)=> obj.dealertype == "KerovitWorld")
        const experience = newList.filter((obj)=> obj.dealertype == "Experience Center")

        // setAllType(theData)
        setStudioType(studio);
        setWorldType(world);
        setExperienceType(experience);  
    }, [newList])


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
    const baseUrl = import.meta.env.VITE_API_BASEURL;
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
            setSuccess("✅ Message sent successfully!")         
            setFormData({
            name: '',
            email: '',
            phone: '',
            state: '',
            city: '',
            message: '', 
            })
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

    return (
        <>            
            <main className="store">
                <div className="banner">
                    <div className="bannerText">
                        <h2>locate</h2>
                        <h1 className="h2second">our store</h1>
                    </div>

                    <div className="store-locator-box">
                        <div className="search-bar">
                            <input type="number" placeholder="Pincode here.." onChange={(e)=>handleSearchInput(e.target.value)} value={search || ""} />
                            <button className="search-btn">                                                                    
                                <img src={searchIcon} alt="search-icon" />
                            </button>                                                                                                
                            <div className="search-error">
                                {searchErrorm}    
                            </div>    
                        </div>                                                

                        {/* <hr className="divider" /> */}

                        <select className="dropdown" onChange={(e)=> handleFindCities(e.target.value)} value={selectedState}>
                            <option value={""}>-- Select State --</option>
                            {
                                state.map((item, index)=>(
                                    <option value={item} key={index}>{item}</option>
                                ))
                            }
                        </select>

                        <select className="dropdown" onChange={(e)=> setSelectedCity(e.target.value)} value={selectedCity} required>
                            <option>-- Select City --</option>
                            {
                                city.map((item, index)=>(
                                    <option value={item} key={index}>{item}</option>
                                ))
                            }
                        </select>

                        <button className="submit-btn" onClick={handleSubmitSearch}>Submit</button>
                    </div>                    
                </div>

                <div className="store-main-contents">

                    <div className="location-list">      
                        {message.length > 5 && <h3 className="heading">{message}</h3>    }      
                                                {
                            experienceType.length > 0 &&
                            <StoreCard
                                storeHeader="/locate-our-store/store3Header.png"
                                storeImage="/locate-our-store/store3.png"
                                location={experienceType}
                            />
                        }        
                        {
                            worldType.length > 0 && 
                            <StoreCard
                                storeHeader="/locate-our-store/store1Header.png"
                                storeImage="/locate-our-store/store1.png"
                                location={worldType}                            
                            />
                        }

                        {
                            studioType.length > 0 && 
                            <StoreCard
                                storeHeader="/locate-our-store/store2Header.png"
                                storeImage="/locate-our-store/store2.png"
                                location={studioType}
                            />
                        }

                    </div>  

                    <div className="store-form-container">
                        <h2>Send Us Your Query</h2>                        
                        <form onSubmit={e=>handleSubmit(e)} className="store-form">
                            <div className="form-group">
                                <label htmlFor="name">Name*</label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={e=>handleChange(e)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="mobile">Mobile* <span style={{color:'red', marginLeft:'15px'}}>{apiError.phone}</span></label>
                                <input type="tel" id="mobile" name="phone" value={formData.phone} onChange={e=>handleChange(e)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email*</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={e=>handleChange(e)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="state">State*</label>
                                <select id="state" name="state" onChange={e=>handleChange(e)} value={formData.state} required>
                                    <option value="">Select State</option>
                                    <option value="andhra-pradesh" >Andhra Pradesh</option>
                                    <option value="arunachal-pradesh">Arunachal Pradesh</option>
                                    <option value="assam">Assam</option>
                                    <option value="bihar">Bihar</option>
                                    <option value="chhattisgarh">Chhattisgarh</option>
                                    <option value="goa">Goa</option>
                                    <option value="gujarat">Gujarat</option>
                                    <option value="haryana">Haryana</option>
                                    <option value="himachal-pradesh">Himachal Pradesh</option>
                                    <option value="jharkhand">Jharkhand</option>
                                    <option value="karnataka">Karnataka</option>
                                    <option value="kerala">Kerala</option>
                                    <option value="madhya-pradesh">Madhya Pradesh</option>
                                    <option value="maharashtra">Maharashtra</option>
                                    <option value="manipur">Manipur</option>
                                    <option value="meghalaya">Meghalaya</option>
                                    <option value="mizoram">Mizoram</option>
                                    <option value="nagaland">Nagaland</option>
                                    <option value="odisha">Odisha</option>
                                    <option value="punjab">Punjab</option>
                                    <option value="rajasthan">Rajasthan</option>
                                    <option value="sikkim">Sikkim</option>
                                    <option value="tamil-nadu" >Tamil Nadu</option>
                                    <option value="telangana">Telangana</option>
                                    <option value="tripura">Tripura</option>
                                    <option value="uttar-pradesh">Uttar Pradesh</option>
                                    <option value="uttarakhand">Uttarakhand</option>
                                    <option value="west-bengal">West Bengal</option>

                                    <option value="andaman-nicobar">Andaman and Nicobar Islands</option>
                                    <option value="chandigarh">Chandigarh</option>
                                    <option value="dadra-nagar-haveli-daman-diu">Dadra & Nagar Haveli and Daman & Diu</option>
                                    <option value="delhi">Delhi</option>
                                    <option value="jammu-kashmir">Jammu and Kashmir</option>
                                    <option value="ladakh">Ladakh</option>
                                    <option value="lakshadweep">Lakshadweep</option>
                                    <option value="puducherry">Puducherry</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="city">City*</label>
                                <input type="text" id="city" name="city" value={formData.city} onChange={e=>handleChange(e)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message*</label>
                                <textarea type="text" id="message" name="message" value={formData.message} onChange={e=>handleChange(e)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="human-check">What is {num1} + {num2}? <span style={{color:'red', marginLeft:'15px'}}>{numError}</span></label>
                                <input type="number" id="human-check" name="check_human" required />
                            </div>

                            <button type="submit" className="submit-btn" disabled={btnLoading} >{btnLoading ? <span className='btn-loader'></span>:'Submit'} </button>
                            {success && (
                                <p style={{marginTop:'25px'}}>
                                    {success}
                                </p>
                            )}
                        </form>
                    </div>

                    {/* {
                        newList.length > 0  ? 
                        <div className="all-location-list">
                            <h3 className="heading">{message}</h3>
                            <div className="grid-items">
                                {
                                newList.map((item, index)=>(
                                    <div key={index} className="card">
                                        <p className="name">{item.dealername}</p>
                                        <p className="person">{item.contactperson}</p>                                        
                                        <p><MdLocationPin /> {item.address}</p>
                                        <p><FaPhoneAlt /> {item.contactnumber}</p>                                        
                                        {
                                            item.google_link != "" &&
                                            <a href={item?.google_link}>
                                                <div className="direction-btn">Get Direction <img src="/public/locate-our-store/arrow-top-right.png" alt="icon" className="arrow-top-right"/></div>
                                            </a>
                                        }
                                    </div>
                                ))
                            }
                            </div>
                        </div> : 
                        <div className="location-list">                        
                            {
                                worldType.length > 0 && 
                                <StoreCard
                                    storeHeader="/locate-our-store/store1Header.png"
                                    storeImage="/locate-our-store/store1.png"
                                    location={worldType}                            
                                />
                            }

                            {
                                studioType.length > 0 && 
                                <StoreCard
                                    storeHeader="/locate-our-store/store2Header.png"
                                    storeImage="/locate-our-store/store2.png"
                                    location={studioType}
                                />
                            }

                            {
                                experienceType.length > 0 &&
                                <StoreCard
                                    storeHeader="/locate-our-store/store3Header.png"
                                    storeImage="/locate-our-store/store3.png"
                                    location={experienceType}
                                />
                            }
                        </div>                    
                    } */}
                </div>

            </main>            
        </>
    );
}
