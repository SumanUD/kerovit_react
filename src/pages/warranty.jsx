import { useState, useEffect } from 'react';

export const Warranty = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    address: '',
    state: '',
    city: '',
    district: '',
    pincode: '',
    check_human: '',
  });

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [numError, setNumError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setNum1(Math.floor(Math.random() * 10));
    setNum2(Math.floor(Math.random() * 10));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const total = num1 + num2;
    if (parseInt(formData.check_human) !== total) {
      setNumError('Incorrect answer. Please try again.');
      return;
    }

    setNumError('');
    // Handle your form submission logic here (e.g., API call)
    setSuccess('Warranty activated successfully!');
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
              Mobile*
              <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />
            </label>

            <label>
              Address*
              <input type="text" name="address" value={formData.address} onChange={handleChange} required />
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
              District*
              <input type="text" name="district" value={formData.district} onChange={handleChange} required />
            </label>

            <label>
              Pincode
              <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} />
            </label>

            <label>
              What is {num1} + {num2}? 
              <span style={{ color: 'red', marginLeft: '10px' }}>{numError}</span>
              <input type="number" name="check_human" value={formData.check_human} onChange={handleChange} required />
            </label>

            <button type="submit" className="submit-btn">SUBMIT</button>

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
