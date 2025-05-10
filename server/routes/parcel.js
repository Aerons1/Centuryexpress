// routes/parcel.js
const router = require('express').Router();
const { trackParcel, createParcel } = require('../controllers/parcelController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
router.get('/:trackingNumber', trackParcel);
router.post('/', protect, adminOnly, createParcel);
module.exports = router;
