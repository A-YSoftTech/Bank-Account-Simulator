import express from 'express';
import { deposit, withdrawal, getTransactionHistory } from '../controllers/transactionController.js';
import { getLatestBalance } from '../controllers/transactionController.js';

const router = express.Router();

// Deposit and Withdrawal Routes
router.post('/deposit', deposit);
router.post('/withdrawal', withdrawal);
router.get('/history', getTransactionHistory);
router.get('/latest-balance', getLatestBalance);

export default router;
