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
- ✅ In-memory data storage (easily replaceable with MongoDB/PostgreSQL)

### Frontend (React)
- ✅ User registration & login UI
- ✅ Protected dashboard with JWT authentication
- ✅ Task management (Create, Read, Update, Delete)
- ✅ Task statistics dashboard
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

3. Create `.env` file (already provided):
```
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=24h
NODE_ENV=development
```

4. Start the server:
```bash
npm run dev
```

The API will run at `http://localhost:5000`

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

### API Documentation
Import the Postman collection (`Postman_Collection.json`) to test all endpoints

## Role-Based Access Control

### Roles & Permissions

| Role | Permissions |
|------|------------|
| Admin | create, read, update, delete, manage_users |
| Manager | create, read, update, manage_own_items |
| User | create, read, update_own |
| Guest | read |

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

### Using Postman

1. Import the Postman collection (see section below)
2. Set up environment variables:
   - `base_url`: http://localhost:5000
   - `token`: (will be set after login)
3. Test endpoints in the collection

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
5. **In-Memory DB**: Can be easily replaced with MongoDB/PostgreSQL
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
JWT_EXPIRE=24h              # Token expiration time
NODE_ENV=development        # Environment mode
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
