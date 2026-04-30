import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc    Upload image to Cloudinary
// @route   POST /api/uploads/image
// @access  Private
export const uploadImage = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new ErrorResponse('Please upload a file', 400));
  }

  res.status(200).json({
    success: true,
    data: req.file.path, // Cloudinary URL
  });
});

// @desc    Upload multiple images
// @route   POST /api/uploads/images
// @access  Private
export const uploadImages = asyncHandler(async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return next(new ErrorResponse('Please upload files', 400));
  }

  const urls = req.files.map(file => file.path);

  res.status(200).json({
    success: true,
    data: urls,
  });
});
