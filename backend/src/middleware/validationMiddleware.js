const { body, param, validationResult } = require('express-validator');

// Validate voucher request data
exports.validateVoucherRequest = [
  body('userId').isUUID().withMessage('Invalid userId format'),
  body('positiveBehaviour').isString().withMessage('Positive behaviour is required'),
  body('requestedVouchers').isInt({ min: 1 }).withMessage('Requested vouchers must be a positive integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];

// Validate item request data
exports.validateItemRequest = [
  body('userId').isUUID().withMessage('Invalid userId format'),
  body('itemId').isUUID().withMessage('Invalid itemId format'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
  body('isPreorder').isBoolean().withMessage('isPreorder must be true or false'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];
