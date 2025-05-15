import React, { useState } from 'react';
import axios from 'axios';
import './TransactionForm.css'
import { toast } from 'react-toastify';

const TransactionForm = () => {
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('deposit');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url =
      transactionType === 'deposit'
        ? 'http://localhost:5500/api/transactions/deposit'
        : 'http://localhost:5500/api/transactions/withdrawal';

    try {
      const response = await axios.post(url, { amount });
      setMessage(response.data.message);
      toast.success(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong');
      toast.error(error.message);
    }
  };

  return (
    <div className='trans-form'>
      <h2>{transactionType === 'deposit' ? 'Deposit' : 'Withdraw'}</h2>
      <p>Enter the amount</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Enter amount"
          required
        />
        <button type="submit">{transactionType === 'deposit' ? 'Deposit' : 'Withdraw'}</button>
      </form>
      <hr />
      <button className='trans-switch' onClick={() => setTransactionType(transactionType === 'deposit' ? 'withdrawal' : 'deposit')}>
        Switch to {transactionType === 'deposit' ? 'Withdrawal' : 'Deposit'}
      </button>
      <p>{message}</p>
    </div>
  );
};

export default TransactionForm;
