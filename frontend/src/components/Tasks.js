import React, { useState } from 'react';
import { taskAPI } from '../services/api';
import '../styles/Tasks.css';

export const TaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await taskAPI.createTask(title, description, priority);
      setTitle('');
      setDescription('');
      setPriority('medium');
      setMessage('Task created successfully!');
      onTaskCreated();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-form-container">
      <h2>Create New Task</h2>
      {message && (
        <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description (optional)"
          />
        </div>
        <div className="form-group">
          <label>Priority:</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Task'}
        </button>
      </form>
    </div>
  );
};

export const TaskList = ({ tasks, onTaskUpdated }) => {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskAPI.deleteTask(id);
        onTaskUpdated();
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to delete task');
      }
    }
  };

  const handleEdit = (task) => {
    setEditingId(task.id);
    setEditData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status
    });
  };

  const handleSaveEdit = async (id) => {
    setLoading(true);
    try {
      await taskAPI.updateTask(
        id,
        editData.title,
        editData.description,
        editData.priority,
        editData.status
      );
      setEditingId(null);
      onTaskUpdated();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  if (tasks.length === 0) {
    return <p className="no-tasks">No tasks found. Create one to get started!</p>;
  }

  return (
    <div className="task-list-container">
      {tasks.map((task) => (
        <div key={task.id} className="task-card">
          {editingId === task.id ? (
            <div className="task-edit-form">
              <input
                type="text"
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              />
              <textarea
                value={editData.description}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
              />
              <select
                value={editData.priority}
                onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <select
                value={editData.status}
                onChange={(e) => setEditData({ ...editData, status: e.target.value })}
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <div className="button-group">
                <button
                  onClick={() => handleSaveEdit(task.id)}
                  disabled={loading}
                  className="save-btn"
                >
                  Save
                </button>
                <button onClick={() => setEditingId(null)} className="cancel-btn">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="task-header">
                <h3>{task.title}</h3>
                <span className={`priority priority-${task.priority}`}>{task.priority}</span>
              </div>
              <p className="task-description">{task.description || 'No description'}</p>
              <div className="task-meta">
                <span className={`status status-${task.status}`}>{task.status}</span>
                <span className="created-date">
                  Created: {new Date(task.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="task-actions">
                <button onClick={() => handleEdit(task)} className="edit-btn">
                  Edit
                </button>
                <button onClick={() => handleDelete(task.id)} className="delete-btn">
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export const TaskStats = ({ stats }) => {
  return (
    <div className="stats-container">
      <div className="stat-card">
        <h3>Total Tasks</h3>
        <p className="stat-value">{stats.total}</p>
      </div>
      <div className="stat-card">
        <h3>Pending</h3>
        <p className="stat-value">{stats.pending}</p>
      </div>
      <div className="stat-card">
        <h3>In Progress</h3>
        <p className="stat-value">{stats.inProgress}</p>
      </div>
      <div className="stat-card">
        <h3>Completed</h3>
        <p className="stat-value">{stats.completed}</p>
      </div>
    </div>
  );
};
