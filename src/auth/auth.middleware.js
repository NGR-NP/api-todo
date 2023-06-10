const jwt = require("jsonwebtoken");
const { JWT_SEC } = require("../config/secret");
const ERROR = require("../utils/ERROR");

const verifyJwt = (req, res, next) => {
  const authTokenInHeader = req.headers.authorization;
  if (!authTokenInHeader) {
    return next(ERROR(401, "header is empty"));
  }
  const token = authTokenInHeader.split(" ")[1];
  if (!token) {
    return next(ERROR(401, "token not found in header"));
  }
  try {
    const decoded = jwt.verify(token, JWT_SEC);
    req.userId = decoded.id;
    req.email = decoded.email;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      next(ERROR(403, "token expired!!"));
    } else {
      next(ERROR(401, "Invalid token!!"));
    }
  }
};
const verifyUserId = (req, res, next) => {
  if (req.userId === req.params.id) {
    next();
  } else {
    return next(ERROR(401, "You are not authorized to do this action"));
  }
};
module.exports = {verifyJwt, verifyUserId};
