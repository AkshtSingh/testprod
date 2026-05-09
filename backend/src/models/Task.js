const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      if (ret.userId && typeof ret.userId === 'object') {
        ret.ownerName = ret.userId.username;
        ret.ownerEmail = ret.userId.email;
        ret.userId = ret.userId._id?.toString();
      } else {
        ret.userId = ret.userId?.toString();
      }
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  },
  toObject: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      if (ret.userId && typeof ret.userId === 'object') {
        ret.ownerName = ret.userId.username;
        ret.ownerEmail = ret.userId.email;
        ret.userId = ret.userId._id?.toString();
      } else {
        ret.userId = ret.userId?.toString();
      }
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

taskSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Task = mongoose.model('Task', taskSchema);

const TaskModel = {
  async create(title, description, userId, priority = 'medium') {
    const task = new Task({ title, description, userId, priority });
    await task.save();
    return await task.populate('userId', 'username email role');
  },

  async findById(id) {
    return await Task.findById(id).populate('userId', 'username email role');
  },

  async findByUserId(userId) {
    return await Task.find({ userId }).populate('userId', 'username email role');
  },

  async findAll() {
    return await Task.find().populate('userId', 'username email role');
  },

  async update(id, updates) {
    updates.updatedAt = Date.now();
    return await Task.findByIdAndUpdate(id, updates, { new: true }).populate('userId', 'username email role');
  },

  async delete(id) {
    return await Task.findByIdAndDelete(id);
  },

  async getStats(userId) {
    const userTasks = await Task.find({ userId });
    return {
      total: userTasks.length,
      pending: userTasks.filter(t => t.status === 'pending').length,
      completed: userTasks.filter(t => t.status === 'completed').length,
      inProgress: userTasks.filter(t => t.status === 'in_progress').length
    };
  }
};

module.exports = { Task, TaskModel };
