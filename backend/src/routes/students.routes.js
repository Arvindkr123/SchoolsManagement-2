import { Router } from "express";
import { isAdmin, requireSignIn } from "../middlewares/auth.middleware.js";
import {
  getAllStudentsController,
  updateStudentController,
  deleteStudentController,
} from "../controllers/students.controllers.js";
import upload from "../../multer-config/storageConfig.js";

const router = Router();

// get all students
router.route("/").get(requireSignIn, getAllStudentsController);
router
  .route("/:id")
  .put(requireSignIn, isAdmin, upload.single("image"), updateStudentController)
  .delete(requireSignIn, isAdmin, deleteStudentController);

export default router;
