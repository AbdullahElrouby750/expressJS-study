function errorMiddleware(err, req, res, next) {
    console.log('err from error middleware:: ', err)
    if(err.status){
        res.status(err.status).json(err.message);
    } else {
        console.log('err::', err)
        res.status(500).json(err.message);
    }
}

export default errorMiddleware;