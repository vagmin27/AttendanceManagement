import { useEffect, useState } from "react";

import API from "../services/api";

import StudentTable from "../components/StudentTable";
import SearchBar from "../components/SearchBar";

function Attendance() {
  const [students, setStudents] =
    useState([]);

  const [subjects, setSubjects] =
    useState([]);

  const [attendanceData, setAttendanceData] =
    useState({});

  const [search, setSearch] =
    useState("");

  const [subject, setSubject] =
    useState("");

  // ✅ DATE STATE
  const [date, setDate] = useState(
    new Date()
      .toISOString()
      .split("T")[0]
  );

  useEffect(() => {
    fetchStudents();

    fetchSubjects();
  }, []);

  // ✅ FETCH STUDENTS
  const fetchStudents = async () => {
    try {
      const res = await API.get("/read");

      setStudents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ FETCH SUBJECTS
  const fetchSubjects = async () => {
    try {
      const res = await API.get(
        "/subjects"
      );

      setSubjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ HANDLE ATTENDANCE
  const handleAttendance = (
    id,
    status
  ) => {
    setAttendanceData((prev) => ({
      ...prev,
      [id]: status,
    }));
  };

  // ✅ SUBMIT ATTENDANCE
  const submitAttendance = async () => {
    try {
      // ✅ CHECK SUBJECT
      if (!subject) {
        return alert(
          "Please Select Subject"
        );
      }

      // ✅ CHECK ATTENDANCE
      if (
        Object.keys(attendanceData)
          .length === 0
      ) {
        return alert(
          "Please Mark Attendance"
        );
      }

      const attendanceArray =
        Object.entries(
          attendanceData
        ).map(
          ([studentId, attendance]) => ({
            studentId,
            attendance,
          })
        );

      await API.post("/attendance", {
        subject,

        date,

        attendanceData:
          attendanceArray,
      });

      alert("Attendance Updated");

      // ✅ RESET ATTENDANCE
      setAttendanceData({});
    } catch (error) {
      console.log(error);

      alert(
        "Error Updating Attendance"
      );
    }
  };

  // ✅ FILTER STUDENTS
  const filteredStudents =
    students.filter((student) =>
      student.Name.toLowerCase().includes(
        search.toLowerCase()
      )
    );

  return (
    <div className="page">
      <h1>Attendance</h1>

      {/* ✅ SUBJECT DROPDOWN */}
      <select
        className="subject-dropdown"
        value={subject}
        onChange={(e) =>
          setSubject(e.target.value)
        }
      >
        <option value="">
          Select Subject
        </option>

        {subjects.map((sub) => (
          <option
            key={sub._id}
            value={sub.subjectName}
          >
            {sub.subjectName}
          </option>
        ))}
      </select>

      {/* ✅ DATE PICKER */}
      <input
        type="date"
        className="date-picker"
        value={date}
        onChange={(e) =>
          setDate(e.target.value)
        }
      />

      {/* ✅ SEARCH BAR */}
      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      {/* ✅ STUDENT TABLE */}
      <StudentTable
        students={filteredStudents}
        attendanceData={
          attendanceData
        }
        handleAttendance={
          handleAttendance
        }
      />

      {/* ✅ SUBMIT BUTTON */}
      <button
        className="main-btn"
        onClick={submitAttendance}
      >
        Update Attendance
      </button>
    </div>
  );
}

export default Attendance;