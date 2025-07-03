import jwt from 'jsonwebtoken';

import createNewError from '../../utils/createNewError.js';

const authenticateMiddleware = (req, res, next) => {
    const {token} = req.cookies;
    if(!token) return next(401, 'No token provided!');

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        return next(error)
    }
}

export default authenticateMiddleware