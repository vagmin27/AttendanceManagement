import { useState } from "react";

import API from "../services/api";

function RemoveStudent() {
  const [register, setRegister] =
    useState("");

  const removeStudent = async () => {
    try {
      // ✅ DELETE ATTENDANCE FIRST
      await API.delete(
        `/attendance/student/${register}`
      );

      // ✅ DELETE STUDENT
      await API.delete(
        `/remove/delete/${register}`
      );

      alert("Student Removed");

      setRegister("");
    } catch (error) {
      console.log(error);

      alert("Error Removing Student");
    }
  };

  return (
    <div className="page">
      <h1>Remove Student</h1>

      <input
        placeholder="Register Number"
        value={register}
        onChange={(e) =>
          setRegister(e.target.value)
        }
      />

      <button
        className="delete-btn"
        onClick={removeStudent}
      >
        Remove
      </button>
    </div>
  );
}

export default RemoveStudent;