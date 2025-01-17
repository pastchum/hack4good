const express = require("express");
const {
  getVoucherBalance,
  requestVouchers,
  getAvailableItems,
  requestItem,
  getItemDetails,
  getTrasactionHistory,
} = require("../controllers/userController");

const router = express.Router();

// Get voucher balance
router.get("/:userId/vouchers", getVoucherBalance);

// Request vouchers based on positive behaviour
router.post("/vouchers/request", requestVouchers);

// Get available items for redemption
router.get("/items", getAvailableItems);

// Get item details
router.get(`/items/:id`, getItemDetails);

// Request an item or place a pre-order
router.post("/items/request", requestItem);

// Request transaction history
router.get("/transactions/:id", getTrasactionHistory);

module.exports = router;
