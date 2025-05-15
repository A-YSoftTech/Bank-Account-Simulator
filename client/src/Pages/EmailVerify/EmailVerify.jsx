import React, { useContext, useEffect } from 'react'
import './EmailVerify.css'
import axios from 'axios';
import { AppContent } from '../../Context/AppContext/AppContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const EmailVerify = () => {

  axios.defaults.withCredentials = true;
  const {backendUrl, isLoggedIn, userData, getUserData} = useContext(AppContent);
  const navigate = useNavigate();

  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  }
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  }

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text/plain');
    if (paste) {
      const pasteArray = paste.split('');
      
      pasteArray.forEach((char, index) => {
        if (inputRefs.current[index]) {
          inputRefs.current[index].value = char;
        }
      });
    }
  };

  const onSubmitHandler = async(e)=>{
    try{
      e.preventDefault();
      const otpArray = inputRefs.current.map(e => e.value)
      const otp = otpArray.join('')
      console.log(otp);
      const {data} = await axios.post(backendUrl + '/api/auth/verify-account', {otp})
      if(data.success){
        toast.success(data.message);
        getUserData();
        navigate('/dashboard')
      }else{
        toast.error(data.message);
      }
    }catch(error){
      toast.error(error.message);
    }
  }
  
  useEffect(()=>{
    isLoggedIn && userData && userData.isAccountVerified && navigate('/dashboard')
  },[isLoggedIn, userData])

  return (
    <div className='email'>
      <div className='email-logo'>
        <img onClick={() => navigate('/')} src="/logo.svg" alt="" className='email-img' />
      </div>
      <form onSubmit={onSubmitHandler}>
        <h1>Email verify OTP</h1>
        <p>Enter 6-digit code sent to your email Id.</p>
        <div className='email-input' onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index) => (
            <input type="text" maxLength='1' key={index} required ref={e => inputRefs.current[index] = e} onInput={(e) => handleInput(e, index)} onKeyDown={(e) => handleKeyDown(e, index)} />
          ))}
        </div>
        <button className='verify-btn' type='submit'>Verify Email</button>
      </form>
    </div>
  )
}

export default EmailVerify
