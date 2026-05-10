import { useState } from "react";

import API from "../services/api";

function AddSubject() {
  const [subjectData, setSubjectData] =
    useState({
      subjectName: "",
      subjectCode: "",
      department: "",
      year: "",
    });

  const handleChange = (e) => {
    setSubjectData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const addSubject = async () => {
    try {
      await API.post(
        "/subjects",
        subjectData
      );

      alert("Subject Added");

      setSubjectData({
        subjectName: "",
        subjectCode: "",
        department: "",
        year: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page">
      <h1>Add Subject</h1>

      <input
        name="subjectName"
        placeholder="Subject Name"
        value={subjectData.subjectName}
        onChange={handleChange}
      />

      <input
        name="subjectCode"
        placeholder="Subject Code"
        value={subjectData.subjectCode}
        onChange={handleChange}
      />

      <input
        name="department"
        placeholder="Department"
        value={subjectData.department}
        onChange={handleChange}
      />

      <input
        name="year"
        placeholder="Year"
        value={subjectData.year}
        onChange={handleChange}
      />

      <button
        className="main-btn"
        onClick={addSubject}
      >
        Add Subject
      </button>
    </div>
  );
}

export default AddSubject;