const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ROLES } = require('../config/constants');

// In-memory database (for demo)
let users = [];
let userId = 1;

class User {
  constructor(username, email, hashedPassword, role = ROLES.USER) {
    this.id = userId++;
    this.username = username;
    this.email = email;
    this.password = hashedPassword;
    this.role = role;
    this.createdAt = new Date();
  }

  // Generate JWT token
  generateToken() {
    return jwt.sign(
      { id: this.id, email: this.email, role: this.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );
  }

  // Compare password
  static async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  // Hash password
  static async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  toJSON() {
    const { password, ...user } = this;
    return user;
  }
}

// User repository functions
const UserModel = {
  // Create user
  async create(username, email, password, role = ROLES.USER) {
    const hashedPassword = await User.hashPassword(password);
    const user = new User(username, email, hashedPassword, role);
    users.push(user);
    return user;
  },

  // Find user by email
  findByEmail(email) {
    return users.find(u => u.email === email);
  },

  // Find user by id
  findById(id) {
    return users.find(u => u.id === id);
  },

  // Find all users
  findAll() {
    return users;
  },

  // Update user
  updateUser(id, updates) {
    const user = users.find(u => u.id === id);
    if (user) {
      Object.assign(user, updates);
    }
    return user;
  },

  // Delete user
  deleteUser(id) {
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
      return users.splice(index, 1)[0];
    }
    return null;
  }
};

module.exports = { User, UserModel };
