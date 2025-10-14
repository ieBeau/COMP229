import { expressjwt } from 'express-jwt'

import config from '../config/config.js'

const requireSignin = expressjwt({
    secret: config.jwtSecret,
    algorithms: ["HS256"],
    userProperty: 'auth',
    getToken: req => req.cookies.t
});

const hasAuthorization = (req, res, next) => {
    const authorized = req.params && req.auth && req.params.id == req.auth._id;

    if (!authorized) return res.status(403).json({ error: "User is not authorized" });

    next();
};

export default { requireSignin, hasAuthorization }