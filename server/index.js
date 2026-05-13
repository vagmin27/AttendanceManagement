import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";

dotenv.config();

const app = express();
console.log(process.env.JWT_SECRET);

// ✅ MIDDLEWARE
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://attendancemonitoringsyst-b1ae8.web.app",
      "https://mern-attendance-app.onrender.com",
    ],
    credentials: true,
  })
);


// ✅ DATABASE CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("❌ Database Error:", err.message);
  });


// ✅ ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/attendance", attendanceRoutes);


// ✅ HOME ROUTE
app.get("/", (req, res) => {
  res.send("Attendance Server Running");
});


// ✅ SERVER
const PORT = process.env.PORT || 3031;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});