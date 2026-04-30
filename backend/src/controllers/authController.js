import supabase from '../config/supabaseClient.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, phone, role, city, state, shopName } = req.body;

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 1. Create user in 'users' table
  const { data: user, error: userError } = await supabase
    .from('users')
    .insert([
      { name, email, password: hashedPassword, phone, role, city, state }
    ])
    .select()
    .single();

  if (userError) {
    return next(new ErrorResponse(userError.message, 400));
  }

  // 2. If user is a pharmacy, create record in 'pharmacies' table
  if (role === 'pharmacy') {
    const { error: pharmError } = await supabase
      .from('pharmacies')
      .insert([
        { 
          owner_id: user.id, 
          shop_name: shopName, 
          contact_number: phone,
          city: city || 'Mumbai', // Fallback
          state: state || 'Maharashtra'
        }
      ]);

    if (pharmError) {
      console.error('Error creating pharmacy profile:', pharmError.message);
      // We don't block the user creation if pharmacy profile fail, 
      // but ideally we should handle this.
    }
  }

  sendTokenResponse(user, 201, res);
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check for user in Supabase
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !user) {
    return next(new ErrorResponse('User not found with this email', 401));
  }

  // Check if password matches
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return next(new ErrorResponse('Incorrect password. Please try again.', 401));
  }

  sendTokenResponse(user, 200, res);
});

// @desc    Log user out / clear cookie
// @route   GET /api/auth/logout
// @access  Private
export const logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res, next) => {
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', req.user.id)
    .single();

  if (error || !user) {
    return next(new ErrorResponse('User not found', 404));
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Update user details
// @route   PUT /api/auth/update-profile
// @access  Private
export const updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
    city: req.body.city,
    state: req.body.state,
    phone: req.body.phone
  };

  const { data: user, error } = await supabase
    .from('users')
    .update(fieldsToUpdate)
    .eq('id', req.user.id)
    .select()
    .single();

  if (error) {
    return next(new ErrorResponse(error.message, 400));
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Update password
// @route   PUT /api/auth/change-password
// @access  Private
export const updatePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  // 1. Get user from DB
  const { data: user, error } = await supabase
    .from('users')
    .select('password')
    .eq('id', req.user.id)
    .single();

  if (error || !user) {
    return next(new ErrorResponse('User not found', 404));
  }

  // 2. Check if current password matches
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return next(new ErrorResponse('Current password is incorrect', 401));
  }

  // 3. Hash new password and update
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  const { error: updateError } = await supabase
    .from('users')
    .update({ password: hashedPassword })
    .eq('id', req.user.id);

  if (updateError) {
    return next(new ErrorResponse(updateError.message, 400));
  }

  res.status(200).json({
    success: true,
    message: 'Password updated successfully'
  });
});

// Get token, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token manually (since we are using Supabase as DB only)
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const options = {
    expires: new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
};
