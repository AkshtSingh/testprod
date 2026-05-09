# Quick Start Guide

## Getting Started in 5 Minutes

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Start Backend Server
```bash
npm run dev
```
✅ Backend running at http://localhost:5000

### 3. Install Frontend Dependencies (in new terminal)
```bash
cd frontend
npm install
```

### 4. Start Frontend Development Server
```bash
npm start
```
✅ Frontend running at http://localhost:3000

## Testing the Application

### Option 1: Using the Frontend UI (Recommended)
1. Open http://localhost:3000 in your browser
2. Click **Register** to create a new account
3. Fill in username, email, password
4. Login with your credentials
5. Create, edit, and delete tasks in the dashboard
6. View task statistics

### Option 2: Using Postman
1. Import `Postman_Collection.json` into Postman
2. Set `base_url` variable to `http://localhost:5000`
3. Test endpoints:
   - **Register**: POST /api/v1/auth/register
   - **Login**: POST /api/v1/auth/login (sets token automatically)
   - **Create Task**: POST /api/v1/tasks
   - **Get Tasks**: GET /api/v1/tasks
   - **Update Task**: PUT /api/v1/tasks/{id}
   - **Delete Task**: DELETE /api/v1/tasks/{id}

### Option 3: Using cURL
```bash
# Register
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"user1","email":"user1@test.com","password":"test123","confirmPassword":"test123"}'

# Login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user1@test.com","password":"test123"}'

# Get Tasks (replace TOKEN with actual token from login response)
curl -X GET http://localhost:5000/api/v1/tasks \
  -H "Authorization: Bearer TOKEN"
```

## API Documentation
Import the Postman collection (`Postman_Collection.json`) to test all endpoints

## Project Features

✅ **Authentication**
- User registration with validation
- Secure login with JWT tokens
- Password hashing with bcryptjs
- Token expiration (24 hours)

✅ **Authorization**
- Role-Based Access Control (RBAC)
- Routes protected with JWT middleware
- Admin-only endpoints

✅ **Task Management**
- Create tasks with title, description, priority
- Read your tasks with filtering
- Update task status and details
- Delete tasks
- View task statistics

✅ **Frontend**
- Clean, modern UI
- Responsive design (mobile-friendly)
- Real-time notifications
- Easy-to-use dashboard

## Default Test Credentials
After registration, you can use any created account. Example:
- Email: test@example.com
- Password: password123

## Troubleshooting

### Backend won't start
- Make sure port 5000 is not in use: `netstat -ano | findstr :5000`
- Try a different port: Change `PORT` in `.env`

### Frontend won't connect to backend
- Check backend is running on port 5000
- Check CORS is enabled (it is by default)
- Browser console will show API errors

### Token expiration
- Tokens expire after 24 hours
- Login again to get a new token
- Frontend handles this automatically

## Next Steps

1. **Explore the code**: Check out the structure in backend/src and frontend/src
2. **Add more features**: Extend with categories, tags, due dates
3. **Connect to database**: Replace in-memory storage with MongoDB/PostgreSQL
4. **Deploy**: Use Docker or cloud platforms (Heroku, Vercel, etc.)
5. **Add tests**: Implement unit and integration tests

## Security Notes
⚠️ Before deploying to production:
- Change `JWT_SECRET` in `.env` to a strong random string
- Use a real database instead of in-memory storage
- Enable HTTPS
- Add rate limiting
- Implement logging and monitoring
- Use environment-specific configurations

## Support
For questions or issues, refer to the main README.md file.
