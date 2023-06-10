const { JWT_SEC } = require("../config/secret");
const jwt = require("jsonwebtoken")
const UserModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const ERROR = require("../utils/ERROR");

const Register = async (req, res, next) => {
  const { firstName, lastName, email, password, img } = req.body;

  if (!firstName) return next(ERROR(400, "enter your first name!!"));
  if (!lastName) return next(ERROR(400), "enter your last name!!");
  if (!email) return next(ERROR(400), "enter your email!!");
  if (!password) return next(ERROR(400), "set strong password!!");
  if (password.length <= 7) {
    return next(ERROR(400, "Passwords must be at least 8 characters long!!"));
  }

  if (!/[A-Z]/.test(password))
    return next(ERROR(400, "Password should contain Uppsercase letters!!"));

  if (!/[a-z]/.test(password))
    return next(ERROR(400, "Password should contain Lowercase letters!!"));

  if (!/[0-9]/.test(password))
    return next(ERROR(400, "Password should contain numbers!!"));
  if (!/[!@#$%^&*]/.test(password))
    return next(
      ERROR(400, "Password should contain seecial charaters (!@#$%^&*)!!")
    );

  try {
    const user = await UserModel.findOne({ email });
    if (user) return next(ERROR(401, "email is already register!!"));
    const salt = bcrypt.genSaltSync(5);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const createUser = new UserModel({
      firstName,
      lastName,
      email,
      img,
      password: hashedPassword,
    });
    await createUser.save();
    res.status(201).json({ message: "Account created successfully!" });
  } catch (err) {
    next(err);
  }
};
const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return next(ERROR(400, "Enter your email!"));
  }
  if (!password) {
    return next(ERROR(400, "Enter your password!"));
  }
  try {
    const userFound = await UserModel.findOne({ email });
    if (!userFound) return next(ERROR(401, "wrong credentials!"));

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return next(ERROR(401, "wrong credentials!"));

    const accessToken = jwt.sign(
      {
        id: userFound._id,
        email: userFound.email,
      },
      JWT_SEC,
      { expiresIn: "2m" }
    );

    const {_id, firstName, lastName, img } = userFound;
    res.status(200).json({
      message: `Welcome back ${firstName}`,
	id: _id,      
accessToken,
      firstName,
      lastName,
      img,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = { login, Register };
