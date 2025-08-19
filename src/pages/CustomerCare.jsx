import email from '../../public/icons/email.webp';
import headset from '../../public/icons/headset.webp';
import download from '../../public/icons/download.webp';
import { useState, useEffect } from "react";
import axios from "axios";

import ReCAPTCHA from 'react-google-recaptcha';

export const CustomerCare = () => {

  const [customerData, setCustomerData] = useState({})
  const [capValue, setCapValue] = useState(null)
  const customerURL = import.meta.env.VITE_API_CUSTOMERCARE;
  const gcKey = import.meta.env.VITE_GC_KEY;  
  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(customerURL, {
          headers: {
            'Authorization': `Bearer gVSYUDhjLSXMDZSpVdPCiz9s`, // Replace with your actual API key
            'Content-Type': 'application/json', // Set content type if required
          },
        });
        setCustomerData(res.data.data)
      } catch (err) {
        console.error('Error:', err.message);
      }
    }

    getData();
  }, []);

  const [success, setSuccess] = useState('')
  const [btnLoading, setBtnLoading] = useState(false)
  const [apiError, setApiError] = useState({})
  const baseUrl = import.meta.env.VITE_API_BASEURL;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    state: '',
    city: '',
    message: '',
  })
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  
  function handleSubmit(e) {
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
        setApiError(err.response.data.errors)
        setSuccess("❌ Failed to send message!") 
      }finally{
        setBtnLoading(false)        
      }
    }

      setBtnLoading(true)
      submitForm()           
  } 

  return (
    <div className="customerCare">
      <div className="banner">
        <img src={customerData.banner_image} alt="banner_image" />
      </div>

      <div className="below-banner">
        <p className="customer-description">
          Great design deserves great support. Please reach out to us for
          service questions, product info, or any help you need, so that we
          can deliver the support you desire.
        </p>

        <div className="company-info">
          <div className="section">
            <div className="section-title">Email <img src={email} alt="email-icon" /></div>

            <div className="title">Service Query</div>
            <a href="mailto:customercare@kerovit.com">{customerData?.emails?.service_query}</a>

            <div className="title">info</div>
            <a href="mailto:info@kerovit.com">{customerData?.emails?.info_email}</a>

          </div>
          <div className="section">
            <div className="section-title">customer care <img src={headset} alt="headset-icon" /></div>

            {/* <div className="title">call</div>
            <p><a href={`tel:${customerData?.customer_care?.call}`}>{customerData?.customer_care?.call}</a></p> */}

            <div className="title">Tollfree Number</div>
            <p><a href={`tel:${customerData?.customer_care?.toll_free}`}>{customerData?.customer_care?.toll_free}</a></p>

            <div className="title">Whats App Chat</div>
            <p><a href={`https://wa.me/${customerData?.customer_care?.whatsapp}`} target="blank">{customerData?.customer_care?.whatsapp}</a></p>
          </div>
        </div>
        <div className="app-section">
          <section className="app-text">
            <div className="section-title">
              Download Service App <img src={download} alt="download-icon" />
            </div>
            <div className="title">Service Query</div>
          </section>
        
          <section className="app-visual">
            <img src="/customer-care-kerovit.png" alt="Customer Care" className="brand-image" />
        
            <div className="app-buttons">
              <a href="https://play.google.com/store/apps/details?id=com.vcarekerovit1&hl=en_IN" target="_blank" rel="noopener noreferrer" className="app-button">
                <img src="/Google_Play_Store_black.webp" alt="Google Play" />
              </a>
              <a href="https://apps.apple.com/in/app/kerovit-customer-care/id1508130570" target="_blank" rel="noopener noreferrer" className="app-button">
                <img src="/app-store-black.png" alt="App Store" />
              </a>
            </div>
          </section>
        </div>
        <div className="form-header">
          <div className="form-title">Enquiry Form</div>
          <div className="form-description">
            Have a question or request? Just fill in the
            details below, and we’ll make sure the right
            team connects with you soon.</div>
        </div>
        <form onSubmit={e => handleSubmit(e)}>
          <div className="form-group">
            <label htmlFor="name">Name*</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={e => handleChange(e)} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email*</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={e => handleChange(e)} required />
          </div>
          <div className="form-group">
            <label htmlFor="mobile">Mobile* <span style={{ color: 'red', marginLeft: '15px' }}>{apiError.phone}</span></label>
            <input type="tel" id="mobile" name="phone" value={formData.phone} onChange={e => handleChange(e)} required />
          </div>
          <div className="form-group">
            <label htmlFor="state">State*</label>
            <select id="state" name="state" onChange={e=>handleChange(e)} value={formData.state} required>
                <option value="">Select State</option>
                <option value="andhra-pradesh">Andhra Pradesh</option>
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
                <option value="tamil-nadu">Tamil Nadu</option>
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
            <input type="text" id="city" name="city" value={formData.city} onChange={e => handleChange(e)} required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message*</label>
            <textarea type="text" id="message" name="message" value={formData.message} onChange={e => handleChange(e)} required />
          </div>
          <div className="google_capta">
            <ReCAPTCHA
              sitekey={gcKey}
              onChange={(val)=> setCapValue(val)}
            />
          </div>
          <button type="submit" className="submit-btn" disabled={btnLoading || !capValue }>{btnLoading ? <span className='btn-loader'></span>:'Submit'} </button>
          {success && (
            <p style={{marginTop:'12px'}}>
              {success}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
