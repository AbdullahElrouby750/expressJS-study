function errorMiddleware(err, req, res, next) {
    if(err.status){
        res.status(err.status).json(err.message);
    } else {
        res.status(500).json(err.message);
    }
}

export default errorMiddleware;