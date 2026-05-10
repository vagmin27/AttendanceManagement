function StudentTable({
  students,
  attendanceData,
  handleAttendance,
}) {
  return (
    <table className="student-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Register No</th>
          <th>Department</th>
          <th>Attendance</th>
        </tr>
      </thead>

      <tbody>
        {students.map((student) => (
          <tr key={student._id}>
            <td>{student.Name}</td>
            <td>{student.Register_number}</td>
            <td>{student.Branch_of_studying}</td>

            <td>
              <button
                className={
                  attendanceData[student._id] === "present"
                    ? "present-btn active"
                    : "present-btn"
                }
                onClick={() =>
                  handleAttendance(student._id, "present")
                }
              >
                Present
              </button>

              <button
                className={
                  attendanceData[student._id] === "absent"
                    ? "absent-btn active"
                    : "absent-btn"
                }
                onClick={() =>
                  handleAttendance(student._id, "absent")
                }
              >
                Absent
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StudentTable;