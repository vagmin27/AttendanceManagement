import express from "express";
import protect from "../middleware/authMiddleware.js";
import { allowTeacher } from "../middleware/roleMiddleware.js";

import {
  addSubject,
  getSubjects,
} from "../controllers/subjectController.js";

const router = express.Router();

router.post("/subjects", protect, allowTeacher, addSubject);

router.get("/subjects", protect, allowTeacher, getSubjects);

export default router;