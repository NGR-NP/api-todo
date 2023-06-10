const ERROR = (status, message) => {
    err = new Error();
    err.status = status;
    err.message = message;
    Error.captureStackTrace(err, ERROR);
    return err;
};
module.exports = ERROR;