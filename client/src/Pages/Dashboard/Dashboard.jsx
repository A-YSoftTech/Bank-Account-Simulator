import React from 'react'
import Header from '../../Components/Header/Header'
import './Dashboard.css'
import Navbar from '../../Components/Navbar/Navbar'
import Details from '../../Components/Details/Details'
import TransactionForm from '../../Components/TransactionForm/TransactionForm'
import TransactionHistory from '../../Components/TransactionHistory/TransactionHistory'

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <Navbar className='nav'/>
      <div className='dashboard-info'>
        <div className='dashboard-details'>
          <Details/>
        </div>
        <div className='dashboard-transaction'>
          <TransactionForm />
          <TransactionHistory />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
