import jwt from "jsonwebtoken";
import { userModel } from "../models/user.models.js";
import { JWT_SECRET } from "../config/config.js";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  // console.log(req.headers);
  try {
    const decode = jwt.verify(
      req.headers.authorization?.split(" ")[1],
      JWT_SECRET
    );
    req.user = await userModel.findById(decode.userId).select("-password");
    next();
  } catch (error) {
    console.log(error);
  }
};

//admin acceess
export const isAdmin = async (req, res, next) => {
  console.log(req.user);
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role === "Admin" || user.role === "SuperAdmin") {
      next();
    } else {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};
