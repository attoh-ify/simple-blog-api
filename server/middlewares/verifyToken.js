import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const verifyUserToken = (req, res, next) => {
    const token = req.cookies.userToken;

    if (!token) return res.status(401).json({ message: "Token not found" });

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err) return res.status(401).json({ message: "Token not valid" });
        req.userID = payload.id;

        next();
    })
};


export const verifyAdminToken = (req, res, next) => {
    const token = req.cookies.userToken;

    if (!token) return res.status(401).json({ message: "Token not found" });

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err) return res.status(401).json({ message: "Token not valid" });
        const user_ = await User.findOne({
            where: {
                id: payload.id
            }
        });
        if (!user_.isAdmin) {
            return res.status(403).json({ message: "Token not Authorised" });
        };
        req.userID = payload.id;

        next();
    })
};
