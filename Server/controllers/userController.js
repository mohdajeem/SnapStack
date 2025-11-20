import User from '../models/User.js';

const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    const userResponse = {
        _id: user._id,
        username: user.username,
        email: user.email,
        sessions: user.sessions,
        createdAt: user.createdAt
    };

    res
        .status(statusCode)
        .json({
            success: true,
            message: statusCode === 201 ? "User registered successfully" : "User logged in successfully",
            token,
            user: userResponse
        });
};

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.create({ username, email, password });
        sendTokenResponse(user, 201, res);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: 'A user with that username or email already exists.' });
        }
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ success: false, message: messages.join('. ') });
        }
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide an email and password' });
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        sendTokenResponse(user, 200, res);
    } catch (error) {
        // This will now catch the clearer error from getSignedJwtToken
        console.error("LOGIN ERROR:", error);
        // If the error is related to JWT secret / signing, return a clearer server-configuration error
        if (error && error.message && /jwt|secret|sign/i.test(error.message)) {
            return res.status(500).json({ success: false, message: "Server configuration error: JWT secret missing or invalid." });
        }
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

export const getMe = async (req, res) => {
    res.status(200).json({
        success: true,
        data: req.user
    });
};
