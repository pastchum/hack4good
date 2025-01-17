const express = require('express');
const {
  getVoucherRequests,
  updateVoucherRequest,
  getItems,
  updateItemInventory,
  addNewUser,
  createTask,
  viewAllTasks,
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

// update users
router.post('/add-user', addNewUser);

router.post('/create-task', createTask);
// look at all tasks
router.get('/tasks', viewAllTasks);

module.exports = router;
