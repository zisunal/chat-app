const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('../helpers/mailer');
const cookieParser = require('cookie-parser');
require('dotenv').config();

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) { 
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide name, email, and password',
            });
        }
        if (password.length < 6) {
            return res.status(400).json({
                status: 'fail',
                message: 'Password must be at least 6 characters long',
            });
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid email address',
            });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: 'fail',
                message: 'Email already exists',
            });
        }
        const hashedPassword = await bcrypt.hash(password, eval(process.env.SALT_ROUNDS));
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            otp,
        });
        if (!user) {
            return res.status(400).json({
                status: 'fail',
                message: 'User not created',
            });
        }
        const mailOptions = {
            email: user.email,
            subject: 'Account activation link',
            message: `<h1>Your One Time Password for ${process.env.APP_NAME}:</h1>
            <h2>${otp}</h2>`,
        }
        await sendEmail(mailOptions);
        res.status(200).json({
            status: 'success',
            uid: user._id,
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide email and password',
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                status: 'fail',
                message: 'User not found',
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid password',
            });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1y' });
        res.cookie('token', token, { httpOnly: true, secure: true }).json({
            status: 'success',
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};

exports.otpVerify = async (req, res) => {
    try {
        const { otp, uid } = req.body;
        if (!otp || !uid) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide OTP',
            });
        }
        const user = await User.findById(uid);
        if (!user) {
            return res.status(400).json({
                status: 'fail',
                message: 'User not found',
            });
        }
        if (user.otp !== otp) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid OTP',
            });
        }
        if (!user.isVerified) {
            user.isVerified = true;
            await user.save();
        }
        user.otp = Math.floor(100000 + Math.random() * 900000).toString();
        await user.save();
        res.status(200).json({
            status: 'success',
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
}

exports.sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide email',
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                status: 'fail',
                message: 'User not found',
            });
        }
        user.otp = Math.floor(100000 + Math.random() * 900000).toString();
        await user.save();
        const mailOptions = {
            email: user.email,
            subject: 'One Time Password',
            message: `<h1>Your One Time Password for ${process.env.APP_NAME}:</h1>
            <h2>${user.otp}</h2>`,
        }
        await sendEmail(mailOptions);
        res.status(200).json({
            status: 'success',
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
}

exports.reset = async (req, res) => {
    try {
        const { email, password, otp } = req.body;
        if (!email || !password || !otp) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide email, password and OTP',
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                status: 'fail',
                message: 'User not found',
            });
        }
        if (user.otp !== otp) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid OTP',
            });
        }
        const hashedPassword = await bcrypt.hash(password, eval(process.env.SALT_ROUNDS));
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({
            status: 'success',
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
}

exports.logout = async (req, res) => {
    try {
        res.clearCookie('token').json({
            status: 'success',
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
}