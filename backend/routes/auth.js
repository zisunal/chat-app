const router = require('express').Router();
const { register, login, otpVerify, sendOtp, reset, logout } = require('../controllers/AuthController');

router.post('/register', register);
router.post('/login', login);
router.post('/verify', otpVerify);
router.post('/send-otp', sendOtp);
router.post('/reset', reset);
router.get('/logout', logout);


module.exports = router;