
import './TransactionHistory.css';
import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PDFDocument, rgb } from 'pdf-lib';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5500/api/transactions/history');
        setTransactions(response.data.transactions);
      } catch (error) {
        setMessage(error.response?.data?.message || 'Error fetching transaction history');
        toast.error(error.message);
      }
    };

    fetchTransactionHistory();
  }, [message]);

  // Function to generate PDF
  const generatePDF = async () => {
    const doc = await PDFDocument.create();
    const page = doc.addPage([600, 400]);
    const { width, height } = page.getSize();
    
    // Add title
    page.drawText('Transaction History', {
      x: 50,
      y: height - 50,
      size: 20,
      color: rgb(0, 0, 0),
    });

    // Define table headers
    const tableHeaders = ['ID', 'Type', 'Amount', 'Balance After', 'Date'];
    const columnWidths = [150, 70, 70, 90, 150];

    // Add table rows with transaction data
    const tableRows = transactions.map((transaction) => [
      transaction._id,
      transaction.type,
      transaction.amount,
      transaction.balanceAfter,
      new Date(transaction.date).toLocaleString(),
    ]);

    let yPosition = height - 100; // Starting position for the table

    // Draw table headers
    tableHeaders.forEach((header, index) => {
      page.drawText(header, {
        x: 50 + columnWidths.slice(0, index).reduce((a, b) => a + b, 0),
        y: yPosition,
        size: 12,
        color: rgb(0, 0, 0),
      });
    });

    yPosition -= 20; // Move the position down after headers

    // Draw table rows
    tableRows.forEach((row) => {
      row.forEach((cell, index) => {
        page.drawText(cell.toString(), {
          x: 50 + columnWidths.slice(0, index).reduce((a, b) => a + b, 0),
          y: yPosition,
          size: 10,
          color: rgb(0, 0, 0),
        });
      });
      yPosition -= 20; // Move down after each row
    });

    // Serialize the document to bytes and save it
    const pdfBytes = await doc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'transaction-history.pdf';
    link.click();
  };

  return (
    <div className='trans-history'>
      <span><h2>Transaction History</h2><button onClick={generatePDF} title='Download PDF'></button></span>
      {message && <p>{message}</p>}
      
      <div className='trans-scroll'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Balance After</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="5">No transactions yet</td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td>{transaction._id}</td>
                  <td>{transaction.type}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.balanceAfter}</td>
                  <td>{new Date(transaction.date).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
