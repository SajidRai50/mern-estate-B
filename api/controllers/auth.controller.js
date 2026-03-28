import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

//...........sign Up.............
export const signup = async (req, res, next) => {
  console.log("Request Body:", req.body);
  console.log(req.body);

  const { username, email, password } = req.body;

  const hashedpassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedpassword });
  try {
    await newUser.save();
    res.status(201).json(`User created successfully: ${email}`);
  } catch (error) {
    next(error);
  }
};

//...........sign In.............

// export const signin = async (req, res, next) => {
//   const { email, password } = req.body;
//   try {
//     const vaildUser = await User.findOne({ email });
//     if (!vaildUser) return
//     next(errorHandler(404, "user not found!"));
//     const vaildPassword = bcryptjs.compareSync(password, vaildUser.password);
//     if (!vaildPassword) return next(errorHandler(404, "wrong credentials!!!"));
//     const token = jwt.sign({ id: vaildUser._id }, process.env.JWT_SECRET);
//     res
//       .cookie("access_token", token, { httpOnly: true })
//       .status(200)
//       .json(vaildUser);
//   } catch (error) {
//     next(error);
//   }
// };


export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
