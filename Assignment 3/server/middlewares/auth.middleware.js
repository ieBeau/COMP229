import jwt from 'jsonwebtoken'

import config from '../config/config.js'

const requireSignin = (req, res, next) => {
    const token = req.cookies.t;

    if (!token) return res.status(401).json({ error: "Unauthorized - token - " + req.cookies.t + "-" + JSON.stringify(req.cookies) });


    try {
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if (err) return res.status(401).json({ error: "Unauthorized - jwt" });

            req.auth = decoded;
            next();
        });
    } catch (err) {
        return res.status(401).json({ error: "Unauthorized - catch -" + err });
    }
};

const hasAuthorization = (req, res, next) => {
    const authorized = req.params && req.auth && (
        req.params.id == req.auth._id ||
        req.auth.admin
    );

    if (!authorized) return res.status(403).json({ error: "User is not authorized" });

    next();
};

export default { requireSignin, hasAuthorization }