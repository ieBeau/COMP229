import jwt from 'jsonwebtoken';

import config from '../config/config.js'

const generateToken = (user) => {
    return jwt.sign({ _id: user._id, admin: user.admin }, config.jwtSecret, { expiresIn: '1h' });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, config.jwtSecret);
    } catch (err) {
        return null;
    }
};

export { generateToken, verifyToken };