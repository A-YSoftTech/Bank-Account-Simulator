import React, { useContext , useEffect} from 'react'
import './Header.css'
import { AppContent } from '../../Context/AppContext/AppContext'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { userData } = useContext(AppContent);
  console.log(userData);
  const navigate = useNavigate();
  return (
    <div className='header'>
      <img src="/header_img.png" alt="Image"  className='header-img'/>
      <h1 className='header-h1'>Hey {userData ? userData.name : 'Developer'}! <img src="/hand_wave.png" alt="" className='header-hand'/></h1>
      <h2 className='header-h2'>Welcome to our app</h2>
      <p className='header-p'>Manage your finances anytime, anywhere with secure and seamless online banking.</p>
      <button onClick={() => navigate('/login')} className='header-btn'>Get Started</button>
    </div>
  )
}

export default Header
