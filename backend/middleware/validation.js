const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array()
    });
  }
  next();
};

const userValidation = {
  register: [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ min: 2, max: 50 })
      .withMessage('Name must be between 2 and 50 characters'),
    
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email'),
    
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
    
    body('role')
      .optional()
      .isIn(['student', 'mess_staff', 'ngo'])
      .withMessage('Invalid role'),
    
    body('hostel')
      .if(body('role').isIn(['student', 'mess_staff']))
      .notEmpty()
      .withMessage('Hostel is required for students and mess staff'),
    
    handleValidationErrors
  ],

  login: [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email'),
    
    body('password')
      .notEmpty()
      .withMessage('Password is required'),
    
    handleValidationErrors
  ]
};

const bookingValidation = {
  create: [
    body('mealType')
      .isIn(['breakfast', 'lunch', 'snacks', 'dinner'])
      .withMessage('Invalid meal type'),
    
    body('date')
      .isISO8601()
      .withMessage('Invalid date format')
      .custom((value) => {
        const bookingDate = new Date(value);
        const today = new Date();
        const maxDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
        
        if (bookingDate < today.setHours(0, 0, 0, 0)) {
          throw new Error('Cannot book meals for past dates');
        }
        
        if (bookingDate > maxDate) {
          throw new Error('Cannot book meals more than 7 days in advance');
        }
        
        return true;
      }),
    
    body('portions')
      .optional()
      .isInt({ min: 1, max: 3 })
      .withMessage('Portions must be between 1 and 3'),
    
    handleValidationErrors
  ]
};

const surplusValidation = {
  log: [
    body('mealType')
      .isIn(['breakfast', 'lunch', 'snacks', 'dinner'])
      .withMessage('Invalid meal type'),
    
    body('quantity')
      .isFloat({ min: 0.1 })
      .withMessage('Quantity must be greater than 0'),
    
    body('expiryTime')
      .isISO8601()
      .withMessage('Invalid expiry time format')
      .custom((value) => {
        const expiryTime = new Date(value);
        const now = new Date();
        const maxExpiry = new Date(now.getTime() + 12 * 60 * 60 * 1000);
        
        if (expiryTime <= now) {
          throw new Error('Expiry time must be in the future');
        }
        
        if (expiryTime > maxExpiry) {
          throw new Error('Expiry time cannot be more than 12 hours from now');
        }
        
        return true;
      }),
    
    handleValidationErrors
  ]
};

module.exports = {
  userValidation,
  bookingValidation,
  surplusValidation,
  handleValidationErrors
};
