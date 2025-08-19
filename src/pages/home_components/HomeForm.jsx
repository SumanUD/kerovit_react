import { useState } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
export const HomeForm = () => {

    const baseUrl = import.meta.env.VITE_API_BASEURL;
    const [capValue, setCapValue] = useState(null)

    const [success, setSuccess] = useState('')
      const [numError, setError]= useState('')
      const [btnLoading, setBtnLoading] = useState(false)
      const [apiError, setApiError] = useState({})

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
            console.log(err)
            setApiError(err.response.data.errors)
            setSuccess("❌ Failed to send message!") 
        }finally{
            setBtnLoading(false)        
        }
        }

       
        setBtnLoading(true)
        submitForm()
        setError('')                     
    }   

  return (
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
            <div className="google_capta">
                <ReCAPTCHA
                sitekey='6Lc_WKsrAAAAAIzleSx7KxbhoSUEXIvqARUnX49n'
                onChange={(val)=> setCapValue(val)}
                />
            </div>
            
            <button type="submit" disabled={btnLoading || !capValue }>{btnLoading ? <span className='btn-loader'></span>:'Submit'} </button>
            {success && (
            <p style={{color:"white", marginTop:'12px'}}>
                {success}
            </p>
            )}
        </form>
        </div>
    </div>
  )
}
