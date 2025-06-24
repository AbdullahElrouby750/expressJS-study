function loggerMiddleware(req, res, next) {
    console.log(`${req.method} ${req.protocol}://${req.host}${req.originalUrl}`)
    next()
}

export default loggerMiddleware;