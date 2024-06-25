const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { name, email, password, profile_pic } = req.body;

        const hashedPassword = bcrypt.hash(password, process.env.SALT_ROUNDS);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(200).json({
            status: 'success',
            data: user.isSelected('-password'),
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};