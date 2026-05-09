const express = require('express');
const { verifyToken, restrictToRole } = require('../middleware/authMiddleware');
const { validateTask } = require('../utils/validators');
const taskController = require('../controllers/taskController');

const router = express.Router();

// All task routes require authentication
router.use(verifyToken);

/**
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 */
router.post('/', validateTask, taskController.createTask);

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Get all user tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', taskController.getUserTasks);

/**
 * @swagger
 * /api/v1/tasks/stats/overview:
 *   get:
 *     summary: Get task statistics
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 */
router.get('/stats/overview', taskController.getTaskStats);

/**
 * @swagger
 * /api/v1/tasks/all:
 *   get:
 *     summary: Get all tasks (Admin only)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 */
router.get('/all', restrictToRole('admin'), taskController.getAllTasks);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   get:
 *     summary: Get task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', taskController.getTaskById);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   put:
 *     summary: Update task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', validateTask, taskController.updateTask);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   delete:
 *     summary: Delete task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', taskController.deleteTask);

module.exports = router;
