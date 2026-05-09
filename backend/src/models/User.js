const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ROLES } = require('../config/constants');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: Object.values(ROLES), default: ROLES.USER },
  createdAt: { type: Date, default: Date.now }
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      return ret;
    }
  },
  toObject: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      return ret;
    }
  }
});

// Hash password before save
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.generateToken = function() {
  return jwt.sign({ id: this._id.toString(), email: this.email, role: this.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

const UserModel = {
  async create(username, email, password, role = ROLES.USER) {
    const user = new User({ username, email, password, role });
    await user.save();
    return user;
  },

  async findByEmail(email) {
    return await User.findOne({ email });
  },

  async findById(id) {
    return await User.findById(id);
  },

  async findAll() {
    return await User.find();
  },

  async updateUser(id, updates) {
    const user = await User.findByIdAndUpdate(id, updates, { new: true });
    return user;
  },

  async deleteUser(id) {
    return await User.findByIdAndDelete(id);
  }
};

module.exports = { User, UserModel };
