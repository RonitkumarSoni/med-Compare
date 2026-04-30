import supabase from '../config/supabaseClient.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc    Register pharmacy
// @route   POST /api/pharmacies
// @access  Private (Pharmacy owner)
export const registerPharmacy = asyncHandler(async (req, res, next) => {
  req.body.owner_id = req.user.id;

  // Check if owner already has a pharmacy
  const { data: existingPharmacy, error: fetchError } = await supabase
    .from('pharmacies')
    .select('id')
    .eq('owner_id', req.user.id)
    .single();

  if (existingPharmacy) {
    return next(new ErrorResponse('You already have a registered pharmacy', 400));
  }

  const { data: pharmacy, error } = await supabase
    .from('pharmacies')
    .insert([req.body])
    .select()
    .single();

  if (error) {
    return next(new ErrorResponse(error.message, 400));
  }

  res.status(201).json({
    success: true,
    data: pharmacy,
  });
});

// @desc    Get all pharmacies
// @route   GET /api/pharmacies
// @access  Public
export const getPharmacies = asyncHandler(async (req, res, next) => {
  const { data: pharmacies, error } = await supabase
    .from('pharmacies')
    .select('*');

  if (error) {
    return next(new ErrorResponse(error.message, 400));
  }

  res.status(200).json({
    success: true,
    count: pharmacies.length,
    data: pharmacies,
  });
});

// @desc    Get single pharmacy
// @route   GET /api/pharmacies/:id
// @access  Public
export const getPharmacy = asyncHandler(async (req, res, next) => {
  const { data: pharmacy, error } = await supabase
    .from('pharmacies')
    .select('*')
    .eq('id', req.params.id)
    .single();

  if (error || !pharmacy) {
    return next(new ErrorResponse(`Pharmacy not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: pharmacy,
  });
});

// @desc    Update pharmacy
// @route   PUT /api/pharmacies/:id
// @access  Private (Owner/Admin)
export const updatePharmacy = asyncHandler(async (req, res, next) => {
  const { data: pharmacy, error: fetchError } = await supabase
    .from('pharmacies')
    .select('owner_id')
    .eq('id', req.params.id)
    .single();

  if (fetchError || !pharmacy) {
    return next(new ErrorResponse(`Pharmacy not found with id of ${req.params.id}`, 404));
  }

  // Make sure user is pharmacy owner
  if (pharmacy.owner_id !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this pharmacy`, 401));
  }

  const { data: updatedPharmacy, error } = await supabase
    .from('pharmacies')
    .update(req.body)
    .eq('id', req.params.id)
    .select()
    .single();

  if (error) {
    return next(new ErrorResponse(error.message, 400));
  }

  res.status(200).json({
    success: true,
    data: updatedPharmacy,
  });
});

// @desc    Get pharmacy analytics
// @route   GET /api/pharmacies/:id/analytics
// @access  Private (Owner/Admin)
export const getPharmacyAnalytics = asyncHandler(async (req, res, next) => {
  const pharmacyId = req.params.id;

  // Total Medicines
  const { count: totalMedicines } = await supabase
    .from('medicines')
    .select('*', { count: 'exact', head: true })
    .eq('pharmacy_id', pharmacyId);

  // Low Stock
  const { count: lowStock } = await supabase
    .from('medicines')
    .select('*', { count: 'exact', head: true })
    .eq('pharmacy_id', pharmacyId)
    .lt('availableQuantity', 10);

  // Expiring Soon (next 90 days)
  const ninetyDaysFromNow = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const { count: expiringSoon } = await supabase
    .from('medicines')
    .select('*', { count: 'exact', head: true })
    .eq('pharmacy_id', pharmacyId)
    .lte('expiryDate', ninetyDaysFromNow);

  // Inquiries
  const { count: totalInquiries } = await supabase
    .from('inquiries')
    .select('*', { count: 'exact', head: true })
    .eq('pharmacy_id', pharmacyId);

  const { count: pendingInquiries } = await supabase
    .from('inquiries')
    .select('*', { count: 'exact', head: true })
    .eq('pharmacy_id', pharmacyId)
    .eq('status', 'pending');

  res.status(200).json({
    success: true,
    data: {
      totalMedicines: totalMedicines || 0,
      lowStock: lowStock || 0,
      expiringSoon: expiringSoon || 0,
      totalInquiries: totalInquiries || 0,
      pendingInquiries: pendingInquiries || 0
    }
  });
});

// @desc    Get current user pharmacy analytics
// @route   GET /api/pharmacies/my-analytics
// @access  Private (Pharmacy)
export const getMyPharmacyAnalytics = asyncHandler(async (req, res, next) => {
  const { data: pharmacy, error: pError } = await supabase
    .from('pharmacies')
    .select('id')
    .eq('owner_id', req.user.id)
    .single();

  if (pError || !pharmacy) {
    return next(new ErrorResponse('Pharmacy not found for this user', 404));
  }

  // Reuse the logic from getPharmacyAnalytics but for this pharmacy
  req.params.id = pharmacy.id;
  return getPharmacyAnalytics(req, res, next);
});
