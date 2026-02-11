const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

/**
 * - User register controller
 * - POST /api/auth/register
 */
async function userRegisterController(req, res) {
    try {
        const { email, password, name } = req.body;

        const isExists = await userModel.findOne({ email });
        if (isExists) {
            return res.status(422).json({
                message: 'User already exists with this email.',
                status: 'failed'
            });
        }

        const user = await userModel.create({ email, password, name });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '3d'
        });

        res.cookie('token', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 });
        res.status(201).json({
            user: {
                _id: user._id,
                email: user.email,
                name: user.name
            },
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', status: 'failed' });
    }
}

module.exports = {
    userRegisterController
};
