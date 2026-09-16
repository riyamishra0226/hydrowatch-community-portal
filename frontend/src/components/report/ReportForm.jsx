import { createReport, updateReport } from "../../api/reportApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ImageUpload from "./ImageUpload";
import LocationPicker from "./LocationPicker";

const initial = { title:"",description:"",category:"Leakage",location:"",latitude:null,longitude:null,severity:"Medium",image:"" };

export default function ReportForm({ editReport = null, onSuccess }) {
 const [formData,setFormData]=useState(editReport ? {
   title: editReport.title || "", description: editReport.description || "", category: editReport.category || "Leakage",
   location: editReport.location || "", latitude: editReport.latitude ?? null, longitude: editReport.longitude ?? null,
   severity: editReport.severity || "Medium", image: editReport.image || ""
 } : initial);
 const [loading,setLoading]=useState(false);
 const editing=Boolean(editReport);
 useEffect(() => { if (editReport) setFormData({ title: editReport.title || "", description: editReport.description || "", category: editReport.category || "Leakage", location: editReport.location || "", latitude: editReport.latitude ?? null, longitude: editReport.longitude ?? null, severity: editReport.severity || "Medium", image: editReport.image || "" }); }, [editReport]);
 const change=e=>setFormData({...formData,[e.target.name]:e.target.value});
 const locationChange=d=>setFormData(x=>({...x,...d}));
 const submit=async e=>{e.preventDefault();setLoading(true);try{if(editing){await updateReport(editReport._id,formData);toast.success("Report updated successfully");}else{await createReport(formData);toast.success("Report submitted successfully");setFormData(initial);} onSuccess?.();}catch(err){toast.error(err.response?.data?.message||(editing?"Failed to update report":"Failed to submit report"));}finally{setLoading(false)}};
 return <div className="max-w-3xl mx-auto bg-white shadow-sm border rounded-2xl p-6 md:p-8"><h1 className="text-3xl font-bold mb-2">{editing?"✏️ Edit Water Issue":"🚰 Report Water Issue"}</h1><p className="text-gray-500 mb-6">{editing?"You can edit this report while it is still pending review.":"Provide enough evidence and location information to help authorities act quickly."}</p><form onSubmit={submit} className="space-y-5"><input required name="title" value={formData.title} onChange={change} maxLength="120" placeholder="Issue title" className="w-full border rounded-lg p-3"/><textarea required name="description" value={formData.description} onChange={change} maxLength="2000" placeholder="Describe the issue..." className="w-full border rounded-lg p-3" rows="4"/><div className="grid md:grid-cols-2 gap-4"><select name="category" value={formData.category} onChange={change} className="w-full border rounded-lg p-3"><option>Leakage</option><option>Pollution</option><option>Water Logging</option><option>Illegal Water Use</option><option>Other</option></select><select name="severity" value={formData.severity} onChange={change} className="w-full border rounded-lg p-3"><option>Low</option><option>Medium</option><option>High</option><option>Critical</option></select></div><LocationPicker {...formData} onChange={locationChange}/><ImageUpload value={formData.image} onChange={image=>setFormData(x=>({...x,image}))}/><button disabled={loading} className="bg-blue-600 disabled:bg-blue-300 text-white px-6 py-3 rounded-lg font-semibold">{loading?(editing?"Saving...":"Submitting..."):(editing?"Save Changes":"Submit Report")}</button></form></div>
}
