const router = require('express').Router();
const { getAllParcels, updateParcelStatus, deleteParcel, createParcelAdmin } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Admin protected routes
router.get('/parcels', protect, adminOnly, getAllParcels);
router.post('/parcel', protect, adminOnly, createParcelAdmin); // New: Create parcel
router.put('/parcel/:id', protect, adminOnly, updateParcelStatus);
router.delete('/parcel/:id', protect, adminOnly, deleteParcel);

module.exports = router;
