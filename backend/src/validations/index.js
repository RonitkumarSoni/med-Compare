import { body, validationResult } from 'express-validator';
import ErrorResponse from '../utils/errorResponse.js';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  
  // Get the first error message to show to the user in a friendly way
  const firstError = errors.array()[0].msg;
  
  console.log('❌ Validation Errors:', JSON.stringify(errors.array(), null, 2));
  return next(new ErrorResponse(firstError, 400));
};

export const registerValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone').notEmpty().withMessage('Phone number is required'),
];

export const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

export const medicineValidation = [
  body('name').notEmpty().withMessage('Please enter the medicine name.'),
  body('brand_name').optional().isString().withMessage('Manufacturer name must be text.'),
  body('available_quantity').optional().isNumeric().withMessage('Stock quantity must be a number.'),
  body('price').isNumeric().withMessage('Please enter a valid MRP (Price).'),
  body('selling_price').isNumeric().withMessage('Please enter a valid Selling Price.'),
  body('expiry_date').notEmpty().withMessage('Please select an expiry date.'),
  body('image_url').optional().isURL().withMessage('Please provide a valid image link (URL).'),
  body('dosage_form').optional().isString().withMessage('Please select a valid dosage form.'),
  body('dealer_name').optional().isString().withMessage('Dealer name must be text.'),
  body('dealer_number').optional().isString().withMessage('Dealer number must be a valid contact.'),
  body('latitude').optional({ nullable: true }).isNumeric().withMessage('Invalid location data.'),
  body('longitude').optional({ nullable: true }).isNumeric().withMessage('Invalid location data.'),
  body('shop_address').optional().isString().withMessage('Please enter a valid shop address.'),
];

export const pharmacyValidation = [
  body('shopName').notEmpty().withMessage('Shop name is required'),
  body('address').notEmpty().withMessage('Address is required'),
  body('phone').notEmpty().withMessage('Phone number is required'),
];
