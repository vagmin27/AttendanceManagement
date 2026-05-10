function DashboardCards({
  total,
  present,
  absent,
}) {
  return (
    <div className="cards-container">
      <div className="card">
        <h3>Total Students</h3>
        <p>{total}</p>
      </div>

      <div className="card green">
        <h3>Present</h3>
        <p>{present}</p>
      </div>

      <div className="card red">
        <h3>Absent</h3>
        <p>{absent}</p>
      </div>
    </div>
  );
}

export default DashboardCards;