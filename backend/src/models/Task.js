const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
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
    return task;
  },

  async findById(id) {
    return await Task.findById(id).lean();
  },

  async findByUserId(userId) {
    return await Task.find({ userId }).lean();
  },

  async findAll() {
    return await Task.find().lean();
  },

  async update(id, updates) {
    updates.updatedAt = Date.now();
    return await Task.findByIdAndUpdate(id, updates, { new: true }).lean();
  },

  async delete(id) {
    return await Task.findByIdAndDelete(id).lean();
  },

  async getStats(userId) {
    const userTasks = await Task.find({ userId }).lean();
    return {
      total: userTasks.length,
      pending: userTasks.filter(t => t.status === 'pending').length,
      completed: userTasks.filter(t => t.status === 'completed').length,
      inProgress: userTasks.filter(t => t.status === 'in_progress').length
    };
  }
};

module.exports = { Task, TaskModel };
