import { Router } from "express";
import {
  createCourseController,
  createCourseCategoryController,
  createCourseTypeController,
  getCourseTypeController,
  updateCourseTypeController,
  deleteCourseTypeController,
  createCourseNumberOfYearController,
  getSingleNumberOfYearsController,
  updateNumberOfYearsCourseController,
  deleteNumberOfYearsCourseController,
  getNumberOfYearsController,
  getAllCourseTypeController,
  getAllCourseCategoryController,
  getSingleCourseCategoryController,
  deleteSingleCourseCategoryController,
  updateCourseCategoryController,
  getAllCourseController,
  updateCourseController,
  getSingleCourseController,
  deleteCourseController,
} from "../controllers/course.controllers.js";
import { requireSignIn } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/courseType", requireSignIn, getAllCourseTypeController);
router.get("/numberOfYears", requireSignIn, getNumberOfYearsController);
router
  .route("/")
  .post(requireSignIn, createCourseController)
  .get(requireSignIn, getAllCourseController);
router
  .route("/:id")
  .put(requireSignIn, updateCourseController)
  .get(requireSignIn, getSingleCourseController)
  .delete(requireSignIn, deleteCourseController);

//  Add Course Category
router
  .route("/addCategory")
  .post(requireSignIn, createCourseCategoryController);
router.route("/categories").get(requireSignIn, getAllCourseCategoryController);
router
  .route("/category/:id")
  .get(requireSignIn, getSingleCourseCategoryController)
  .put(requireSignIn, updateCourseCategoryController)
  .delete(requireSignIn, deleteSingleCourseCategoryController);

// Add course Type
router.route("/courseType").post(requireSignIn, createCourseTypeController);
router
  .route("/courseType/:id")
  .get(getCourseTypeController)
  .put(requireSignIn, updateCourseTypeController)
  .delete(requireSignIn, deleteCourseTypeController);

// Add Course Number of Years

router.post(requireSignIn, createCourseNumberOfYearController);
router
  .route("/numberOfYears/:id")
  .get(getSingleNumberOfYearsController)
  .put(requireSignIn, updateNumberOfYearsCourseController)
  .delete(requireSignIn, deleteNumberOfYearsCourseController);

export default router;
