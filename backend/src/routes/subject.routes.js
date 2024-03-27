import { Router } from "express";
import { addSubjectController } from "../controllers/subject.controllers.js";
import { isAdmin, requireSignIn } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/").post(requireSignIn, isAdmin, addSubjectController);

export default router;
