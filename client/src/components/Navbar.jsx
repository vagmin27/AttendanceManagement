import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Attendance Manager</h2>

      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/attendance">Attendance</Link>
        <Link to="/add-student">Add Student</Link>
        <Link to="/remove-student">Remove Student</Link>
        <Link to="/reports">Reports</Link>
        <Link to="/add-subject">
          Add Subject
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;