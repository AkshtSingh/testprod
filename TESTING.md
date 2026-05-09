# API Testing Guide

## Test Scenarios

### 1. Authentication Tests

#### ✅ Successful Registration
```
Request: POST /api/v1/auth/register
Body: {
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "confirmPassword": "SecurePass123!"
}
Expected: 201 Created with token
```

#### ❌ Registration - Email Already Exists
```
Request: POST /api/v1/auth/register
Expected: 409 Conflict
Response: { message: "User already exists with this email" }
```

#### ❌ Registration - Invalid Email
```
Request: POST /api/v1/auth/register
Body: { email: "invalid-email" }
Expected: 400 Bad Request
Response: { message: "Invalid email format" }
```

#### ❌ Registration - Password Too Short
```
Request: POST /api/v1/auth/register
Body: { password: "123" }
Expected: 400 Bad Request
Response: { message: "Password must be at least 6 characters" }
```

#### ❌ Registration - Passwords Don't Match
```
Request: POST /api/v1/auth/register
Body: {
  "password": "SecurePass123!",
  "confirmPassword": "Different123!"
}
Expected: 400 Bad Request
Response: { message: "Passwords do not match" }
```

#### ✅ Successful Login
```
Request: POST /api/v1/auth/login
Body: {
  "email": "john@example.com",
  "password": "SecurePass123!"
}
Expected: 200 OK with token
```

#### ❌ Login - Wrong Password
```
Request: POST /api/v1/auth/login
Body: {
  "email": "john@example.com",
  "password": "WrongPassword"
}
Expected: 401 Unauthorized
Response: { message: "Invalid email or password" }
```

#### ❌ Login - User Not Found
```
Request: POST /api/v1/auth/login
Body: {
  "email": "nonexistent@example.com",
  "password": "SomePassword"
}
Expected: 401 Unauthorized
Response: { message: "Invalid email or password" }
```

### 2. Token Validation Tests

#### ✅ Valid Token - Access Protected Route
```
Request: GET /api/v1/auth/profile
Header: Authorization: Bearer {valid_token}
Expected: 200 OK with user profile
```

#### ❌ Missing Token
```
Request: GET /api/v1/auth/profile
Expected: 401 Unauthorized
Response: { message: "Access token required" }
```

#### ❌ Invalid Token
```
Request: GET /api/v1/auth/profile
Header: Authorization: Bearer invalid.token.here
Expected: 401 Unauthorized
Response: { message: "Invalid or expired token" }
```

#### ❌ Malformed Authorization Header
```
Request: GET /api/v1/auth/profile
Header: Authorization: InvalidFormat token
Expected: 401 Unauthorized
```

### 3. Authorization (RBAC) Tests

#### ✅ User Can Access Own Profile
```
Request: GET /api/v1/auth/profile
Header: Authorization: Bearer {user_token}
Expected: 200 OK
```

#### ❌ User Cannot Access Admin Endpoints
```
Request: GET /api/v1/auth/users
Header: Authorization: Bearer {user_token}
Expected: 403 Forbidden
Response: { message: "Access denied: Insufficient role" }
```

#### ✅ Admin Can Access Admin Endpoints
```
Request: GET /api/v1/auth/users
Header: Authorization: Bearer {admin_token}
Expected: 200 OK with all users
```

### 4. Task Management Tests

#### ✅ Create Task - Valid Input
```
Request: POST /api/v1/tasks
Header: Authorization: Bearer {token}
Body: {
  "title": "Complete project",
  "description": "Finish REST API",
  "priority": "high"
}
Expected: 201 Created
```

#### ❌ Create Task - Missing Title
```
Request: POST /api/v1/tasks
Body: { description: "No title" }
Expected: 400 Bad Request
Response: { message: "Title is required" }
```

#### ❌ Create Task - Title Too Long
```
Request: POST /api/v1/tasks
Body: { title: "a".repeat(101) }
Expected: 400 Bad Request
```

#### ❌ Create Task - Invalid Priority
```
Request: POST /api/v1/tasks
Body: { title: "Task", priority: "urgent" }
Expected: 400 Bad Request
```

#### ✅ Get User Tasks
```
Request: GET /api/v1/tasks
Header: Authorization: Bearer {token}
Expected: 200 OK with task array
```

#### ✅ Get Task by ID - Owner
```
Request: GET /api/v1/tasks/1
Header: Authorization: Bearer {owner_token}
Expected: 200 OK with task
```

#### ❌ Get Task by ID - Non-Owner
```
Request: GET /api/v1/tasks/1
Header: Authorization: Bearer {other_user_token}
Expected: 403 Forbidden
Response: { message: "Not authorized to access this task" }
```

#### ❌ Get Task - Not Found
```
Request: GET /api/v1/tasks/9999
Header: Authorization: Bearer {token}
Expected: 404 Not Found
```

#### ✅ Update Task - Owner
```
Request: PUT /api/v1/tasks/1
Header: Authorization: Bearer {owner_token}
Body: { title: "Updated", status: "completed" }
Expected: 200 OK
```

#### ❌ Update Task - Non-Owner
```
Request: PUT /api/v1/tasks/1
Header: Authorization: Bearer {other_user_token}
Expected: 403 Forbidden
```

#### ✅ Delete Task - Owner
```
Request: DELETE /api/v1/tasks/1
Header: Authorization: Bearer {owner_token}
Expected: 200 OK
```

#### ❌ Delete Task - Non-Owner
```
Request: DELETE /api/v1/tasks/1
Header: Authorization: Bearer {other_user_token}
Expected: 403 Forbidden
```

#### ✅ Get Task Statistics
```
Request: GET /api/v1/tasks/stats/overview
Header: Authorization: Bearer {token}
Expected: 200 OK with stats
Response: {
  "total": 5,
  "pending": 2,
  "inProgress": 1,
  "completed": 2
}
```

### 5. Input Validation Tests

#### ✅ Username - Valid (3-30 chars)
```
Accepts: "abc", "john_doe_123", "a".repeat(30)
```

#### ❌ Username - Too Short
```
Rejects: "ab" (< 3 chars)
```

#### ❌ Username - Too Long
```
Rejects: "a".repeat(31) (> 30 chars)
```

#### ✅ Email - Valid Formats
```
Accepts: "user@example.com", "john.doe@example.co.uk"
```

#### ❌ Email - Invalid Formats
```
Rejects: "userexample.com", "user@", "@example.com"
```

#### ✅ Password - Valid
```
Accepts: "password123", "SecureP@ss123"
```

#### ❌ Password - Too Short
```
Rejects: "12345" (< 6 chars)
```

#### ✅ Task Title - Valid
```
Accepts: "a", "Task Title Here", "x".repeat(100)
```

#### ❌ Task Title - Invalid
```
Rejects: "", "x".repeat(101)
```

### 6. Error Handling Tests

#### ✅ HTTP 200 - OK
```
Successful GET requests
```

#### ✅ HTTP 201 - Created
```
Successful POST requests (create operations)
```

#### ✅ HTTP 400 - Bad Request
```
Invalid input, validation failures
```

#### ✅ HTTP 401 - Unauthorized
```
Missing/invalid token
```

#### ✅ HTTP 403 - Forbidden
```
Insufficient permissions/role
```

#### ✅ HTTP 404 - Not Found
```
Resource not found
```

#### ✅ HTTP 409 - Conflict
```
Resource already exists (email duplicate)
```

#### ✅ HTTP 500 - Internal Server Error
```
Server-side errors
```

## Testing with Postman

### Setup
1. Import Postman_Collection.json
2. Create environment with:
   - `base_url`: http://localhost:5000
   - `token`: (leave empty)

### Pre-request Script
```javascript
// Auto-update token from login response
if (pm.response) {
  var jsonData = pm.response.json();
  pm.environment.set("token", jsonData.data.token);
}
```

### Test Cases
1. Run Register → Login sequence
2. Token will auto-populate
3. Test protected endpoints
4. Create multiple tasks
5. Update and delete tasks

## Testing with cURL

### Test All Endpoints
```bash
#!/bin/bash

BASE_URL="http://localhost:5000"

# Register
echo "Testing Registration..."
REGISTER=$(curl -s -X POST $BASE_URL/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"test123","confirmPassword":"test123"}')

TOKEN=$(echo $REGISTER | jq -r '.data.token')
echo "Token: $TOKEN"

# Get Profile
echo "Testing Get Profile..."
curl -s -X GET $BASE_URL/api/v1/auth/profile \
  -H "Authorization: Bearer $TOKEN" | jq .

# Create Task
echo "Testing Create Task..."
curl -s -X POST $BASE_URL/api/v1/tasks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Task","priority":"high"}' | jq .

# Get Tasks
echo "Testing Get Tasks..."
curl -s -X GET $BASE_URL/api/v1/tasks \
  -H "Authorization: Bearer $TOKEN" | jq .
```

## Frontend Testing

### Test Flows
1. **Registration Flow**
   - Register new user
   - Check validation messages
   - Verify login redirect

2. **Login Flow**
   - Login with valid credentials
   - Check token storage
   - Verify dashboard redirect

3. **Task Management Flow**
   - Create task
   - Update task status
   - Edit task details
   - Delete task
   - View statistics

4. **Error Handling**
   - Invalid credentials
   - Network errors
   - Authorization failures
   - Server errors

5. **Edge Cases**
   - Token expiration
   - Logout and re-login
   - Session persistence
   - Multiple tasks

## Performance Testing

### Load Testing
```bash
# Using Apache Bench
ab -n 1000 -c 10 http://localhost:5000/health

# Using wrk
wrk -t12 -c400 -d30s http://localhost:5000/health
```

### Response Time Targets
- Register: < 200ms
- Login: < 200ms
- Get Tasks: < 100ms
- Create Task: < 150ms
- Update Task: < 150ms
- Delete Task: < 100ms

## Security Testing

### Test Cases
- [ ] SQL Injection prevention
- [ ] XSS prevention
- [ ] CSRF protection
- [ ] JWT validation
- [ ] Password hashing
- [ ] Rate limiting (if implemented)
- [ ] CORS validation

## Test Report Template

```markdown
## Test Report - [Date]

### Summary
- Total Tests: X
- Passed: X
- Failed: X
- Pass Rate: X%

### Results
| Test Case | Status | Notes |
|-----------|--------|-------|
| | ✅ | |

### Issues Found
1. ...

### Recommendations
1. ...
```

---

Use this guide to thoroughly test all API functionality before deployment.
