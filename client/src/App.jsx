
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './Pages/Login/Login'
import ResetPassword from './Pages/ResetPassword/ResetPassword'
import Default from './Pages/Default/Default'
import EmailVerify from './Pages/EmailVerify/EmailVerify'
import { ToastContainer} from 'react-toastify'
import Dashboard from './Pages/Dashboard/Dashboard'
function App() {
  return (
    <>
      <div>
        <ToastContainer/>
        <Routes>
          <Route path='/' element={<Default/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/email-verify' element={<EmailVerify/>} />
          <Route path='/reset-password' element={<ResetPassword/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
        </Routes>
      </div>
    </>
  )
}

export default App
