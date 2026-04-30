import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';
import supabase from '../config/supabaseClient.js';

// Protect routes
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  }
  // Set token from cookie
  else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    console.log('❌ Auth Error: No token provided');
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    let decoded;
    let userId;

    // 1. Try to verify as our custom JWT (HS256)
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.id;
      console.log('✅ Custom JWT Verified, ID:', userId);
    } catch (jwtErr) {
      // 2. If custom verification fails (e.g. invalid algorithm), try Supabase
      console.log('ℹ️ Custom JWT failed, trying Supabase Auth...');
      const { data: { user: sbUser }, error: sbError } = await supabase.auth.getUser(token);
      
      if (sbError || !sbUser) {
        throw new Error(sbError?.message || 'Invalid token');
      }
      
      userId = sbUser.id;
      console.log('✅ Supabase JWT Verified, ID:', userId);
    }

    // Fetch full user details from our DB
    let { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    // AUTO-SYNC: If user exists in Auth but not in our 'users' table (Social Login first time)
    if (error || !user) {
      console.log('ℹ️ User missing from DB, attempting to auto-sync...');
      const { data: { user: sbUser } } = await supabase.auth.getUser(token);
      
      if (sbUser) {
        const { data: newUser, error: createError } = await supabase
          .from('users')
          .insert([
            { 
              id: sbUser.id, 
              email: sbUser.email, 
              name: sbUser.user_metadata?.full_name || sbUser.email.split('@')[0],
              role: 'user' // Default to user, can be upgraded to pharmacy
            }
          ])
          .select()
          .single();
        
        if (createError) {
          console.log('❌ Auto-sync failed:', createError.message);
          return next(new ErrorResponse('Could not sync user profile', 500));
        }
        user = newUser;
        console.log('✅ User auto-synced to DB:', user.email);
      } else {
        return next(new ErrorResponse('No user found with this id', 404));
      }
    }

    req.user = user;
    next();
  } catch (err) {
    console.log('❌ Auth Verification Error:', err.message);
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
});

// Grant access to specific roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
