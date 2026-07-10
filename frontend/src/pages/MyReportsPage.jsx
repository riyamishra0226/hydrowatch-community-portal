import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import ReportCard from "../components/report/ReportCard";
import { getMyReports } from "../api/reportApi";

function MyReportsPage() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await getMyReports(user.id);

      setReports(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load reports");
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">📋 My Reports</h1>

      {reports.length === 0 ? (
        <p className="text-gray-500">No reports found.</p>
      ) : (
        <div className="grid gap-6">
          {reports.map((report) => (
            <ReportCard key={report._id} report={report} onDelete={fetchReports} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

export default MyReportsPage;