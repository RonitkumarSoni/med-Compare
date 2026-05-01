import supabase from '../config/supabaseClient.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc    Create new inquiry
// @route   POST /api/inquiries
// @access  Private
export const createInquiry = asyncHandler(async (req, res, next) => {
  const inquiryData = {
    ...req.body,
    user_id: req.user.id
  };

  const { data: inquiry, error } = await supabase
    .from('inquiries')
    .insert([inquiryData])
    .select()
    .single();

  if (error) {
    return next(new ErrorResponse(error.message, 400));
  }

  // Notify pharmacy owner (Simple notification insert)
  const { data: pharmacy } = await supabase
    .from('pharmacies')
    .select('owner_id')
    .eq('id', req.body.pharmacy_id)
    .single();

  if (pharmacy) {
    await supabase.from('notifications').insert([
      {
        user_id: pharmacy.owner_id,
        title: 'New Inquiry Received',
        message: `You have received a new inquiry from ${req.user.name}`,
        type: 'inquiry'
      }
    ]);
  }

  res.status(201).json({
    success: true,
    data: inquiry,
  });
});

// @desc    Get my inquiries (as user)
// @route   GET /api/inquiries/my
// @access  Private
export const getMyInquiries = asyncHandler(async (req, res, next) => {
  const { data: inquiries, error } = await supabase
    .from('inquiries')
    .select('*, pharmacies(*)')
    .eq('user_id', req.user.id);

  if (error) {
    return next(new ErrorResponse(error.message, 400));
  }

  res.status(200).json({
    success: true,
    count: inquiries.length,
    data: inquiries,
  });
});

// @desc    Get pharmacy inquiries (as owner)
// @route   GET /api/inquiries/pharmacy
// @access  Private (Pharmacy)
export const getPharmacyInquiries = asyncHandler(async (req, res, next) => {
  const { data: pharmacy, error: pError } = await supabase
    .from('pharmacies')
    .select('id')
    .eq('owner_id', req.user.id)
    .single();

  if (pError || !pharmacy) {
    return next(new ErrorResponse('Pharmacy not found', 404));
  }

  const { data: inquiries, error } = await supabase
    .from('inquiries')
    .select('*, users(*)')
    .eq('pharmacy_id', pharmacy.id);

  if (error) {
    return next(new ErrorResponse(error.message, 400));
  }

  res.status(200).json({
    success: true,
    count: inquiries.length,
    data: inquiries,
  });
});

// @desc    Respond to inquiry
// @route   PUT /api/inquiries/:id/respond
// @access  Private (Pharmacy)
export const respondToInquiry = asyncHandler(async (req, res, next) => {
  const { data: inquiry, error: fError } = await supabase
    .from('inquiries')
    .select('*, pharmacies(id, owner_id, shop_name)')
    .eq('id', req.params.id)
    .single();

  if (fError || !inquiry) {
    return next(new ErrorResponse(`Inquiry not found with id of ${req.params.id}`, 404));
  }

  if (inquiry.pharmacies.owner_id !== req.user.id) {
    return next(new ErrorResponse('Not authorized to respond to this inquiry', 401));
  }

  const { data: updatedInquiry, error } = await supabase
    .from('inquiries')
    .update({ ...req.body, status: 'responded' })
    .eq('id', req.params.id)
    .select()
    .single();

  if (error) {
    return next(new ErrorResponse(error.message, 400));
  }

  // Notify user
  await supabase.from('notifications').insert([
    {
      user_id: inquiry.user_id,
      title: 'Pharmacy Responded',
      message: `${inquiry.pharmacies.shop_name} has responded to your inquiry`,
      type: 'inquiry'
    }
  ]);

  res.status(200).json({
    success: true,
    data: updatedInquiry,
  });
});
