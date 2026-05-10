import { useEffect, useState } from "react";

import API from "../services/api";

import DashboardCards from "../components/DashboardCards";

import Charts from "../components/Charts";

function Dashboard() {
  const [students, setStudents] =
    useState([]);

  const [attendance, setAttendance] =
    useState([]);

  const [attendanceStats, setAttendanceStats] =
    useState([]);

  const [presentStudents, setPresentStudents] =
    useState([]);

  const [absentStudents, setAbsentStudents] =
    useState([]);

  const [latestSubject, setLatestSubject] =
    useState("");

  const [latestDate, setLatestDate] =
    useState("");

  // ✅ SELECT DATE
  const [selectedDate, setSelectedDate] =
    useState(
      new Date()
        .toISOString()
        .split("T")[0]
    );

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ UPDATE WHEN DATE CHANGES
  useEffect(() => {
    calculateSelectedDateAttendance(
      attendance,
      students,
      selectedDate
    );
  }, [
    selectedDate,
    attendance,
    students,
  ]);

  // ✅ FETCH DATA
  const fetchData = async () => {
    try {
      // ✅ FETCH STUDENTS
      const studentsRes = await API.get(
        "/read"
      );

      // ✅ FETCH ATTENDANCE
      const attendanceRes = await API.get(
        "/attendance"
      );

      const studentsData = studentsRes.data;

      const attendanceData =
        attendanceRes.data || [];

      setStudents(studentsData);

      setAttendance(attendanceData);

      // ✅ SUBJECT STATS
      calculateSubjectStats(attendanceData);

      // ✅ LATEST SESSION
      calculateLatestAttendance(
        attendanceData
      );

      // ✅ SELECTED DATE
      calculateSelectedDateAttendance(
        attendanceData,
        studentsData,
        selectedDate
      );
    } catch (error) {
      console.log(
        "Dashboard Error:",
        error
      );
    }
  };

  // ✅ SUBJECT-WISE STATS
  const calculateSubjectStats = (
    attendanceData
  ) => {
    const subjectMap = {};

    attendanceData.forEach((item) => {
      const subject = item.subject;

      if (!subject) return;

      if (!subjectMap[subject]) {
        subjectMap[subject] = {
          total: 0,
          present: 0,
        };
      }

      item.attendanceRecords.forEach(
        (record) => {
          subjectMap[subject].total++;

          if (
            record.attendance === "present"
          ) {
            subjectMap[subject].present++;
          }
        }
      );
    });

    const statsArray = Object.keys(
      subjectMap
    ).map((subject) => ({
      subject,

      percentage: Number(
        (
          (subjectMap[subject].present /
            subjectMap[subject].total) *
          100
        ).toFixed(1)
      ),

      presentDays:
        subjectMap[subject].present,

      totalClasses:
        subjectMap[subject].total,
    }));

    setAttendanceStats(statsArray);
  };

  // ✅ LATEST SESSION
  const calculateLatestAttendance = (
    attendanceData
  ) => {
    if (attendanceData.length === 0)
      return;

    const latestAttendance = [
      ...attendanceData,
    ].sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )[0];

    setLatestSubject(
      latestAttendance.subject
    );

    setLatestDate(latestAttendance.date);
  };

  // ✅ SELECTED DATE ATTENDANCE
  const calculateSelectedDateAttendance =
    (
      attendanceData,
      studentsData,
      selectedDate
    ) => {
      // ✅ GET ALL RECORDS OF THAT DATE
      const selectedAttendance =
        attendanceData.filter(
          (item) =>
            item.date === selectedDate
        );

      if (
        selectedAttendance.length === 0
      ) {
        setPresentStudents([]);

        setAbsentStudents([]);

        return;
      }

      const presentSet = new Set();

      const absentSet = new Set();

      selectedAttendance.forEach(
        (attendanceItem) => {
          attendanceItem.attendanceRecords.forEach(
            (record) => {
              const student =
                studentsData.find(
                  (s) =>
                    s._id ===
                    record.studentId?.toString()
                );

              if (!student) return;

              if (
                record.attendance ===
                "present"
              ) {
                presentSet.add(
                  student.Name
                );

                absentSet.delete(
                  student.Name
                );
              }

              if (
                record.attendance ===
                "absent"
              ) {
                absentSet.add(
                  student.Name
                );

                presentSet.delete(
                  student.Name
                );
              }
            }
          );
        }
      );

      setPresentStudents([
        ...presentSet,
      ]);

      setAbsentStudents([
        ...absentSet,
      ]);
    };

  return (
    <div className="page">
      <h1>Dashboard</h1>

      {/* ✅ LATEST ENTRY */}
      <div className="card">
        <h2>
          Latest Subject:
          {" "}
          {latestSubject || "No Subject"}
        </h2>

        <p>
          Latest Attendance Date:
          {" "}
          {latestDate || "No Date"}
        </p>
      </div>

      {/* ✅ DATE PICKER */}
      <div className="card">
        <h2>
          View Attendance By Date
        </h2>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) =>
            setSelectedDate(
              e.target.value
            )
          }
        />
      </div>

      {/* ✅ DASHBOARD CARDS */}
      <DashboardCards
        total={students.length}
        present={presentStudents.length}
        absent={absentStudents.length}
      />

      {/* ✅ PRESENT STUDENTS */}
      <div className="card green">
        <h2>Present Students</h2>

        {presentStudents.length > 0 ? (
          presentStudents.map(
            (student, index) => (
              <p key={index}>
                {student}
              </p>
            )
          )
        ) : (
          <p>No Students</p>
        )}
      </div>

      {/* ✅ ABSENT STUDENTS */}
      <div className="card red">
        <h2>Absent Students</h2>

        {absentStudents.length > 0 ? (
          absentStudents.map(
            (student, index) => (
              <p key={index}>
                {student}
              </p>
            )
          )
        ) : (
          <p>No Students</p>
        )}
      </div>

      {/* ✅ SEMESTER ANALYTICS */}
      <Charts
        attendanceStats={attendanceStats}
      />
    </div>
  );
}

export default Dashboard;