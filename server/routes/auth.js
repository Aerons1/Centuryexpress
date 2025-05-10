// routes/auth.js
const router = require('express').Router();
const { signup, login, googleAuth } = require('../controllers/authController');
router.post('/signup', signup);
router.post('/login', login);
router.post('/google', googleAuth);
module.exports = router;
