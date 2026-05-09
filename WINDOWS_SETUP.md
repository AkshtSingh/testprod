# Windows Setup Guide

## 🪟 For Windows Users

This guide provides step-by-step instructions for setting up the project on Windows.

## ✅ Prerequisites

1. **Node.js & npm** (Download from https://nodejs.org/)
   - Choose LTS version (v18 or higher)
   - This includes npm automatically
   - Verify: Open Command Prompt and type:
     ```
     node --version
     npm --version
     ```

2. **Git** (Optional, for version control)
   - Download from https://git-scm.com/

3. **Text Editor/IDE** (Optional but recommended)
   - Visual Studio Code: https://code.visualstudio.com/
   - WebStorm
   - Sublime Text

## 🚀 Quick Start (7 Steps)

### Step 1: Open Command Prompt or PowerShell

1. Press `Win + R`
2. Type `cmd` or `powershell`
3. Press Enter
4. Navigate to your project:
   ```
   cd e:\interviweProject
   ```

### Step 2: Install Backend Dependencies

```cmd
cd backend
npm install
```

**Expected Output:**
```
added XXX packages in X.XXXs
```

**If you get errors:**
- Make sure Node.js is properly installed
- Try: `npm install --legacy-peer-deps`
- Try clearing cache: `npm cache clean --force`

### Step 3: Start Backend Server

```cmd
npm run dev
```

**Expected Output:**
```
Server running on port 5000
```

**✅ Leave this terminal running!**

### Step 4: Open New Command Prompt/PowerShell

1. Press `Win + R` again
2. Type `cmd` or `powershell`
3. Press Enter
4. Navigate to frontend:
   ```
   cd e:\interviweProject\frontend
   ```

### Step 5: Install Frontend Dependencies

```cmd
npm install
```

### Step 6: Start Frontend Development Server

```cmd
npm start
```

**Expected Output:**
Browser will open automatically at `http://localhost:3000`

### Step 7: Test the Application

1. The browser should open automatically
2. Click **Register**
3. Create an account:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `password123`
4. Click **Register**
5. You'll be automatically logged in
6. Create your first task!

## ✅ Verification

### Terminal Windows Should Show:

**Backend Terminal:**
```
Server running on port 5000
```

**Frontend Terminal:**
```
Compiled successfully!
Local: http://localhost:3000
```

### Browser Should Show:
- Login/Register page OR
- Dashboard with task manager

## 🔍 Troubleshooting

### Issue: "npm: The term 'npm' is not recognized"

**Solution:**
- Node.js not installed properly
- Restart Command Prompt
- Restart your computer
- Reinstall Node.js

### Issue: Port 5000 or 3000 Already in Use

**Solution:**

Find and close the process:
```cmd
REM For port 5000
netstat -ano | findstr :5000

REM Kill the process (replace PID with the number from above)
taskkill /PID <PID> /F

REM For port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

Or change the port in `.env`:
```
PORT=5001
```

### Issue: "Cannot find module" Error

**Solution:**
```cmd
REM Delete node_modules and package-lock.json
rmdir /s /q node_modules
del package-lock.json

REM Reinstall
npm install
```

### Issue: CORS Error in Browser Console

**Solution:**
- Make sure backend is running on port 5000
- Check frontend `.env` or `api.js` has correct API URL
- Should be `http://localhost:5000`

### Issue: Browser Shows "Cannot GET /"

**Solution:**
- Frontend server is not running
- Check the frontend terminal for errors
- Try restarting: `npm start`

### Issue: Registration/Login Failed

**Solution:**
- Check backend is running
- Look for errors in backend terminal
- Verify email format is correct
- Verify password is at least 6 characters

## 🔄 Daily Development Workflow

### Start Backend
```cmd
cd e:\interviweProject\backend
npm run dev
```

### In New Terminal: Start Frontend
```cmd
cd e:\interviweProject\frontend
npm start
```

### Stop Development
- Backend: Press `Ctrl + C` in backend terminal
- Frontend: Press `Ctrl + C` in frontend terminal

## 📝 Using Postman (Alternative Testing)

1. Download Postman: https://www.postman.com/downloads/
2. Import `Postman_Collection.json`:
   - Open Postman
   - Click "Import"
   - Select `Postman_Collection.json`
3. Test API endpoints

## 🐳 Docker Setup (Alternative)

If you have Docker installed:

1. Make sure backend and frontend are stopped
2. Open Command Prompt in project root
3. Run:
   ```cmd
   docker-compose up
   ```

## 📚 Documentation

Read these files in order:

1. **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Overview
2. **[README.md](README.md)** - Full API reference
3. **[TESTING.md](TESTING.md)** - Testing guide
4. **[SECURITY.md](SECURITY.md)** - Security guide

## 🆘 Getting Help

### Check Logs

**Backend errors:**
- Look at the backend terminal for error messages
- Search the error message in Google

**Frontend errors:**
- Open Browser DevTools: `F12`
- Look at Console tab for errors
- Look at Network tab for API calls

### Common Issues Resources

- Node.js issues: https://nodejs.org/
- React issues: https://react.dev/
- Express issues: https://expressjs.com/
- JWT issues: https://jwt.io/

## 🎓 Learning Tips

1. **Read the code** while it's running
2. **Modify and observe** - Change something and see what happens
3. **Use DevTools** - Inspect network requests and storage
4. **Read error messages** - They usually tell you what's wrong
5. **Refer to documentation** - All provided in the project

## 📋 Checklist

- [ ] Node.js installed and verified
- [ ] Backend dependencies installed
- [ ] Backend running on port 5000
- [ ] Frontend dependencies installed
- [ ] Frontend running on port 3000
- [ ] Registered test account
- [ ] Logged in successfully
- [ ] Created first task
- [ ] Tested all features

## 🎉 Success!

If you see:
- ✅ Backend running on port 5000
- ✅ Frontend running on port 3000 and opened in browser
- ✅ Can register and login
- ✅ Can create, update, delete tasks

**You have successfully set up the project!**

## 📖 Next Steps

1. Read [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
2. Read [ARCHITECTURE.md](ARCHITECTURE.md)
3. Explore the code structure
4. Try modifying the UI
5. Try adding new fields to tasks
6. Learn from the code

## 💡 Development Tips

### Auto-reload Code Changes

Both servers auto-reload:
- **Backend**: Uses `nodemon` - restarts on file changes
- **Frontend**: Uses React dev server - refreshes on file changes

### Debug Mode

**Backend:**
Add `console.log()` statements in controllers

**Frontend:**
- Press `F12` to open DevTools
- Use `console.log()` in components

### Test with Postman

Import `Postman_Collection.json` for ready-made API tests

## 🚀 Deployment

When ready to deploy:

1. Read [SECURITY.md](SECURITY.md)
2. Update `.env` variables
3. Follow deployment platform guides:
   - Heroku: https://www.heroku.com/
   - Vercel: https://vercel.com/
   - AWS: https://aws.amazon.com/

---

**Happy coding! 🎉**

For more help, read the comprehensive documentation included in the project.
