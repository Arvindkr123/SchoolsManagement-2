import { Router } from "express"

import { addUsersControllers, getUserByTokn, editUserController, loginUserController, requsetUserPasswordController, getAllUsersController, deleteUserController, getUserByIdController } from "../controllers/user.controllers.js";
import { isAdmin, requireSignIn } from "../middlewares/auth.middleware.js";

let router = Router();


router.route("/users").get(requireSignIn, isAdmin, getAllUsersController).post(requireSignIn, isAdmin, addUsersControllers)
router.route("/users/auth").post(loginUserController)
router.route("/users/verifyToken").post(getUserByTokn)
router.route("/users/requestPassword").post(requsetUserPasswordController)
router.route("/users/:id").get(requireSignIn, isAdmin, getUserByIdController).delete(requireSignIn, isAdmin, deleteUserController).post(requireSignIn, isAdmin, editUserController)


export default router;
