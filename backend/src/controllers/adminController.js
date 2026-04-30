import supabase from '../config/supabaseClient.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc    Get admin dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private (Admin)
export const getDashboardStats = asyncHandler(async (req, res, next) => {
  const { count: totalUsers } = await supabase.from('users').select('*', { count: 'exact', head: true }).eq('role', 'user');
  const { count: totalPharmacies } = await supabase.from('pharmacies').select('*', { count: 'exact', head: true });
  const { count: verifiedPharmacies } = await supabase.from('pharmacies').select('*', { count: 'exact', head: true }).eq('verification_status', 'verified');
  const { count: totalMedicines } = await supabase.from('medicines').select('*', { count: 'exact', head: true });
  const { count: totalInquiries } = await supabase.from('inquiries').select('*', { count: 'exact', head: true });

  res.status(200).json({
    success: true,
    data: {
      totalUsers: totalUsers || 0,
      totalPharmacies: totalPharmacies || 0,
      verifiedPharmacies: verifiedPharmacies || 0,
      totalMedicines: totalMedicines || 0,
      totalInquiries: totalInquiries || 0
    }
  });
});

// @desc    Get all pharmacies for admin
// @route   GET /api/admin/pharmacies
// @access  Private (Admin)
export const getAllPharmacies = asyncHandler(async (req, res, next) => {
  const { data: pharmacies, error } = await supabase
    .from('pharmacies')
    .select(`
      *,
      users:owner_id (name, email)
    `);

  if (error) {
    return next(new ErrorResponse(error.message, 400));
  }

  res.status(200).json({
    success: true,
    count: pharmacies.length,
    data: pharmacies
  });
});

// @desc    Verify/Reject pharmacy
// @route   PUT /api/admin/pharmacies/:id/verify
// @access  Private (Admin)
export const updatePharmacyStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body; // verified or rejected

  const { data: pharmacy, error } = await supabase
    .from('pharmacies')
    .update({ verification_status: status })
    .eq('id', req.params.id)
    .select()
    .single();

  if (error || !pharmacy) {
    return next(new ErrorResponse(`Pharmacy not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: pharmacy
  });
});

// @desc    Get all users for admin
// @route   GET /api/admin/users
// @access  Private (Admin)
export const getAllUsers = asyncHandler(async (req, res, next) => {
  const { data: users, error } = await supabase
    .from('users')
    .select('*');

  if (error) {
    return next(new ErrorResponse(error.message, 400));
  }

  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
});
