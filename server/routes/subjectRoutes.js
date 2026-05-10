import express from "express";

import {
  addSubject,
  getSubjects,
} from "../controllers/subjectController.js";

const router = express.Router();

router.post("/subjects", addSubject);

router.get("/subjects", getSubjects);

export default router;