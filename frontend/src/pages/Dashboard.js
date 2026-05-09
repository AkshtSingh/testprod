import React, { useState, useEffect } from 'react';
import { TaskForm, TaskList, TaskStats } from '../components/Tasks';
import { taskAPI } from '../services/api';
import '../styles/Dashboard.css';

export const Dashboard = ({ onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const [tasksResponse, statsResponse] = await Promise.all([
        taskAPI.getUserTasks(),
        taskAPI.getTaskStats()
      ]);
      setTasks(tasksResponse.data.data);
      setStats(statsResponse.data.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <h1>Task Manager</h1>
        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </nav>

      <div className="dashboard-content">
        <div className="dashboard-header">
          <h2>Welcome to Your Dashboard</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="toggle-form-btn"
          >
            {showForm ? 'Hide Form' : 'Create New Task'}
          </button>
        </div>

        {showForm && <TaskForm onTaskCreated={fetchTasks} />}

        <TaskStats stats={stats} />

        {loading ? (
          <p className="loading">Loading tasks...</p>
        ) : (
          <TaskList tasks={tasks} onTaskUpdated={fetchTasks} />
        )}
      </div>
    </div>
  );
};
