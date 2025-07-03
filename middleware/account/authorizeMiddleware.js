import createNewError from "../../utils/createNewError.js"

const authorizeMiddleware = (roles = []) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.userRole)) return next(createNewError(403, 'Access denied!'));
        next();
    }
}

export default authorizeMiddleware;