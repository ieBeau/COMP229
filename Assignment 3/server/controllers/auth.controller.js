import { generateToken, verifyToken } from '../utils/jwt.js'

import User from '../models/user.model.js'

const signin = async (req, res) => {
    try {
        let user = await User.findOne({ "email": req.body.email });

        if (!user) return res.status(401).json({ error: "User not found" });
        if (!user.authenticate(req.body.password)) return res.status(401).send({ error: "Email and password don't match." });
        
        const token = generateToken(user);

        const cookieOptions = {
            expires: new Date(new Date() + (24 * 60 * 60 * 1000))
        };

        res.cookie('t', token, cookieOptions);

        res.status(200).json({
            message: "Signed in successfully",
            token,
            user
        });
    } catch (err) {
        return res.status(401).json({ error: "Could not sign in" });
    }
};

const signout = (req, res) => {
    res.clearCookie("t");

    return res.status(200).json({ message: "signed out" });
};

const validate = (req, res) => {
    try {
        const token = req.cookies.t;
        const verify = verifyToken(token);
        return res.status(200).json({ user: verify });
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
}

export default { signin, signout, validate }