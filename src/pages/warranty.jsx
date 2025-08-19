import { useState, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';

export const Warranty = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    state: '',
    city: '',
    message: '',  
  })

  const baseUrl = import.meta.env.VITE_API_BASEURL;
  const [capValue, setCapValue] = useState(null)
  const gcKey = import.meta.env.VITE_GC_KEY;
  const [success, setSuccess] = useState('')
  const [btnLoading, setBtnLoading] = useState(false)
  const [apiError, setApiError] = useState({})

  const handleChange = (e) =>{
    setFormData({
    ...formData,
    [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()            
    setSuccess("")  
    setApiError({})
    async function submitForm(){
      try{
        await axios.post(baseUrl+'/api/contact', formData , {
          headers: {
            'Content-Type': 'application/json',
          },
        });                                    
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
        console.log(err)
        setApiError(err.response.data.errors)
        setSuccess("❌ Failed to send message!") 
      }finally{
        setBtnLoading(false)
      }
    }        
    setBtnLoading(true)
    submitForm()    
  };

  return (
    <>            
      <main className="warranty">
        <div className="banner">
          <div className="banner_content">
            <h2 className="banner_title">Warranty</h2>
            <p>
              Every Kerovit product carries our commitment to you with a long-term
              warranty that ensures care, convenience and confidence. We offer up to
              10 years of warranty across our range, ensuring you enjoy the same
              peace of mind long after the purchase.
            </p>
            <p className="warrantySecondP">
              If you would like to know more about our warranty policy click <b><a href="/warranty/kerovit-faucet-sanitaryware-warranty.pdf" target="_blank" rel="noopener noreferrer">here</a></b>
            </p>
          </div>
        </div>

        <div className="warranty-form-container">
          <div className="below-warranty-banner" />

          <form className="warranty-form" onSubmit={handleSubmit}>
            <label>
              Name*
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>

            <label>
              Mobile*<span style={{color:'red', marginLeft:'15px'}}>{apiError.phone}</span>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
            </label>

            <label>
              Email*
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>

            <label>
              Select State*
              <select name="state" value={formData.state} onChange={handleChange} required>
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
            </label>

            <label>
              City*
              <input type="text" name="city" value={formData.city} onChange={handleChange} required />
            </label>


            <label>
              Message*              
              <textarea name="message" value={formData.message} onChange={handleChange} ></textarea>
            </label>

            <div className="google_capta">
              <ReCAPTCHA
                sitekey={gcKey}
                onChange={(val)=> setCapValue(val)}
              />
            </div>
            
            <button type="submit" className="submit-btn" disabled={btnLoading || !capValue }>SUBMIT</button>

            {success && (
              <p style={{ marginTop: '12px', color: 'green' }}>
                {success}
              </p>
            )}
          </form>
        </div>
      </main>            
    </>
  );
};
