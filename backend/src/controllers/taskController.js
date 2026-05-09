const { ErrorHandler, asyncHandler } = require('../utils/errorHandler');
const { TaskModel } = require('../models/Task');

// @route   POST /api/v1/tasks
// @desc    Create a new task
// @access  Private
exports.createTask = asyncHandler(async (req, res) => {
  const { title, description, priority } = req.body;

  const task = await TaskModel.create(title, description, req.user.id, priority);

  res.status(201).json({
    success: true,
    message: 'Task created successfully',
    data: task
  });
});

// @route   GET /api/v1/tasks
// @desc    Get all user tasks
// @access  Private
exports.getUserTasks = asyncHandler(async (req, res) => {
  const tasks = await TaskModel.findByUserId(req.user.id);

  res.status(200).json({
    success: true,
    data: tasks
  });
});

// @route   GET /api/v1/tasks/:id
// @desc    Get task by ID
// @access  Private
exports.getTaskById = asyncHandler(async (req, res) => {
  const task = await TaskModel.findById(req.params.id);

  if (!task) {
    throw new ErrorHandler('Task not found', 404);
  }

  // Check if user owns the task
  if (task.userId.toString() !== req.user.id && req.user.role !== 'admin') {
    throw new ErrorHandler('Not authorized to access this task', 403);
  }

  res.status(200).json({
    success: true,
    data: task
  });
});

// @route   PUT /api/v1/tasks/:id
// @desc    Update task
// @access  Private
exports.updateTask = asyncHandler(async (req, res) => {
  const { title, description, priority, status } = req.body;

  const task = await TaskModel.findById(req.params.id);

  if (!task) {
    throw new ErrorHandler('Task not found', 404);
  }

  // Check if user owns the task
  if (task.userId.toString() !== req.user.id && req.user.role !== 'admin') {
    throw new ErrorHandler('Not authorized to update this task', 403);
  }

  const updates = {};
  if (title !== undefined) updates.title = title;
  if (description !== undefined) updates.description = description;
  if (priority !== undefined) updates.priority = priority;
  if (status !== undefined) updates.status = status;

  const updatedTask = await TaskModel.update(req.params.id, updates);

  res.status(200).json({
    success: true,
    message: 'Task updated successfully',
    data: updatedTask
  });
});

// @route   DELETE /api/v1/tasks/:id
// @desc    Delete task
// @access  Private
exports.deleteTask = asyncHandler(async (req, res) => {
  const task = await TaskModel.findById(req.params.id);

  if (!task) {
    throw new ErrorHandler('Task not found', 404);
  }

  // Check if user owns the task
  if (task.userId.toString() !== req.user.id && req.user.role !== 'admin') {
    throw new ErrorHandler('Not authorized to delete this task', 403);
  }

  await TaskModel.delete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Task deleted successfully'
  });
});

// @route   GET /api/v1/tasks/stats/overview
// @desc    Get task statistics
// @access  Private
exports.getTaskStats = asyncHandler(async (req, res) => {
  const stats = await TaskModel.getStats(req.user.id);

  res.status(200).json({
    success: true,
    data: stats
  });
});

// @route   GET /api/v1/tasks/all (Admin)
// @desc    Get all tasks (Admin only)
// @access  Private/Admin
exports.getAllTasks = asyncHandler(async (req, res) => {
  const allTasks = await TaskModel.findAll();

  res.status(200).json({
    success: true,
    data: allTasks
  });
});
