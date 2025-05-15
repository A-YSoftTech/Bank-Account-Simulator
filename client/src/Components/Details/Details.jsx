import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import './Details.css'
import { AppContent } from '../../Context/AppContext/AppContext'
import { toast } from 'react-toastify';

const Details = () => {
  const { userData } = useContext(AppContent);
  const [balance, setBalance] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(()=>{
    const fetchLatestBalance = async ()=>{
      try{
        const response = await axios.get('http://localhost:5500/api/transactions/latest-balance');
        setBalance(response.data.balanceAfter);
      }catch(error){
        setMessage(error.response?.data?.message || 'Error fetching balance');
        toast.error(error.message);
      }
    };
    fetchLatestBalance();
  }, [])

  // Conditional style for the verification status
  const verificationStyle = {
    color: userData.isAccountVerified === false ? 'red' : 'green',
  };

  

  return (
    <div className='details'>
      <img src="/person_icon.svg" alt="Image" className='details-img' />
      <h2 className='header-h2'>Account number (A/c) : <i>{userData.id}</i></h2>
      <p className='header-h2'>Name : <i>{userData.name}</i></p>
      <p className='header-h2'>Email : <i>{userData.email}</i></p>
      {message && <p>{message}</p>}
      <p className='header-h2'>Amount : ₹<i>{balance !== null ? `${balance}` : '00'}</i></p>
      <p className='header-h2'>
        Account verification : 
        <i style={verificationStyle}>
          {userData.isAccountVerified === false ? ' Pending...' : ' Done'}
        </i>
      </p>
    </div>
  );
}

export default Details;
