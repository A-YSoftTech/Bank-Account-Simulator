import Transaction from '../models/transactionModel.js';

// Deposit function
export const deposit = async (req, res) => {
  const { amount } = req.body;

  const lastTransaction = await Transaction.findOne().sort({ date: -1 });
  let newBalance = lastTransaction ? lastTransaction.balanceAfter + amount : amount;

  const transaction = new Transaction({
    amount,
    type: 'deposit',
    balanceAfter: newBalance
  });

  try {
    await transaction.save();
    res.status(200).json({ message: 'Deposit successful', transaction });
  } catch (err) {
    res.status(500).json({ message: 'Error occurred during deposit', error: err });
  }
};

// Withdrawal function
export const withdrawal = async (req, res) => {
  const { amount } = req.body;

  const lastTransaction = await Transaction.findOne().sort({ date: -1 });
  if (!lastTransaction) {
    return res.status(400).json({ message: 'No balance available for withdrawal' });
  }

  let newBalance = lastTransaction.balanceAfter - amount;

  if (newBalance < 0) {
    return res.status(400).json({ message: 'Insufficient balance' });
  }

  const transaction = new Transaction({
    amount,
    type: 'withdrawal',
    balanceAfter: newBalance
  });

  try {
    await transaction.save();
    res.status(200).json({ message: 'Withdrawal successful', transaction });
  } catch (err) {
    res.status(500).json({ message: 'Error occurred during withdrawal', error: err });
  }
};

// Get transaction history
export const getTransactionHistory = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.status(200).json({ transactions });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching transaction history', error: err });
  }
};

// backend/controllers/transactionController.js
export const getLatestBalance = async (req, res) => {
    try {
      const lastTransaction = await Transaction.findOne().sort({ date: -1 });
      if (!lastTransaction) {
        return res.status(404).json({ message: 'No transactions found' });
      }
      res.status(200).json({ balanceAfter: lastTransaction.balanceAfter });
    } catch (err) {
      res.status(500).json({ message: 'Error fetching latest balance', error: err });
    }
  };
  

