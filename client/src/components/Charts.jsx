import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function Charts({
  attendanceStats,
}) {
  return (
    <div>
      {/* ✅ SUBJECT ATTENDANCE % */}
      <h2>Subject Attendance %</h2>

      <div
        style={{
          width: "100%",
          height: 400,
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "40px",
        }}
      >
        <ResponsiveContainer>
          <BarChart
            data={attendanceStats}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="subject" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="percentage"
              fill="#3b82f6"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ✅ PRESENT DAYS GRAPH */}
      <h2>
        Total Present Days Per Subject
      </h2>

      <div
        style={{
          width: "100%",
          height: 400,
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "40px",
        }}
      >
        <ResponsiveContainer>
          <BarChart
            data={attendanceStats}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="subject" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="presentDays"
              fill="#16a34a"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ✅ PIE CHART */}
      <h2>
        Semester Attendance Distribution
      </h2>

      <div
        style={{
          width: "100%",
          height: 500,
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={attendanceStats}
              dataKey="presentDays"
              nameKey="subject"
              outerRadius={150}
              label
            >
              {attendanceStats.map(
                (entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      [
                        "#3b82f6",
                        "#16a34a",
                        "#ef4444",
                        "#f59e0b",
                        "#8b5cf6",
                        "#06b6d4",
                      ][index % 6]
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Charts;