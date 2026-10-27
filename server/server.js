const http = require('http');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const { Server } = require('socket.io');
const connectDB = require('./config/db');

// Route Handlers
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const hostelRoutes = require('./routes/hostelRoutes');
const roomRoutes = require('./routes/roomRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const visitorRoutes = require('./routes/visitorRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const noticeRoutes = require('./routes/noticeRoutes');
const feeRoutes = require('./routes/feeRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const messRoutes = require('./routes/messRoutes');

// Load Environment Variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// Setup Socket.IO Server for Real-Time Event Broadcasting
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
});

// Attach Socket.IO to Request Object for Controllers
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Socket connection listener
io.on('connection', (socket) => {
  console.log(`⚡ WebSocket client connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`🔌 WebSocket client disconnected: ${socket.id}`);
  });
});

// Security & Utility Middleware
app.use(helmet({
  contentSecurityPolicy: false // Allow inline SVG / QR rendering
}));
app.use(morgan('dev'));
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Hostel Management System API (Sharda University Agra) is running smoothly!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    socketActive: true
  });
});

// Mount Application Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/hostels', hostelRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/attendance', attendanceRoutes); // Palak's Module
app.use('/api/leave', leaveRoutes);           // Palak's Module
app.use('/api/visitors', visitorRoutes);       // Palak's Module
app.use('/api/complaints', complaintRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/fees', feeRoutes);
app.use('/api/payments', paymentRoutes);       // Week 10: Razorpay & Digital Invoicing
app.use('/api/mess', messRoutes);             // Week 10: Mess Timetable & Dining Reviews

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route Not Found: [${req.method}] ${req.originalUrl}`
  });
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Application Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Process-level unhandled rejection & exception guards
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection detected:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception detected:', err);
});

// Start Server with Socket.IO Support
server.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`🚀 Hostel Management Backend Running on Port ${PORT}`);
  console.log(`🏫 Sharda University Agra - Campus Portal API`);
  console.log(`🔗 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`⚡ WebSocket / Socket.IO Engine: Active`);
  console.log(`==================================================`);
});
