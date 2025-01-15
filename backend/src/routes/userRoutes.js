const express = require('express');
const {
  getVoucherBalance,
  requestVouchers,
  getAvailableItems,
  requestItem,
} = require('../controllers/userController');

const router = express.Router();

// Get voucher balance
router.get('/:userId/vouchers', getVoucherBalance);

// Request vouchers based on positive behaviour
router.post('/vouchers/request', requestVouchers);

// Get available items for redemption
router.get('/items', getAvailableItems);

// Request an item or place a pre-order
router.post('/items/request', requestItem);

module.exports = router;
