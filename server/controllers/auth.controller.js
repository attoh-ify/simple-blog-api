import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sequelize from '../db.js';
import crypto from 'crypto';
import User from '../models/User.js'


export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // check if user exists
        const checkUsername = await User.findOne({
            where: {
                username: username
            }
        });
        if (checkUsername) return res.status(401).json({ message: 'Username already taken' });

        const checkEmail = await User.findOne({
            where: {
                email: email
            }
        });

        if (checkEmail) return res.status(401).json({ message: 'Email already registered' });

        // create user
        // hash password
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        const id = crypto.randomBytes(6).toString('hex').slice(0, 12);

        const newUser = await User.create({
            id: id,
            username: username,
            email: email,
            password: hashedPassword
        });

        return res.status(200).json({ message: "User registered successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to register user" });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // check if email exists
        const checkUser = await User.findOne({
            where: {
                email: email
            }
        });

        if (!checkUser) return res.status(401).json({ message: 'Invalid Credentials' });

        // check if email matches email
        const isPasswordValid = await bcrypt.compare(password, checkUser.password);

        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid Credentials' });

        // create cookie
        const age = 1000 * 60 * 60 * 24  // token lasts for 24 hours

        const token = jwt.sign(
            {
                id: checkUser.id
            }, process.env.JWT_SECRET_KEY, { expiresIn: age });

        const { password: userPassword, ...userInfo } = checkUser;

        res.cookie("userToken", token, {
            httpOnly: true,
            // secure: true,  // uncomment before production
            maxAge: age,
        }).status(200).json({ userInfo: userInfo, message: 'Login successful' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to login user" });
    }
};


export const logout = async (req, res) => {
    try {
        res.clearCookie("userToken").status(200).json({ message: "Logout successful"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to logout user" });
    };
};


export const getProfile = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to register get users profile" });
    }
};


export const updateProfile = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to register update users profile" });
    }
};
