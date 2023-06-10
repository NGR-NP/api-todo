const { verifyUserId } = require("../auth/auth.middleware");
const { verifyJwt } = require("../auth/auth.middleware");
const { getUserById, updateUser, deleteUser } = require("./user.controller");

const userRoute = require("express").Router();
userRoute.use(verifyJwt);
userRoute.get("/:id", verifyUserId, getUserById);
userRoute.put("/:id", verifyUserId, updateUser);
userRoute.delete("/:id", verifyUserId, deleteUser);
module.exports = userRoute;
