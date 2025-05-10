require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// ✅ Enable CORS for frontend
app.use(cors({
  origin: 'http://localhost:3000', // or your deployed frontend URL
  credentials: true
}));

app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection failed:', err));

// ✅ API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/parcel', require('./routes/parcel'));
app.use('/api/admin', require('./routes/admin'));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
