import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import ReportForm from "../components/report/ReportForm";

export default function EditReportPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const report = state?.report;

  if (!report) {
    return (
      <DashboardLayout>
        <div className="bg-white border rounded-2xl p-8 text-center">
          <h1 className="text-2xl font-bold">Report details unavailable</h1>
          <p className="text-gray-500 mt-2">Open Edit from My Reports to modify a pending report.</p>
          <button onClick={() => navigate("/my-reports")} className="mt-5 bg-sky-600 text-white px-5 py-2.5 rounded-lg">Back to My Reports</button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <ReportForm editReport={report} onSuccess={() => navigate("/my-reports")} />
    </DashboardLayout>
  );
}
