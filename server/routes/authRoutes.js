import express from "express";
import protect from "../middleware/authMiddleware.js";
import { allowTeacher } from "../middleware/roleMiddleware.js";
import {
  registerUser,
  loginUser,
} from "../controllers/authController.js";

const router = express.Router();


// ✅ REGISTER ROUTE
router.post("/register", registerUser);


// ✅ LOGIN ROUTE
router.post("/login", loginUser);

router.get("/me", protect, (req, res) => {
  res.json(req.user);
});

router.get(
  "/teacher-only",
  protect,
  allowTeacher,
  (req, res) => {
    res.json({
      message: "Welcome Teacher",
    });
  }
);

export default router;