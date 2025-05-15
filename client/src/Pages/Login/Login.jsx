import React, {useContext, useState} from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../../Context/AppContext/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();

  const {backendUrl, setIsLoggedIn, getUserData} = useContext(AppContent);

  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e)=>{
    try{
      e.preventDefault();
      axios.defaults.withCredentials = true;
      if(state === 'Sign Up'){
        const {data} = await axios.post(backendUrl + '/api/auth/register', {name, email, password})

        if(data.success){
          setIsLoggedIn(true)
          getUserData()
          navigate('/')
        }else{
          toast.error(data.message)
        }
      }
      else{
        const {data} = await axios.post(backendUrl + '/api/auth/login', {email, password})

        if(data.success){
          setIsLoggedIn(true)
          getUserData()
          navigate('/dashboard')
        }else{
          toast.error(data.message)
        }
      }

    }catch(error){
      toast.error(error.message)
    }
  }

  return (
    <div className='login'>
      <div className='login-logo'>
      <img onClick={()=>navigate('/')} src="/logo.svg" alt="" className='login-img'/>
      </div>
      <div className='login-body'>
        <h2 className='login-body-h2'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</h2>
        <p className='login-body-p'>{state === 'Sign Up' ? 'Create your account' : 'Login to your account!'}</p>

        <form onSubmit={onSubmitHandler}>
          {state === 'Sign Up' && (<div className='input'>
            <img src="/person_icon.svg" alt="Icon" />
            <input onChange={e => setName(e.target.value)} value={name} type="text" placeholder='Full Name' required/>
          </div>)}
          <div className='input'>
            <img src="/mail_icon.svg" alt="Icon" />
            <input onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder='Email Id' required/>
          </div>
          <div className='input'>
            <img src="/lock_icon.svg" alt="Icon" />
            <input onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder='Password' required/>
          </div>
          <p onClick={()=>navigate('/reset-password')} className='forgot-pass'>Forgot Password?</p>
          <button className='login-btn'>{state}</button>
        </form>
        {state === 'Sign Up' ? (<p>Already have an account?{'  '}<span className='signUp' onClick={()=>setState('Login')}>Login here</span></p>) : (<p>Don't have an account?{'  '}<span className='signUp' onClick={()=>setState('Sign Up')}>Sign Up</span></p>)}
        
      </div>
    </div>
  )
}

export default Login
