import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import AddStudent from "./pages/AddStudent";
import Reports from "./pages/Reports";
import RemoveStudent from "./pages/RemoveStudent";
import AddSubject from "./pages/AddSubject";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/remove-student" element={<RemoveStudent />} />
        <Route
          path="/add-subject"
          element={<AddSubject />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;