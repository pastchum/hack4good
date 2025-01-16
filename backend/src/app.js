const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const { globalErrorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

const app = express();

app.use(express.json());

// Routes
app.use('/api/users', userRoutes); // User routes
app.use('/api/admin', adminRoutes); // Admin routes
app.use('/api/auth', authRoutes); // Auth routes

// Global Error Handling Middleware
app.use(globalErrorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
