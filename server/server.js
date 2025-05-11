require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// ✅ Enable CORS for frontend (using CLIENT_URL from environment)
app.use(cors({
  origin: process.env.CLIENT_URL, // e.g. https://centuryxpress.onrender.com
  credentials: true
}));

// ✅ Middleware to parse JSON bodies
app.use(express.json());

// ✅ Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection failed:', err));

// ✅ API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/parcel', require('./routes/parcel'));
app.use('/api/admin', require('./routes/admin'));

// ✅ Test route (optional)
app.get('/', (req, res) => {
  res.send('🚀 Backend is live!');
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
