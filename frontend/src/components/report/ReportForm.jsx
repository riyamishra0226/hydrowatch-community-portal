import { createReport } from "../../api/reportApi";
import { useState } from "react";

function ReportForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Leakage",
    location: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const user = JSON.parse(localStorage.getItem("user"));

    const reportData = {
      ...formData,
      user: user.id,
    };

    const response = await createReport(reportData);

    alert(response.data.message);

    setFormData({
      title: "",
      description: "",
      category: "Leakage",
      location: "",
    });

  } catch (error) {
    alert(error.response?.data?.message || "Failed to submit report");
  }
};

  return (
    <div className="max-w-3xl mx-auto bg-white shadow rounded-xl p-8">
      <h1 className="text-3xl font-bold mb-6">
        🚰 Report Water Issue
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">

        <input
           type="text"
           name="title"
           value={formData.title}
            onChange={handleChange}
            placeholder="Issue Title"
           className="w-full border rounded-lg p-3"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the issue..."
          className="w-full border rounded-lg p-3"
          rows="4"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        >
          <option value="Leakage">Leakage</option>
          <option value="Pollution">Pollution</option>
          <option value="Water Logging">Water Logging</option>
          <option value="Illegal Water Use">Illegal Water Use</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border rounded-lg p-3"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Submit Report
        </button>

      </form>
    </div>
  );
}

export default ReportForm;