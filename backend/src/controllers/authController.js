const { ErrorHandler, asyncHandler } = require('../utils/errorHandler');
const { UserModel, User } = require('../models/User');
const { ROLES } = require('../config/constants');

// @route   POST /api/v1/auth/register
// @desc    Register a new user
// @access  Public
exports.register = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  // Check if user exists
  const existingUser = await UserModel.findByEmail(email);
  if (existingUser) {
    throw new ErrorHandler('User already exists with this email', 409);
  }

  // Create user with default USER role
  const user = await UserModel.create(username, email, password, ROLES.USER);

  const token = user.generateToken();

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      user: user.toJSON(),
      token
    }
  });
});

// @route   POST /api/v1/auth/login
// @desc    Login user
// @access  Public
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await UserModel.findByEmail(email);
  if (!user) {
    throw new ErrorHandler('Invalid email or password', 401);
  }

  // Compare password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new ErrorHandler('Invalid email or password', 401);
  }

  const token = user.generateToken();

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      user: user.toJSON(),
      token
    }
  });
});

// @route   GET /api/v1/auth/profile
// @desc    Get current user profile
// @access  Private
exports.getProfile = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user.id);
  
  if (!user) {
    throw new ErrorHandler('User not found', 404);
  }

  res.status(200).json({
    success: true,
    data: user.toJSON()
  });
});

// @route   PUT /api/v1/auth/profile
// @desc    Update user profile
// @access  Private
exports.updateProfile = asyncHandler(async (req, res) => {
  const { username } = req.body;
  
  const user = await UserModel.updateUser(req.user.id, { username });
  
  if (!user) {
    throw new ErrorHandler('User not found', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: user.toJSON()
  });
});

// @route   GET /api/v1/auth/users
// @desc    Get all users (Admin only)
// @access  Private/Admin
exports.getAllUsers = asyncHandler(async (req, res) => {
  const allUsers = await UserModel.findAll();

  res.status(200).json({
    success: true,
    data: allUsers.map(u => u.toJSON())
  });
});

// @route   DELETE /api/v1/auth/users/:id
// @desc    Delete user (Admin only)
// @access  Private/Admin
exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await UserModel.deleteUser(req.params.id);

  if (!user) {
    throw new ErrorHandler('User not found', 404);
  }

  res.status(200).json({
    success: true,
    message: 'User deleted successfully',
    data: user.toJSON()
  });
});
