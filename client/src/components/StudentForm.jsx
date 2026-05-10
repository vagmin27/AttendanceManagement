import { useState } from "react";
import API from "../services/api";

function StudentForm({ refreshStudents }) {
  const [formData, setFormData] = useState({
    Name: "",
    Register_number: "",
    Year_of_studying: "",
    Branch_of_studying: "",
    Gender: "",
    Mobile_number: "",
    Email_id: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/form/insert", formData);

      alert("✅ Student Added Successfully");

      setFormData({
        Name: "",
        Register_number: "",
        Year_of_studying: "",
        Branch_of_studying: "",
        Gender: "",
        Mobile_number: "",
        Email_id: "",
      });

      if (refreshStudents) {
        refreshStudents();
      }
    } catch (error) {
      console.error(error);

      alert("❌ Failed To Add Student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={submitForm}>
      <h2>Add New Student</h2>

      <input
        type="text"
        name="Name"
        placeholder="Student Name"
        value={formData.Name}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="Register_number"
        placeholder="Register Number"
        value={formData.Register_number}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="Year_of_studying"
        placeholder="Year"
        value={formData.Year_of_studying}
        onChange={handleChange}
      />

      <input
        type="text"
        name="Branch_of_studying"
        placeholder="Department"
        value={formData.Branch_of_studying}
        onChange={handleChange}
      />

      <select
        name="Gender"
        value={formData.Gender}
        onChange={handleChange}
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <input
        type="text"
        name="Mobile_number"
        placeholder="Mobile Number"
        value={formData.Mobile_number}
        onChange={handleChange}
      />

      <input
        type="email"
        name="Email_id"
        placeholder="Email Address"
        value={formData.Email_id}
        onChange={handleChange}
      />

      <button
        type="submit"
        className="main-btn"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Student"}
      </button>
    </form>
  );
}

export default StudentForm;