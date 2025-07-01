function createNewError(status = 500, msg = 'Internal server error!') {
    const err = new Error(msg);
    err.status = status
    return err;
}

export default createNewError;