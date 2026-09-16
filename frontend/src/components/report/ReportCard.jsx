import { useNavigate } from "react-router-dom";
import { deleteReport } from "../../api/reportApi";

function ReportCard({ report, onDelete }) {
  const navigate = useNavigate();
  const pending = report.status === "Pending";
  const handleDelete = async () => {
    if (!window.confirm("Delete this pending report? Any reward points earned for submission will be reversed.")) return;
    try { const res = await deleteReport(report._id); alert(res.data.pointsReversed ? `Report deleted. ${res.data.pointsReversed} points reversed.` : "Report deleted successfully"); onDelete(); }
    catch (error) { alert(error.response?.data?.message || "Failed to delete report"); }
  };
  return <div className="bg-white shadow rounded-xl p-6 border">
    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3"><div><h2 className="text-2xl font-bold text-blue-700">{report.title}</h2><p className="mt-3 text-gray-600">{report.description}</p></div><span className="px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-sm font-semibold w-fit">{report.status}</span></div>
    <div className="mt-4 space-y-1"><p>📍 {report.location}</p><p>💧 {report.category}</p><p>⚠️ {report.severity}</p>{report.updatedAt && report.updatedAt !== report.createdAt && <p className="text-xs text-gray-500">Edited: {new Date(report.updatedAt).toLocaleString()}</p>}</div>
    <div className="mt-5 flex gap-3">{pending && <><button onClick={()=>navigate(`/reports/${report._id}/edit`,{state:{report}})} className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700">Edit</button><button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Delete</button></>}{!pending && <p className="text-sm text-gray-500">This report is being processed and can no longer be edited or deleted.</p>}</div>
  </div>;
}
export default ReportCard;
