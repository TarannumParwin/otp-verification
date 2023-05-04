import React, { useState } from 'react';
import  './style.css'; 

function PhoneVerification() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handlePhoneNumberChange = (e) => {
    const input = e.target.value;
    if (/^\d+$/.test(input) || input === '') {
      setPhoneNumber(input);
    }
  };

  const handlePhoneNumberSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const handleOtpChange = (e, index) => {
    const input = e.target.value;
    if (/^\d+$/.test(input) || input === '') {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = input;
        return newOtp;
      });
      if (index < otp.length - 1 && input !== '') {
        e.target.nextSibling.focus();
      }
      if (index > 0 && input === '') {
        e.target.previousSibling.focus();
      }
    }
  };

  const handleOtpKeydown = (e, index) => {
    if (e.keyCode === 8 && index > 0 && otp[index] === '') {
      e.target.previousSibling.focus();
    }
    if (e.keyCode === 37 && index > 0) {
      e.target.previousSibling.focus();
    }
    if (e.keyCode === 39 && index < otp.length - 1) {
      e.target.nextSibling.focus();
    }
  };

  const verifyOtp = () => {
    const enteredOtp = otp.join('');
    console.log(`Verifying OTP: ${enteredOtp}`);
    // Add your verification logic here
    // ...
    setShowPopup(false);
  };

  return (
    <div className="phone-verification-container">
      <form onSubmit={handlePhoneNumberSubmit} className='form_Container'>
        <h1>Phone Verification</h1>
        <p>We need to registered before getting started !</p> 
        <label htmlFor="phone-input"></label>
        <div className='input_wrapper'>
          <input
            id="phone-input"
            type="tel"
            maxLength="10"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            className='input_item'
            />
          <button type="submit" disabled={phoneNumber.length !== 10} className='btn'>
          Send the code
          </button>
        </div>
      </form>
      {showPopup && (
        <div className="otp-popup">
          <div className="popup-content">
            <h3>Enter OTP</h3>
           
            <div className="otp-input-container">
              {otp.map((digit, index) => (
                
                <input
                  type="tel"
                  maxLength="1"
                  key={index}
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)}
                  onKeyDown={(e) => handleOtpKeydown(e, index)}
                />
              ))}
            </div>
            <div className='Change_Resend_container'>
              <span >Change number </span>
              <span>Re-send </span>
            </div>
            <button className="btn" onClick={verifyOtp} disabled={!otp.every((d) => d !== '')}>
             Verify phone number
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PhoneVerification;