const express = require("express");
const {
  getVoucherBalance,
  requestVoucher,
  getAvailableItems,
  requestItem,
  getItemDetails,
  getTrasactionHistory,
  getTransactionDetails,
  cancelTransaction,
  completeTask,
  getVoucherDetails,
} = require("../controllers/userController");

const router = express.Router();

// Get voucher balance
router.get("/:userId/vouchers", getVoucherBalance);

// Get voucher details
router.get("/vouchers/:id", getVoucherDetails);

// Request vouchers based on positive behaviour
router.post("/vouchers/request", requestVoucher);

// Get available items for redemption
router.get("/items", getAvailableItems);

// Get item details
router.get(`/items/:id`, getItemDetails);

// Request an item or place a pre-order
router.post("/items/request", requestItem);

// Request transaction history
router.get("/transactions/:id", getTrasactionHistory);

// Request transaction details
router.get("/transactions/get/:id", getTransactionDetails);

// Cancel Transaction
router.get("/transactions/cancel/:id", cancelTransaction);
router.post("/tasks/complete", completeTask);

module.exports = router;
