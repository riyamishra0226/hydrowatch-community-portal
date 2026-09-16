import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { applyForVolunteer, getMyVolunteerApplication } from "../api/volunteerApi";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

export default function VolunteerApplicationPage() {
  const { user, setUser } = useAuth();
  const [application, setApplication] = useState(null);
  const [form, setForm] = useState({ reason: "", experience: "", availability: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => { getMyVolunteerApplication().then(r => { setApplication(r.data); if (r.data) setForm({ reason:r.data.reason||"", experience:r.data.experience||"", availability:r.data.availability||"" }); }).catch(() => {}); }, []);

  if (user?.role === "volunteer") return <DashboardLayout><div className="max-w-2xl mx-auto bg-white border rounded-2xl p-8"><h1 className="text-3xl font-bold">Volunteer Status</h1><p className="text-emerald-700 font-semibold mt-3">Approved</p><p className="text-slate-600 mt-2">You can create campaigns and manage participation for campaigns you organize.</p></div></DashboardLayout>;

  const submit = async e => { e.preventDefault(); setLoading(true); try { const r=await applyForVolunteer(form); setApplication(r.data.application); toast.success("Volunteer application submitted"); } catch(e){ toast.error(e.response?.data?.message || "Could not submit application"); } finally { setLoading(false); } };

  return <DashboardLayout><div className="max-w-2xl mx-auto pb-10"><div className="mb-7"><p className="text-sky-600 font-semibold">COMMUNITY ROLE</p><h1 className="text-3xl font-bold">Become a Volunteer</h1><p className="text-slate-500 mt-1">Volunteer applications are reviewed by an administrator before campaign creation access is granted.</p></div>{application?.status === "Pending" && <div className="mb-5 bg-amber-50 border border-amber-200 rounded-xl p-4"><b>Application pending.</b><p className="text-sm text-amber-800 mt-1">An administrator needs to review it before you can create campaigns.</p></div>}{application?.status === "Rejected" && <div className="mb-5 bg-red-50 border border-red-200 rounded-xl p-4"><b>Previous application rejected.</b>{application.adminNote&&<p className="text-sm text-red-800 mt-1">Admin note: {application.adminNote}</p>}</div>}<form onSubmit={submit} className="bg-white border rounded-2xl p-6 shadow-sm"><label className="block text-sm font-semibold mb-2">Why do you want to volunteer? *</label><textarea value={form.reason} onChange={e=>setForm({...form,reason:e.target.value})} required maxLength={1000} rows={5} className="w-full border rounded-xl p-3 mb-5" placeholder="Explain how you can contribute to local water-related activities."/><label className="block text-sm font-semibold mb-2">Relevant experience</label><textarea value={form.experience} onChange={e=>setForm({...form,experience:e.target.value})} maxLength={1000} rows={4} className="w-full border rounded-xl p-3 mb-5" placeholder="Community work, event organization, environmental activities, etc."/><label className="block text-sm font-semibold mb-2">Availability</label><input value={form.availability} onChange={e=>setForm({...form,availability:e.target.value})} maxLength={500} className="w-full border rounded-xl p-3 mb-5" placeholder="e.g. Weekends, 9 AM–1 PM"/><button disabled={loading||application?.status==='Pending'} className="w-full bg-sky-600 disabled:bg-sky-300 text-white py-3 rounded-xl font-semibold">{loading?"Submitting...":application?.status==='Pending'?"Application Pending":"Submit Volunteer Application"}</button></form></div></DashboardLayout>;
}
