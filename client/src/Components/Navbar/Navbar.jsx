import React, { useContext } from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../../Context/AppContext/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedIn } = useContext(AppContent);

  const sendVerificationOtp = async()=>{
    try{
      axios.defaults.withCredentials = true;
      const {data} = await axios.post(backendUrl + "/api/auth/send-verify-otp")

      if(data.success){
        navigate('/email-verify')
        toast.success(data.message)
      }else{
        toast.error(data.message);
      }

    }catch(error){
      toast.error(error.message);
    }
  }

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/logout');

      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userData');

      data.success && setIsLoggedIn(false)
      data.success && setUserData(false)
      navigate('/')

    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <div className='nav'>
        <img src="/logo.svg" alt="Logo" className='nav-logo' />

        {userData ?
          <div className='navbar-name'>{userData.name[0].toUpperCase()}
            <div className='navbar-name-menu'>
              <ul>
                {!userData.isAccountVerified && <li onClick={sendVerificationOtp}>Verify E-mail</li>}
                <li onClick={logout}>Logout</li>
              </ul>
            </div>
          </div>
          : <button onClick={() => navigate('/login')} className='nav-btn'>Login
            <img src="/arrow_icon.svg" alt="" /></button>}


      </div>
    </>
  )
}

export default Navbar
