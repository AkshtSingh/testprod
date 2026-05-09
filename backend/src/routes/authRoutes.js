const express = require('express');
const { verifyToken, restrictToRole, authorize } = require('../middleware/authMiddleware');
const { validateRegister, validateLogin, validate } = require('../utils/validators');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', validateRegister, authController.register);

router.post('/login', validateLogin, authController.login);

router.get('/profile', verifyToken, authController.getProfile);

router.put('/profile', verifyToken, authController.updateProfile);

router.get('/users', verifyToken, restrictToRole('admin'), authController.getAllUsers);

router.delete('/users/:id', verifyToken, restrictToRole('admin'), authController.deleteUser);

module.exports = router;
