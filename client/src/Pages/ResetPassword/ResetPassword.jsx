import React, { useContext, useState } from 'react'
import './ResetPassword.css'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../../Context/AppContext/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const ResetPassword = () => {

  const {backendUrl} = useContext(AppContent)
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [isEmailSent, setIsEmailSent] = useState('')
  const [otp, setOtp] = useState(0)
  const [isOtpSubmited, setIsOtpSubmited] = useState(false)

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

  const onSubmitMail = async(e)=>{
    e.preventDefault();
    try{
      const {data} = await axios.post(backendUrl + '/api/auth/send-reset-otp', {email});
      if(data.success){
        toast.success(data.message);
      }else{
        toast.error(data.message);
      }
      data.success && setIsEmailSent(true);
    }catch(error){
      toast.error(error.message);
    }
  }

  const onSubmitOtp = async(e)=>{
    e.preventDefault();
    const otpArray = inputRefs.current.map(e => e.value)
    setOtp(otpArray.join(''))
    setIsOtpSubmited(true)
  }

  const onSubmitNewPassword = async(e)=>{
    e.preventDefault();
    try{
      const {data} = await axios.post(backendUrl + '/api/auth/reset-password', {email, otp, newPassword})
      if(data.success){
        toast.success(data.message);
      }else{
        toast.error(data.message);
      }
      data.success && navigate('/login')
    }catch(error){
      toast.error(error.message);
    }
  }

  return (
    <div className='reset'>
      <div className='reset-logo'>
        <img onClick={() => navigate('/')} src="/logo.svg" alt="" className='reset-img' />
      </div>

      {!isEmailSent &&
        <form onSubmit={onSubmitMail}>
          <h1>Reset Password</h1>
          <p>Enter your registered email address</p>
          <div className='input'>
            <img src="/mail_icon.svg" alt="Icon" />
            <input type="email" placeholder='Email Id' value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <button className='reset-btn'>Submit Email</button>
        </form>
      }

      {!isOtpSubmited && isEmailSent &&
        <form onSubmit={onSubmitOtp}>
          <h1>Reset password OTP</h1>
          <p>Enter 6-digit code sent to your email Id.</p>
          <div className='email-input' onPaste={handlePaste}>
            {Array(6).fill(0).map((_, index) => (
              <input type="text" maxLength='1' key={index} required ref={e => inputRefs.current[index] = e} onInput={(e) => handleInput(e, index)} onKeyDown={(e) => handleKeyDown(e, index)} />
            ))}
          </div>
          <button className='verify-btn' type='submit'>Submit OTP</button>
        </form>
      }

      {isOtpSubmited && isEmailSent &&
        <form onSubmit={onSubmitNewPassword}>
          <h1>New Password</h1>
          <p>Enter your new password below</p>
          <div className='input'>
            <img src="/lock_icon.svg" alt="Icon" />
            <input type="password" placeholder='password' value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
          </div>
          <button className='reset-btn'>Reset</button>
        </form>
      }

    </div>
  )
}

export default ResetPassword
