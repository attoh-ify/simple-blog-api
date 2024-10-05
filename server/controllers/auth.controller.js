import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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

        const newUser = await User.create({
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
        res.clearCookie("userToken").status(200).json({ message: "Logout successful" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to logout user" });
    };
};


export const getProfile = async (req, res) => {
    try {
        const userProfile = await User.findOne({
            where: {
                id: req.userID
            }
        });
        return res.status(200).json({ userProfileDetails: userProfile });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to register get users profile" });
    }
};


export const updateProfile = async (req, res) => {
    try {
        const [updatedProfile] = await User.update(req.body, {
            where: {
                id: req.userID
            }
        });
        const newUserProfile = await User.findOne({
            where: {
                id: req.userID
            }
        });

        return res.status(200).json({ userProfileDetails: newUserProfile });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to update user profile" });
    }
};


export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.destroy({
            where: {
                id: req.userID
            }
        });

        // Check if the user exists and was deleted
        if (deletedUser) {
            return res.status(200).json({ message: 'User deleted successfully' });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to delete user" });
    }
};