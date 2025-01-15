const express = require('express');
const {
  getVoucherRequests,
  updateVoucherRequest,
  getItems,
  updateItemInventory,
} = require('../controllers/adminController');

const router = express.Router();

// Get all voucher requests from users
router.get('/voucher-requests', getVoucherRequests);

// Approve or reject voucher requests
router.put('/voucher-requests/:requestId', updateVoucherRequest);

// Get all items in inventory
router.get('/items', getItems);

// Update inventory stock or voucher cost
router.put('/items/:itemId', updateItemInventory);

module.exports = router;
