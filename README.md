# testprod - REST API with Authentication & Role-Based Access Control

A production-ready REST API built with Node.js/Express featuring JWT authentication, role-based access control (RBAC), and a modern React frontend for testing.

## Features

### Backend (Node.js/Express)
- ✅ User registration & login with JWT authentication
- ✅ Secure password hashing using bcryptjs
- ✅ Role-Based Access Control (RBAC) - Admin, Manager, User, Guest roles
- ✅ CRUD API for Tasks (secondary entity)
- ✅ Input validation & sanitization
- ✅ Comprehensive error handling
- ✅ API versioning (v1)
- ✅ API documentation (Postman collection)
- ✅ CORS support for frontend integration
- ✅ Persistent storage using MongoDB via Mongoose

### Frontend (React)
- ✅ User registration & login UI
- ✅ Protected dashboard with JWT authentication
- ✅ Task management (Create, Read, Update, Delete)
- ✅ Task statistics dashboard
- ✅ Admin dashboard for managing users and all tasks
- ✅ Admin task deletion and user deletion controls
- ✅ Real-time error/success notifications
- ✅ Responsive design
- ✅ Automatic token refresh on 401 errors

## Project Structure

```
interviweProject/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── constants.js          # Role & permission configuration
│   │   ├── controllers/
│   │   │   ├── authController.js     # Authentication logic
│   │   │   └── taskController.js     # Task CRUD logic
│   │   ├── middleware/
│   │   │   └── authMiddleware.js     # JWT verification & authorization
│   │   ├── models/
│   │   │   ├── User.js               # User model & methods
│   │   │   └── Task.js               # Task model & methods
│   │   ├── routes/
│   │   │   ├── authRoutes.js         # Auth endpoints
│   │   │   └── taskRoutes.js         # Task endpoints
│   │   ├── utils/
│   │   │   ├── errorHandler.js       # Error handling utilities
│   │   │   └── validators.js         # Input validation rules
│   │   └── server.js                 # Express app setup
│   ├── .env                          # Environment variables
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Auth.js               # Login & Register components
    │   │   └── Tasks.js              # Task components
    │   ├── contexts/
    │   │   └── AuthContext.js        # Global auth state
    │   ├── pages/
    │   │   └── Dashboard.js          # Main dashboard page
    │   ├── services/
    │   │   └── api.js                # API client & endpoints
    │   ├── styles/
    │   │   ├── App.css
    │   │   ├── Auth.css
    │   │   ├── Dashboard.css
    │   │   └── Tasks.css
    │   ├── App.js
    │   └── index.js
    ├── public/
    │   └── index.html
    └── package.json
```

## Installation & Setup

### Prerequisites
- Node.js 14+ and npm
- Git

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (already provided). Add your MongoDB connection URI:
```
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=24h
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/testprod
```

4. Ensure MongoDB is running locally or use a hosted MongoDB. Example options:

- Start local MongoDB service (Windows):
```powershell
net start MongoDB
```

- Or run via Docker:
```powershell
docker run -d -p 27017:27017 --name mongo mongo:6
```

5. Start the server (it will connect to MongoDB):
```bash
npm run dev
```

The API will run at `http://localhost:5000`

6. (Optional) Seed an admin user (development only):
```bash
node scripts/seedAdmin.js
```
This creates an admin with email `admin@example.com` and password `StrongPass123!`. Remove or secure the script for production.

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run at `http://localhost:3000`

## API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/v1/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}

Response (201):
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2024-01-01T00:00:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### Login
```
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response (200):
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ... },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### Get Profile
```
GET /api/v1/auth/profile
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

#### Get All Users (Admin Only)
```
GET /api/v1/auth/users
Authorization: Bearer {admin_token}
```

#### Delete User (Admin Only)
```
DELETE /api/v1/auth/users/{id}
Authorization: Bearer {admin_token}
```

### Task Endpoints

#### Create Task
```
POST /api/v1/tasks
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the REST API project",
  "priority": "high"
}

Response (201):
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": 1,
    "title": "Complete project",
    "description": "Finish the REST API project",
    "userId": 1,
    "priority": "high",
    "status": "pending",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

#### Get User Tasks
```
GET /api/v1/tasks
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": [ ... ]
}
```

#### Update Task
```
PUT /api/v1/tasks/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Updated title",
  "status": "completed"
}
```

#### Delete Task
```
DELETE /api/v1/tasks/{id}
Authorization: Bearer {token}
```

#### Get Task Statistics
```
GET /api/v1/tasks/stats/overview
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": {
    "total": 5,
    "pending": 2,
    "inProgress": 1,
    "completed": 2
  }
}
```

#### Get All Tasks (Admin Only)
```
GET /api/v1/tasks/all
Authorization: Bearer {admin_token}
```

#### Delete Any Task (Admin Only)
```
DELETE /api/v1/tasks/{id}
Authorization: Bearer {admin_token}
```

### API Documentation
Import the Postman collection (`Postman_Collection.json`) to test all endpoints

### Postman Workflow

1. Open Postman and import `Postman_Collection.json`.
2. Create a Postman environment and set:
  - `base_url` = `http://localhost:5000`
  - `token` = leave empty at first; it is set automatically after login
3. Run the `Authentication -> Login` request first.
4. The login test script stores the JWT in the `token` variable automatically.
5. Use the remaining requests in the collection to test user and task flows.
6. For admin testing, log in with the seeded admin account (`admin@example.com` / `StrongPass123!`) and then run:
  - `Authentication -> Get All Users`
  - `Authentication -> Delete User`
  - `Tasks -> Get All Tasks`
  - `Tasks -> Delete Task`

Postman already includes the `Authorization: Bearer {{token}}` header where needed, so once login runs successfully, the protected requests should work without extra setup.

## Admin Features

When logged in as an admin, the frontend dashboard shows extra controls:

- View all registered users.
- Delete non-admin users.
- View all tasks across the system.
- Delete any task, including tasks created by other users.
- See the task owner name instead of the raw database id.

Admin access is backed by the role checks in the backend, so the same admin token works for both the dashboard and the protected API routes.

## Role-Based Access Control

This project uses JWT-based RBAC in the backend and role-aware UI behavior in the frontend. The token carries the user role, and the backend enforces access using `verifyToken`, `restrictToRole`, and `authorize`.

### Roles & Permissions

| Role | What it can do |
|------|-----------------|
| Admin | Create, read, update, delete, manage users, and manage all tasks |
| Manager | Create, read, update, and manage their own items |
| User | Create, read, and update their own items |
| Guest | Read-only access |

### Permission Rules

The backend permission map is defined in [backend/src/config/constants.js](backend/src/config/constants.js):

| Role | Backend permissions |
|------|---------------------|
| admin | `create`, `read`, `update`, `delete`, `manage_users` |
| manager | `create`, `read`, `update`, `manage_own_items` |
| user | `create`, `read`, `update_own` |
| guest | `read` |

### How RBAC Works

1. `verifyToken` reads the JWT from the `Authorization: Bearer <token>` header.
2. The JWT payload includes the user's role.
3. `restrictToRole('admin')` blocks non-admin users from admin-only routes.
4. `authorize('delete')` checks permission names against the role permission map.
5. The frontend uses the stored `user.role` to show admin panels and hide admin-only controls from regular users.

### Authorization Middleware

Routes are protected using JWT verification and role-based authorization:

```javascript
// Verify token
router.get('/protected-route', verifyToken, controller);

// Restrict to specific role
router.get('/admin-only', verifyToken, restrictToRole('admin'), controller);

// Check specific permissions
router.get('/special-action', verifyToken, authorize('delete'), controller);
```

### RBAC Endpoints

- Public: `POST /api/v1/auth/register`, `POST /api/v1/auth/login`
- Authenticated user: `GET /api/v1/auth/profile`, `PUT /api/v1/auth/profile`, task CRUD routes
- Admin only: `GET /api/v1/auth/users`, `DELETE /api/v1/auth/users/{id}`, `GET /api/v1/tasks/all`, `DELETE /api/v1/tasks/{id}`

### Frontend RBAC Behavior

- Non-admin users see only their own tasks.
- Admin users see the admin dashboard section with all users and all tasks.
- Admin users can delete non-admin users and delete any task.
- The task owner name is shown in the admin task list instead of the raw database id.

## Security Features

1. **Password Hashing**: Passwords are hashed using bcryptjs with 10 salt rounds
2. **JWT Authentication**: Secure token-based authentication
3. **Token Expiration**: Tokens expire after 24 hours
4. **Input Validation**: All inputs are validated and sanitized
5. **CORS**: Configured to prevent unauthorized cross-origin requests
6. **Error Handling**: Comprehensive error handling without exposing sensitive info

## Testing the API

### Using Frontend UI
1. Start both backend and frontend servers
2. Navigate to `http://localhost:3000`
3. Register a new account
4. Login with credentials
5. Create, update, and delete tasks from the dashboard
6. Login with an admin account to access the admin controls for users and all tasks

### Using Postman

1. Import the Postman collection (`Postman_Collection.json`).
2. Select the environment you created and confirm `base_url` is `http://localhost:5000`.
3. Send the `Authentication -> Login` request to store the JWT in `token` automatically.
4. Use the `Authentication`, `Tasks`, and admin requests to test the API.
5. If you want to test admin actions, log in with the admin account and use the admin-only requests listed above.

### Manual Testing with cURL

Register:
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

Login:
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Create Task (replace TOKEN with actual token):
```bash
curl -X POST http://localhost:5000/api/v1/tasks \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Task",
    "description": "Task description",
    "priority": "high"
  }'
```

## Scalability Features

1. **Modular Structure**: Easy to add new modules and features
2. **API Versioning**: Routes are versioned (v1, v2, etc.)
3. **Error Handling**: Centralized error handling middleware
4. **Validation Layer**: Input validation prevents bad data
5. **Persistent DB**: Uses MongoDB via Mongoose for durable storage
6. **Middleware Architecture**: Easy to add authentication, logging, rate limiting

## Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Redis caching for performance
- [ ] Email verification for registration
- [ ] Password reset functionality
- [ ] OAuth2 integration (Google, GitHub)
- [ ] Rate limiting
- [ ] Logging & monitoring
- [ ] Docker containerization
- [ ] Unit & integration tests
- [ ] File upload support
- [ ] Team collaboration features
- [ ] Task comments & notifications

## Environment Variables

```
PORT=5000                    # Server port
JWT_SECRET=your_secret_key   # JWT signing secret (CHANGE IN PRODUCTION)
JWT_EXPIRE=24h               # Token expiration time
NODE_ENV=development         # Environment mode
MONGO_URI=mongodb://localhost:27017/testprod  # MongoDB connection URI
```

## Error Handling

The API returns standardized error responses:

```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400
}
```

Common HTTP Status Codes:
- `200`: OK - Request successful
- `201`: Created - Resource created successfully
- `400`: Bad Request - Invalid input
- `401`: Unauthorized - Invalid/missing token
- `403`: Forbidden - Insufficient permissions
- `404`: Not Found - Resource not found
- `409`: Conflict - Resource already exists
- `500`: Internal Server Error

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Support

For issues, questions, or suggestions, please create an issue in the repository.

---

**Built with ❤️ for scalable, secure REST APIs**
