# 📋 File Index & Navigation Guide

## 📑 Documentation Files (Read These First!)

### 🚀 Quick Start
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Overview & getting started (START HERE)
- **[QUICKSTART.md](QUICKSTART.md)** - 5-minute setup guide

### 📚 Reference Documentation
- **[README.md](README.md)** - Full API documentation & features
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System design & data flow
- **[TESTING.md](TESTING.md)** - 50+ test scenarios & testing strategies
- **[SECURITY.md](SECURITY.md)** - Security features & best practices

### 🔗 API Testing
- **[Postman_Collection.json](Postman_Collection.json)** - Import this into Postman

## 🎯 Backend Files

### 📦 Configuration
```
backend/
├── package.json              ← Dependencies & scripts
├── .env                      ← Environment variables
├── Dockerfile               ← Docker configuration
└── src/
    └── server.js            ← Express app setup (MAIN ENTRY POINT)
```

### 🔐 Authentication & Authorization
```
backend/src/
├── config/
│   └── constants.js         ← Roles, permissions, status codes
│
└── middleware/
    └── authMiddleware.js    ← JWT verification & authorization
```

**Key Functions:**
- `verifyToken` - Verify JWT token
- `restrictToRole` - Check user role
- `authorize` - Check permissions

### 🧠 Business Logic
```
backend/src/controllers/
├── authController.js        ← Authentication endpoints
│   ├── register()
│   ├── login()
│   ├── getProfile()
│   └── getAllUsers()
│
└── taskController.js        ← Task management endpoints
    ├── createTask()
    ├── getUserTasks()
    ├── updateTask()
    ├── deleteTask()
    └── getTaskStats()
```

### 📊 Data Models
```
backend/src/models/
├── User.js                  ← User model & methods
│   ├── User class
│   └── UserModel repository
│
└── Task.js                  ← Task model & methods
    ├── Task class
    └── TaskModel repository
```

### 🛣️ API Routes
```
backend/src/routes/
├── authRoutes.js            ← Authentication endpoints
│   ├── POST   /auth/register
│   ├── POST   /auth/login
│   ├── GET    /auth/profile
│   ├── PUT    /auth/profile
│   └── GET    /auth/users
│
└── taskRoutes.js            ← Task endpoints
    ├── POST   /tasks
    ├── GET    /tasks
    ├── GET    /tasks/{id}
    ├── PUT    /tasks/{id}
    ├── DELETE /tasks/{id}
    └── GET    /tasks/stats/overview
```

### 🛠️ Utilities
```
backend/src/utils/
├── errorHandler.js          ← Error handling & middleware
│   ├── ErrorHandler class
│   ├── asyncHandler wrapper
│   └── errorMiddleware
│
└── validators.js            ← Input validation rules
    ├── validateRegister
    ├── validateLogin
    ├── validateTask
    └── validate wrapper
```

## 🎨 Frontend Files

### 📦 Configuration
```
frontend/
├── package.json             ← Dependencies & scripts
├── Dockerfile              ← Docker configuration
├── public/
│   └── index.html          ← HTML template
└── src/
    └── index.js            ← React entry point
```

### 🏗️ Main Components
```
frontend/src/
├── App.js                  ← Main app component (ROUTING LOGIC)
│   ├── Shows auth UI if not logged in
│   └── Shows dashboard if logged in
│
└── contexts/
    └── AuthContext.js      ← Global authentication state
        ├── user
        ├── token
        ├── isAuthenticated
        └── login/logout methods
```

### 🔓 Authentication UI
```
frontend/src/components/
└── Auth.js                 ← Login & Register components
    ├── Login component
    │   ├── Email input
    │   ├── Password input
    │   └── Submit button
    │
    └── Register component
        ├── Username input
        ├── Email input
        ├── Password input
        ├── Confirm password input
        └── Submit button
```

### ✅ Task Management UI
```
frontend/src/components/
└── Tasks.js                ← Task UI components
    ├── TaskForm            ← Create new tasks
    │   ├── Title input
    │   ├── Description input
    │   ├── Priority select
    │   └── Submit button
    │
    ├── TaskList            ← Display & edit tasks
    │   ├── Task cards
    │   ├── Edit mode
    │   ├── Delete button
    │   └── Status badge
    │
    └── TaskStats           ← Show statistics
        ├── Total count
        ├── Pending count
        ├── In progress count
        └── Completed count
```

### 📄 Pages
```
frontend/src/pages/
└── Dashboard.js            ← Main dashboard page
    ├── Navbar (logout)
    ├── Task form toggle
    ├── Task stats
    └── Task list
```

### 🌐 API Communication
```
frontend/src/services/
└── api.js                  ← API client & endpoints
    ├── API client setup
    ├── Request interceptor (adds token)
    ├── Response interceptor (handles 401)
    ├── authAPI methods
    └── taskAPI methods
```

### 🎨 Styling
```
frontend/src/styles/
├── App.css                 ← Global styles
├── Auth.css                ← Authentication page styles
├── Dashboard.css           ← Dashboard layout styles
└── Tasks.css               ← Task component styles
```

## 🐳 Deployment Files

### Docker
```
docker-compose.yml          ← Container orchestration
backend/Dockerfile          ← Backend container config
frontend/Dockerfile         ← Frontend container config
```

### Git
```
.gitignore                  ← Files to ignore in git
```

## 📊 Data Flow

### Registration Flow
```
User Input
    ↓
Frontend (Auth.js Register)
    ↓
POST /api/v1/auth/register
    ↓
Validation (validators.js)
    ↓
Controller (authController.register)
    ↓
Model (UserModel.create)
    ↓
Response + Token
    ↓
AuthContext.login
    ↓
Redirect to Dashboard
```

### Login Flow
```
User Input
    ↓
Frontend (Auth.js Login)
    ↓
POST /api/v1/auth/login
    ↓
Validation
    ↓
Controller (authController.login)
    ↓
Password Verification
    ↓
Token Generation
    ↓
Response + Token
    ↓
AuthContext.login
    ↓
Redirect to Dashboard
```

### Task Creation Flow
```
User Input (Title, Description, Priority)
    ↓
Frontend (TaskForm)
    ↓
POST /api/v1/tasks
    ↓
Middleware (verifyToken)
    ↓
Validation (validateTask)
    ↓
Controller (taskController.createTask)
    ↓
Model (TaskModel.create)
    ↓
Response + Task Data
    ↓
Frontend (fetch tasks)
    ↓
Update UI (TaskList)
```

## 🔍 Quick Navigation

### To Find...

**How to authenticate users:**
- Backend: `backend/src/middleware/authMiddleware.js`
- Backend: `backend/src/controllers/authController.js`
- Frontend: `frontend/src/contexts/AuthContext.js`

**How to manage tasks:**
- Backend: `backend/src/controllers/taskController.js`
- Backend: `backend/src/models/Task.js`
- Frontend: `frontend/src/components/Tasks.js`

**How API calls work:**
- Frontend: `frontend/src/services/api.js`
- Backend: `backend/src/routes/*.js`
- Backend: `backend/src/controllers/*.js`

**Validation rules:**
- Backend: `backend/src/utils/validators.js`

**Error handling:**
- Backend: `backend/src/utils/errorHandler.js`

**Role configuration:**
- Backend: `backend/src/config/constants.js`

**Styling:**
- Frontend: `frontend/src/styles/*.css`

## 📝 File Modification Guide

### To Add a New Role
Edit: `backend/src/config/constants.js`
```javascript
ROLES: {
  NEWROLE: 'newrole'  // Add here
}
```

### To Add a New Endpoint
1. Add controller function in `backend/src/controllers/`
2. Add route in `backend/src/routes/`
3. Import in `backend/src/server.js`

### To Add a New Frontend Component
1. Create component in `frontend/src/components/`
2. Import in usage location
3. Add styling to `frontend/src/styles/`

### To Change API Base URL
Edit: `frontend/src/services/api.js`
```javascript
const API_BASE_URL = 'your_api_url_here';
```

## 🎓 Reading Order for Understanding

1. **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Start here for overview
2. **[QUICKSTART.md](QUICKSTART.md)** - Get it running
3. **[ARCHITECTURE.md](ARCHITECTURE.md)** - Understand the design
4. **Backend server entry:** `backend/src/server.js`
5. **Frontend entry:** `frontend/src/App.js`
6. **Authentication logic:** `backend/src/middleware/authMiddleware.js`
7. **API endpoints:** `backend/src/routes/`
8. **Business logic:** `backend/src/controllers/`
9. **[README.md](README.md)** - Detailed API reference

## 🧪 Testing Resources

- **[TESTING.md](TESTING.md)** - Complete testing guide
- **[Postman_Collection.json](Postman_Collection.json)** - Ready-to-use API tests
- **[SECURITY.md](SECURITY.md)** - Security test checklist

## 🚀 Deployment Resources

- **[docker-compose.yml](docker-compose.yml)** - Docker setup
- **[SECURITY.md](SECURITY.md)** - Production checklist

---

**Happy exploring! 🎉**
