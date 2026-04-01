// export const test =(
//     (req,res)=>{
//    res.json({
//     message :"hello from controller"
//    })
//  }
// )


//update image
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
  res.json({
    message: "hello from controller",
  });
};

export const updateUser = async (req, res, next) => {
  try {
    const updateData = {};
   console.log("req.body:", req.body);
console.log("req.params.id:", req.params.id);
    if (req.body.username) updateData.username = req.body.username;
    if (req.body.email) updateData.email = req.body.email;
    if (req.body.avatar) updateData.avatar = req.body.avatar;

    if (req.body.password) {
      updateData.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );
  console.log("updatedUser:", updatedUser);
    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};