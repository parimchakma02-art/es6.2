import { Router } from "express";

import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";

import courseMiddleware from "../middlewares/courseMiddleware.js";

const router = Router();

router.post("/createCourse", courseMiddleware, createCourse);
router.get("/getCourses", courseMiddleware, getCourses);
router.get("/:id", courseMiddleware, getCourseById);
router.put("/:id", courseMiddleware, updateCourse);
router.delete("/:id", courseMiddleware, deleteCourse);

export default router;  // Keep only ONE export at the end