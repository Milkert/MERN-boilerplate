# MERN Boilerplate

A full-stack MERN (MongoDB, Express.js, React, Node.js) boilerplate with TypeScript, authentication, and modern development tools.

## 🛠️ Tech Stack

### Frontend

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Query** - Server state management
- **Axios** - HTTP client

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

### Development Tools

- **ESLint** - Code linting with custom rules
- **Jest** - Testing framework
- **Nodemon** - Auto-restart development server
- **TSX** - TypeScript execution for Node.js

## 🚀 Quick Start

### Prerequisites

- Node.js 22+
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd MERN-boilerplate
```

2. **Install all dependencies**

```bash
npm run install-all
```

3. **Set up environment variables**

Create `backend/.env`:

```env
MONGO_URI=
MONGO_URI_TEST=
PORT=3001
JWT_SECRET=your-super-secret-jwt-key
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:3001
```

4. **Start development servers**

```bash
# Start both frontend and backend
npm run dev

# Or start individually
npm run server:dev  # Backend only
npm run client      # Frontend only
```

5. **Access the application**

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## 🧪 Testing

### Backend Testing

- **Framework**: Jest with TypeScript support
- **Coverage**: Routes, models, and utilities
- **Database**: Uses real MongoDB (with cleanup)
- **Approach**: Individual test cleanup for safety

- The MONGO_URI_TEST should have created a test user in the db as such: { Name: test, Email: test@test.com, Password: test123 }

```bash
cd backend
npm test                 # Run all tests
npm run test:watch       # Watch mode
npm run test:coverage    # With coverage report
```

### Test Structure

- **Setup**: Database connection and test data
- **Execution**: API endpoint testing with supertest
- **Cleanup**: Individual test data removal
- **Isolation**: Each test runs independently

## 🎨 Styling

### Tailwind CSS

- **Configuration**: `frontend/tailwind.config.js`
- **Custom Colors**: Extend theme for brand colors
- **Components**: Utility-first approach
- **Responsive**: Mobile-first design

### Custom Colors Example

```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      'brand-primary': '#3B82F6',
      'brand-secondary': '#10B981'
    }
  }
}
```

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**

```bash
# Check if MongoDB is running
brew services start mongodb-community
# Or start manually
mongod
```

**Port Already in Use**

```bash
# Find and kill process using port 3001
lsof -ti:3001 | xargs kill -9
```

**CORS Errors**

- Check `backend/app.ts` CORS configuration
- Verify frontend URL matches CORS origin

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Run linting and tests
6. Submit a pull request
