import express from "express";

import {
  addStudent,
  deleteStudent,
  getSingleStudent,
  getStudents,
} from "../controllers/studentController.js";

const router = express.Router();


// ✅ ADD STUDENT
router.post(
  "/form/insert",
  addStudent
);


// ✅ GET ALL STUDENTS
router.get(
  "/read",
  getStudents
);


// ✅ GET SINGLE STUDENT
router.get(
  "/remove/getStudent/:registerNumber",
  getSingleStudent
);


// ✅ DELETE STUDENT
router.delete(
  "/remove/delete/:registerNumber",
  deleteStudent
);

export default router;