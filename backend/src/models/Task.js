// In-memory database for tasks
let tasks = [];
let taskId = 1;

class Task {
  constructor(title, description, userId, priority = 'medium', status = 'pending') {
    this.id = taskId++;
    this.title = title;
    this.description = description;
    this.userId = userId;
    this.priority = priority;
    this.status = status;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

const TaskModel = {
  // Create task
  create(title, description, userId, priority = 'medium') {
    const task = new Task(title, description, userId, priority);
    tasks.push(task);
    return task;
  },

  // Find task by id
  findById(id) {
    return tasks.find(t => t.id === id);
  },

  // Find all tasks for a user
  findByUserId(userId) {
    return tasks.filter(t => t.userId === userId);
  },

  // Find all tasks
  findAll() {
    return tasks;
  },

  // Update task
  update(id, updates) {
    const task = tasks.find(t => t.id === id);
    if (task) {
      Object.assign(task, updates, { updatedAt: new Date() });
    }
    return task;
  },

  // Delete task
  delete(id) {
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      return tasks.splice(index, 1)[0];
    }
    return null;
  },

  // Get task statistics
  getStats(userId) {
    const userTasks = tasks.filter(t => t.userId === userId);
    return {
      total: userTasks.length,
      pending: userTasks.filter(t => t.status === 'pending').length,
      completed: userTasks.filter(t => t.status === 'completed').length,
      inProgress: userTasks.filter(t => t.status === 'in_progress').length
    };
  }
};

module.exports = { Task, TaskModel };
