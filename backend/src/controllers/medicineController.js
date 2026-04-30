import supabase from '../config/supabaseClient.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc    Add medicine
// @route   POST /api/medicines
// @access  Private (Pharmacy)
export const addMedicine = asyncHandler(async (req, res, next) => {
  // Find pharmacy for the user
  let { data: pharmacy, error: pharmacyError } = await supabase
    .from('pharmacies')
    .select('id')
    .eq('owner_id', req.user.id)
    .single();

  // If pharmacy not found, try to auto-create one if user is a pharmacy owner
  if (pharmacyError || !pharmacy) {
    if (req.user.role === 'pharmacy' || req.user.role === 'admin') {
      const { data: newPharmacy, error: createError } = await supabase
        .from('pharmacies')
        .insert([
          { 
            owner_id: req.user.id, 
            shop_name: req.user.name + "'s Pharmacy",
            shop_address: `${req.user.city || 'Mumbai'}, ${req.user.state || 'Maharashtra'}`,
            city: req.user.city || 'Mumbai',
            state: req.user.state || 'Maharashtra',
            contact_number: req.user.phone || '0000000000'
          }
        ])
        .select()
        .single();
      
      if (createError) {
        return next(new ErrorResponse('Could not register pharmacy automatically. Please contact support.', 500));
      }
      pharmacy = newPharmacy;
    } else {
      return next(new ErrorResponse('Please register your pharmacy first', 400));
    }
  }

  const medicineData = {
    ...req.body,
    pharmacy_id: pharmacy.id
  };

  const { data: medicine, error } = await supabase
    .from('medicines')
    .insert([medicineData])
    .select()
    .single();

  if (error) {
    return next(new ErrorResponse(error.message, 400));
  }

  res.status(201).json({
    success: true,
    data: medicine,
  });
});

// @desc    Get all medicines with filters
// @route   GET /api/medicines
// @access  Public
export const getMedicines = asyncHandler(async (req, res, next) => {
  const { search, q, name, sort, page = 1, limit = 10, pharmacyId } = req.query;
  const searchQuery = search || q || name;
  
  let query = supabase
    .from('medicines')
    .select('*, pharmacies(*)', { count: 'exact' });

  // Filter by pharmacy if provided
  if (pharmacyId) {
    query = query.eq('pharmacy_id', pharmacyId);
  }

  // Search by name
  if (searchQuery) {
    query = query.or(`name.ilike."%${searchQuery}%",brand_name.ilike."%${searchQuery}%",generic_name.ilike."%${searchQuery}%"`);
  }

  // Sort
  if (sort) {
    const [field, order] = sort.split(':');
    // Map camelCase to snake_case for sorting if needed
    const fieldMap = {
      'availableQuantity': 'available_quantity',
      'sellingPrice': 'selling_price',
      'expiryDate': 'expiry_date'
    };
    const dbField = fieldMap[field] || field;
    query = query.order(dbField, { ascending: order !== 'desc' });
  } else {
    query = query.order('created_at', { ascending: false });
  }

  // Pagination
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);

  const { data: medicines, error, count } = await query;

  if (error) {
    return next(new ErrorResponse(error.message, 400));
  }

  // Map snake_case to camelCase for frontend
  const mappedMedicines = medicines.map(m => ({
    ...m,
    brandName: m.brand_name,
    genericName: m.generic_name,
    availableQuantity: m.available_quantity,
    expiryDate: m.expiry_date,
    sellingPrice: m.selling_price,
    imageUrl: m.image_url,
    isActive: m.is_active,
    isApproved: m.is_approved
  }));

  res.status(200).json({
    success: true,
    count: medicines.length,
    total: count,
    data: mappedMedicines,
  });
});

// @desc    Get single medicine
// @route   GET /api/medicines/:id
// @access  Public
export const getMedicine = asyncHandler(async (req, res, next) => {
  const { data: medicine, error } = await supabase
    .from('medicines')
    .select('*, pharmacies(*)')
    .eq('id', req.params.id)
    .single();

  if (error || !medicine) {
    return next(new ErrorResponse(`Medicine not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: medicine,
  });
});

// @desc    Compare medicines
// @route   GET /api/medicines/compare
// @access  Public
export const compareMedicines = asyncHandler(async (req, res, next) => {
  const { name, q } = req.query;
  const searchQuery = name || q;

  if (!searchQuery) {
    return next(new ErrorResponse('Please provide a medicine name to compare', 400));
  }

  const { data: listings, error } = await supabase
    .from('medicines')
    .select('*, pharmacies(*)')
    .or(`name.ilike."%${searchQuery}%",generic_name.ilike."%${searchQuery}%",brand_name.ilike."%${searchQuery}%"`)
    .eq('is_active', true);

  if (error) {
    return next(new ErrorResponse(error.message, 400));
  }

  if (!listings || listings.length === 0) {
    return res.status(200).json({
      success: true,
      data: { listings: [], insights: null }
    });
  }

  const sortedByPrice = [...listings].sort((a, b) => (a.selling_price || 0) - (b.selling_price || 0));
  const cheapest = sortedByPrice[0];
  const bestValue = [...listings].sort((a, b) => (b.discount_percentage || 0) - (a.discount_percentage || 0))[0];

  // Map to camelCase to match frontend expectations consistently
  const mappedListings = listings.map(m => ({
    ...m,
    brandName: m.brand_name,
    genericName: m.generic_name,
    availableQuantity: m.available_quantity,
    expiryDate: m.expiry_date,
    sellingPrice: m.selling_price,
    discountPercentage: m.discount_percentage,
    imageUrl: m.image_url,
    isActive: m.is_active,
    isApproved: m.is_approved
  }));

  res.status(200).json({
    success: true,
    count: mappedListings.length,
    data: {
      listings: mappedListings,
      insights: {
        cheapestId: cheapest.id,
        bestValueId: bestValue.id,
        priceRange: {
          min: sortedByPrice[0].selling_price || 0,
          max: sortedByPrice[sortedByPrice.length - 1].selling_price || 0
        }
      }
    }
  });
});

// @desc    Update medicine
// @route   PUT /api/medicines/:id
// @access  Private (Pharmacy owner)
export const updateMedicine = asyncHandler(async (req, res, next) => {
  // Check authorization
  const { data: pharmacy, error: pharmacyError } = await supabase
    .from('pharmacies')
    .select('id')
    .eq('owner_id', req.user.id)
    .single();

  if (pharmacyError || !pharmacy) {
    return next(new ErrorResponse('Not authorized to update medicines', 401));
  }

  const { data: medicine, error } = await supabase
    .from('medicines')
    .update(req.body)
    .eq('id', req.params.id)
    .eq('pharmacy_id', pharmacy.id)
    .select()
    .single();

  if (error || !medicine) {
    return next(new ErrorResponse('Medicine not found or not authorized', 404));
  }

  res.status(200).json({
    success: true,
    data: medicine,
  });
});

// @desc    Delete medicine
// @route   DELETE /api/medicines/:id
// @access  Private (Pharmacy owner)
export const deleteMedicine = asyncHandler(async (req, res, next) => {
  const { data: pharmacy, error: pharmacyError } = await supabase
    .from('pharmacies')
    .select('id')
    .eq('owner_id', req.user.id)
    .single();

  if (pharmacyError || !pharmacy) {
    return next(new ErrorResponse('Not authorized to delete medicines', 401));
  }

  const { error } = await supabase
    .from('medicines')
    .delete()
    .eq('id', req.params.id)
    .eq('pharmacy_id', pharmacy.id);

  if (error) {
    return next(new ErrorResponse('Error deleting medicine', 400));
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Get nearby medicines (Placeholder)
// @route   GET /api/medicines/nearby
// @access  Public
export const getNearbyMedicines = asyncHandler(async (req, res, next) => {
  const { data: medicines, error } = await supabase
    .from('medicines')
    .select('*, pharmacies(*)');

  if (error) {
    return next(new ErrorResponse(error.message, 400));
  }

  res.status(200).json({
    success: true,
    count: medicines.length,
    data: medicines
  });
});
