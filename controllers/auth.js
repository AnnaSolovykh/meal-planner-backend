const jwt = require('jsonwebtoken');
const TokenBlacklist = require('../models/tokenBlacklist'); 
const User = require('../models/user');

const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async (req, res) => {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res
        .status(StatusCodes.CREATED)    
        .json({ user:{
            name: user.name
        }, 
        token });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        throw new BadRequestError('Please provide email and password');
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials');
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials');
    }
    
    req.session.userId = user._id; 
    req.session.isAuthenticated = true;

    const token = user.createJWT();
    res 
        .status(StatusCodes.OK)
        .json({ 
            user: { 
                name: user.name
            }, 
            token 
        });
};

const logout = async (req, res) => {
    const authHeader = req.headers.authorization;
    let tokenBlacklisted = false;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];

        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const expirationTime = new Date(decodedToken.exp * 1000); 

            await TokenBlacklist.create({ token, expiresAt: expirationTime });
            tokenBlacklisted = true; 
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid token, cannot logout' });
            }

            if (error.code === 11000) {
                tokenBlacklisted = true;
            } else {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred during logout' });
            }
        }
    }

    req.session.destroy(function (err) {
        if (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Logout failed' });
        } 

        if (tokenBlacklisted) {
            return res.status(StatusCodes.OK).json({ message: 'Logged out successfully' });
        } else {
            return res.status(StatusCodes.OK).json({ message: 'Logged out, no token to blacklist or token was invalid' });
        }
    });
};



module.exports = {
    register,
    login,
    logout
};