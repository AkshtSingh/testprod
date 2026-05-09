const express = require('express');
const { verifyToken, restrictToRole } = require('../middleware/authMiddleware');
const { validateTask } = require('../utils/validators');
const taskController = require('../controllers/taskController');

const router = express.Router();

// All task routes require authentication
router.use(verifyToken);

router.post('/', validateTask, taskController.createTask);

router.get('/', taskController.getUserTasks);

router.get('/stats/overview', taskController.getTaskStats);

router.get('/all', restrictToRole('admin'), taskController.getAllTasks);

router.get('/:id', taskController.getTaskById);

router.put('/:id', validateTask, taskController.updateTask);

router.delete('/:id', taskController.deleteTask);

module.exports = router;
