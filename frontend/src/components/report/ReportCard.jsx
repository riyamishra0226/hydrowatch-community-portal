import { deleteReport } from "../../api/reportApi";

function ReportCard({ report, onDelete }) {

  const handleDelete = async () => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this report?"
    );

    if (!confirmDelete) return;

    try {

      await deleteReport(report._id);

      alert("Report deleted successfully");

      onDelete();

    } catch (error) {

      alert("Failed to delete report");

    }

  };

  return (
    <div className="bg-white shadow rounded-xl p-6">

      <h2 className="text-2xl font-bold text-blue-700">
        {report.title}
      </h2>

      <p className="mt-3 text-gray-600">
        {report.description}
      </p>

      <div className="mt-4">
        <p>📍 {report.location}</p>
        <p>💧 {report.category}</p>
        <p>📌 {report.status}</p>
      </div>

      <button
        onClick={handleDelete}
        className="mt-5 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Delete
      </button>

    </div>
  );
}

export default ReportCard;