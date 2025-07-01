import colors from 'colors'

const methodColors = {
    GET: 'green',
    POST: 'blue',
    PUT: 'yellow',
    DELETE: 'red',
};

function loggerMiddleware(req, res, next) {
    const color = methodColors[req.method] || white;
    console.log(`${req.method} ${req.protocol}://${req.host}${req.originalUrl}`[color])
    next()
}

export default loggerMiddleware;