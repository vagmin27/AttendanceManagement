import express from "express";

import {
  markAttendance,
  downloadAttendance,
  downloadTodayAttendance,
  getAttendance,
  deleteStudentAttendance,
} from "../controllers/attendanceController.js";

const router = express.Router();


// ✅ GET ATTENDANCE
router.get(
  "/attendance",
  getAttendance
);


// ✅ MARK ATTENDANCE
router.post(
  "/attendance",
  markAttendance
);


// ✅ DOWNLOAD CSV
router.get(
  "/data/download",
  downloadAttendance
);


// ✅ DOWNLOAD TODAY DOCX
router.get(
  "/attendanceToday/:date",
  downloadTodayAttendance
);

// ✅ DELETE STUDENT ATTENDANCE
router.delete(
  "/attendance/:studentId",
  deleteStudentAttendance
);

// ✅ DELETE ATTENDANCE USING REGISTER NUMBER
router.delete(
  "/attendance/student/:register",
  deleteStudentAttendance
);

export default router;