import { useState } from "react";
import API from "../services/api";

function Reports() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const downloadReport = async () => {
    try {
      if (!start || !end) {
        return alert(
          "Please select start and end date"
        );
      }

      if (start > end) {
        return alert(
          "Start date cannot be greater than end date"
        );
      }

      const response = await API.get(
        `/data/download?start=${start}&end=${end}`,
        {
          responseType: "blob",
        }
      );

      const url =
        window.URL.createObjectURL(
          new Blob([response.data])
        );

      const link =
        document.createElement("a");

      link.href = url;

      link.setAttribute(
        "download",
        "attendance.csv"
      );

      document.body.appendChild(link);

      link.click();
    } catch (error) {
      console.log(error);

      alert("Error downloading report");
    }
  };
  return (
    <div className="page">
      <h1>Download Reports</h1>

      <input
        type="date"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />

      <input
        type="date"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      />

      <button className="main-btn" onClick={downloadReport}>
        Download CSV
      </button>
    </div>
  );
}

export default Reports;