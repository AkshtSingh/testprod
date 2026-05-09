import React, { useState, useEffect, useCallback } from 'react';
import { TaskForm, TaskList, TaskStats } from '../components/Tasks';
import { authAPI, taskAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Dashboard.css';

export const Dashboard = ({ onLogout }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [adminLoading, setAdminLoading] = useState(false);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const requests = [
        taskAPI.getUserTasks(),
        taskAPI.getTaskStats()
      ];

      if (user?.role === 'admin') {
        setAdminLoading(true);
        requests.push(authAPI.getAllUsers(), taskAPI.getAllTasks());
      }

      const responses = await Promise.all(requests);
      const [tasksResponse, statsResponse, usersResponse, allTasksResponse] = responses;

      setTasks(tasksResponse.data.data);
      setStats(statsResponse.data.data);

      if (user?.role === 'admin') {
        setUsers(usersResponse?.data?.data || []);
        setAllTasks(allTasksResponse?.data?.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
      setAdminLoading(false);
    }
  }, [user?.role]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Delete this user? This cannot be undone.')) {
      return;
    }

    try {
      await authAPI.deleteUser(id);
      fetchTasks();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete user');
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Delete this task? This cannot be undone.')) {
      return;
    }

    try {
      await taskAPI.deleteTask(id);
      fetchTasks();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete task');
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div>
          <h1>Task Manager</h1>
          {user?.role === 'admin' && <span className="role-badge admin-badge">Admin Access</span>}
        </div>
        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </nav>

      <div className="dashboard-content">
        <div className="dashboard-header">
          <div>
            <h2>Welcome to Your Dashboard</h2>
            <p className="dashboard-subtitle">
              {user?.role === 'admin'
                ? 'You can manage your tasks, all users, and all tasks.'
                : 'Manage your own tasks and track progress.'}
            </p>
          </div>
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

        {user?.role === 'admin' && (
          <section className="admin-panel">
            <div className="admin-panel-header">
              <h3>Admin Controls</h3>
              <span>{adminLoading ? 'Loading admin data...' : 'Users and all tasks'}</span>
            </div>

            <div className="admin-grid">
              <div className="admin-card">
                <h4>All Users</h4>
                {users.length === 0 ? (
                  <p className="admin-empty">No users found.</p>
                ) : (
                  <div className="admin-list">
                    {users.map((adminUser) => {
                      const userId = adminUser.id || adminUser._id;

                      return (
                      <div key={userId} className="admin-list-item">
                        <div>
                          <strong>{adminUser.username}</strong>
                          <p>{adminUser.email}</p>
                          <span className="role-badge">{adminUser.role}</span>
                        </div>
                        {adminUser.role !== 'admin' && (
                          <button
                            className="delete-btn small-btn"
                            onClick={() => handleDeleteUser(userId)}
                          >
                            Delete User
                          </button>
                        )}
                      </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="admin-card">
                <h4>All Tasks</h4>
                {allTasks.length === 0 ? (
                  <p className="admin-empty">No tasks found.</p>
                ) : (
                  <div className="admin-list">
                    {allTasks.map((task) => (
                      <div key={task.id} className="admin-task-item">
                        <strong>{task.title}</strong>
                        <p>{task.description || 'No description'}</p>
                        <small>
                          Owner: {task.ownerName || task.userId?.username || task.userId || 'Unknown'}
                        </small>
                        <div className="task-meta">
                          <span className={`status status-${task.status}`}>{task.status}</span>
                          <span className={`priority priority-${task.priority}`}>{task.priority}</span>
                        </div>
                        <button
                          className="delete-btn small-btn"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          Delete Task
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
