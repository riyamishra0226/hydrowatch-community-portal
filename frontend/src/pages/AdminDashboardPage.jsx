import { useEffect, useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line, CartesianGrid } from "recharts";
import { getAdminStats, getAdminReports, getAdminUsers, updateReportStatus, assignReport, deleteReport } from "../api/reportApi";
import DashboardLayout from "../components/layout/DashboardLayout";
import toast from "react-hot-toast";
import ReportMap from "../components/admin/ReportMap";

const statuses = ["Pending", "Under Review", "In Progress", "Resolved", "Closed"];
const categories = ["Leakage", "Pollution", "Water Logging", "Illegal Water Use", "Other"];
const severities = ["Low", "Medium", "High", "Critical"];
const chartColors = ["#38bdf8", "#fbbf24", "#f97316", "#ef4444", "#64748b"];

function Badge({ children, tone = "slate" }) {
  const tones = {
    slate: "bg-slate-100 text-slate-700", green: "bg-emerald-100 text-emerald-700",
    amber: "bg-amber-100 text-amber-700", orange: "bg-orange-100 text-orange-700",
    red: "bg-red-100 text-red-700", blue: "bg-sky-100 text-sky-700",
  };
  return <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}

const toneForStatus = s => ({ Pending: "amber", "Under Review": "blue", "In Progress": "orange", Resolved: "green", Closed: "slate" }[s] || "slate");
const toneForSeverity = s => ({ Critical: "red", High: "orange", Medium: "amber", Low: "green" }[s] || "slate");

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [reports, setReports] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [filters, setFilters] = useState({ search: "", status: "", category: "", severity: "", assigned: "" });
  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const query = useMemo(() => Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== "")), [filters]);

  const load = async () => {
    setLoading(true);
    try {
      const [s, r, u] = await Promise.all([getAdminStats(), getAdminReports(query), getAdminUsers()]);
      setStats(s.data);
      setReports(r.data);
      setAdmins(u.data.filter(x => x.role === "admin"));
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to load admin data");
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [query.search, query.status, query.category, query.severity, query.assigned]);

  const changeStatus = async (report, status) => {
    setUpdating(true);
    try {
      await updateReportStatus(report._id, { status, note: note.trim() });
      toast.success("Report status updated");
      setNote("");
      await load();
      setSelected(prev => prev?._id === report._id ? { ...prev, status } : prev);
    } catch (e) {
      toast.error(e.response?.data?.message || "Status update failed");
    } finally { setUpdating(false); }
  };

  const assign = async (report, userId) => {
    if (!userId) return;
    try { await assignReport(report._id, userId); toast.success("Report assigned"); await load(); }
    catch (e) { toast.error(e.response?.data?.message || "Assignment failed"); }
  };

  const removeReport = async (report) => {
    const confirmed = window.confirm(`Delete the report "${report.title}"? This action cannot be undone.`);
    if (!confirmed) return;
    setUpdating(true);
    try {
      await deleteReport(report._id);
      toast.success("Report deleted successfully");
      setSelected(null);
      await load();
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to delete report");
    } finally {
      setUpdating(false);
    }
  };

  const t = stats?.totals || {};
  const clearFilters = () => setFilters({ search: "", status: "", category: "", severity: "", assigned: "" });

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto pb-10">
        <div className="flex flex-wrap justify-between items-end gap-4 mb-7">
          <div>
            <p className="text-sky-600 font-semibold tracking-wide">ADMINISTRATION</p>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">HydroWatch Control Center</h1>
            <p className="text-slate-500 mt-1">Monitor, prioritize and coordinate community water reports.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-3 mb-6">
          {[
            ["Total", t.total, "slate"], ["Pending", t.pending, "amber"], ["Review", t.review, "blue"],
            ["In Progress", t.progress, "orange"], ["Resolved", t.resolved, "green"],
            ["Critical", t.critical, "red"], ["Resolution", `${t.resolutionRate ?? 0}%`, "green"]
          ].map(([label, value, tone]) => (
            <div key={label} className="bg-white border rounded-2xl p-4 shadow-sm">
              <Badge tone={tone}>{label}</Badge>
              <div className="text-2xl font-bold mt-2 text-slate-900">{value ?? "—"}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl border p-5 lg:col-span-2">
            <div className="flex justify-between items-start gap-3 mb-3">
              <div><h2 className="font-bold text-lg">30-Day Report Trend</h2><p className="text-sm text-slate-500">New reports compared with resolved/closed reports.</p></div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={(stats?.dailyTrend || []).map(x => ({ date: x._id.slice(5), reports: x.count, resolved: x.resolved }))}>
                  <CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="date"/><YAxis allowDecimals={false}/><Tooltip/><Legend/>
                  <Line type="monotone" dataKey="reports" stroke="#0ea5e9" strokeWidth={2} dot={false}/>
                  <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} dot={false}/>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white rounded-2xl border p-5">
            <h2 className="font-bold text-lg">Performance</h2>
            <p className="text-sm text-slate-500 mb-4">Current service-level indicators.</p>
            <div className="space-y-4">
              <div><p className="text-xs text-slate-400">AVERAGE RESOLUTION TIME</p><p className="text-3xl font-bold text-slate-900 mt-1">{t.averageResolutionDays ?? 0} <span className="text-base font-medium">days</span></p></div>
              <div><p className="text-xs text-slate-400">CLOSED REPORTS</p><p className="text-2xl font-bold text-slate-900 mt-1">{t.closed ?? 0}</p></div>
              <div><p className="text-xs text-slate-400">ACTIVE CRITICAL ISSUES</p><p className="text-2xl font-bold text-red-600 mt-1">{t.critical ?? 0}</p></div>
            </div>
          </div>
        </div>

        <ReportMap reports={reports} />

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl border p-5">
            <h2 className="font-bold text-lg">Issues by Category</h2>
            <p className="text-sm text-slate-500 mb-3">Distribution of all submitted reports.</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={(stats?.category || []).map(x => ({ name: x._id, count: x.count }))}>
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-12} textAnchor="end" height={45}/>
                  <YAxis allowDecimals={false}/><Tooltip/><Bar dataKey="count" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white rounded-2xl border p-5">
            <h2 className="font-bold text-lg">Severity Distribution</h2>
            <p className="text-sm text-slate-500 mb-3">Use severity to prioritize unresolved issues.</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={(stats?.severity || []).map(x => ({ name: x._id, count: x.count }))} dataKey="count" nameKey="name" outerRadius={82} label>
                    {(stats?.severity || []).map((x, i) => <Cell key={x._id} fill={chartColors[i % chartColors.length]} />)}
                  </Pie>
                  <Tooltip/><Legend/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border p-5 mb-6">
          <h2 className="font-bold text-lg">6-Month Overview</h2>
          <p className="text-sm text-slate-500 mb-3">Monthly reporting volume and completed work.</p>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={(stats?.monthlyTrend || []).map(x => ({ month: x._id, reports: x.count, resolved: x.resolved }))}>
                <CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="month"/><YAxis allowDecimals={false}/><Tooltip/><Legend/>
                <Bar dataKey="reports"/><Bar dataKey="resolved"/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          <div className="p-5 border-b">
            <div className="flex flex-wrap justify-between gap-3 mb-4">
              <div><h2 className="text-xl font-bold">Report Management</h2><p className="text-sm text-slate-500">Search, prioritize, assign and manage the report lifecycle.</p></div>
              <button onClick={clearFilters} className="px-3 py-2 rounded-lg border text-sm hover:bg-slate-50">Clear filters</button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-2">
              <input value={filters.search} onChange={e => setFilters({...filters, search:e.target.value})} placeholder="Search title, location..." className="border rounded-lg px-3 py-2 text-sm lg:col-span-2"/>
              <select value={filters.status} onChange={e=>setFilters({...filters,status:e.target.value})} className="border rounded-lg px-3 py-2 text-sm"><option value="">All statuses</option>{statuses.map(x=><option key={x}>{x}</option>)}</select>
              <select value={filters.category} onChange={e=>setFilters({...filters,category:e.target.value})} className="border rounded-lg px-3 py-2 text-sm"><option value="">All categories</option>{categories.map(x=><option key={x}>{x}</option>)}</select>
              <select value={filters.severity} onChange={e=>setFilters({...filters,severity:e.target.value})} className="border rounded-lg px-3 py-2 text-sm"><option value="">All severity</option>{severities.map(x=><option key={x}>{x}</option>)}</select>
            </div>
          </div>

          {loading ? <div className="p-12 text-center text-slate-500">Loading reports...</div> :
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[1000px]">
              <thead className="bg-slate-50 text-slate-600"><tr>{["Issue","Reporter","Category","Severity","Assigned","Status","Action"].map(x=><th key={x} className="p-3 text-left">{x}</th>)}</tr></thead>
              <tbody>
                {reports.map(r => (
                  <tr key={r._id} className="border-t hover:bg-slate-50/70 align-top">
                    <td className="p-3"><button onClick={()=>setSelected(r)} className="text-left font-semibold text-sky-700 hover:underline">{r.title}</button><div className="text-xs text-slate-500">{r.location}</div><div className="text-xs text-slate-400 mt-1">{new Date(r.createdAt).toLocaleString()}</div></td>
                    <td className="p-3">{r.user?.name || "—"}<div className="text-xs text-slate-400">{r.user?.email}</div></td>
                    <td className="p-3">{r.category}</td>
                    <td className="p-3"><Badge tone={toneForSeverity(r.severity)}>{r.severity}</Badge></td>
                    <td className="p-3"><select value={r.assignedTo?._id||""} onChange={e=>assign(r,e.target.value)} className="border rounded-lg p-2 max-w-[160px]"><option value="">Unassigned</option>{admins.map(a=><option key={a._id} value={a._id}>{a.name}</option>)}</select></td>
                    <td className="p-3"><Badge tone={toneForStatus(r.status)}>{r.status}</Badge></td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-2">
                        <button onClick={()=>{setSelected(r);setNote(r.adminNote||"")}} className="px-3 py-2 rounded-lg bg-slate-900 text-white text-xs">Manage</button>
                        <button onClick={()=>removeReport(r)} className="px-3 py-2 rounded-lg border border-red-200 text-red-700 bg-red-50 hover:bg-red-100 text-xs font-semibold">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!reports.length && <tr><td colSpan="7" className="p-10 text-center text-slate-500">No reports match the selected filters.</td></tr>}
              </tbody>
            </table>
          </div>}
        </div>

        {selected && (
          <div className="fixed inset-0 z-50 bg-black/40 p-4 grid place-items-center" onMouseDown={e=>e.target===e.currentTarget&&setSelected(null)}>
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="p-5 border-b flex justify-between gap-4"><div><p className="text-xs font-semibold text-sky-600">REPORT DETAILS</p><h2 className="text-2xl font-bold">{selected.title}</h2></div><button onClick={()=>setSelected(null)} className="text-2xl text-slate-400">×</button></div>
              <div className="p-5 grid md:grid-cols-2 gap-5">
                <div className="space-y-3">
                  <div><p className="text-xs text-slate-400">DESCRIPTION</p><p>{selected.description}</p></div>
                  <div className="grid grid-cols-2 gap-3"><div><p className="text-xs text-slate-400">CATEGORY</p><p>{selected.category}</p></div><div><p className="text-xs text-slate-400">SEVERITY</p><Badge tone={toneForSeverity(selected.severity)}>{selected.severity}</Badge></div></div>
                  <div><p className="text-xs text-slate-400">LOCATION</p><p>{selected.location}</p>{selected.latitude != null && <p className="text-xs text-slate-500">{selected.latitude}, {selected.longitude}</p>}</div>
                  {selected.image && <img src={selected.image} alt="Report evidence" className="w-full max-h-56 object-cover rounded-xl border"/>}
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-2">STATUS</p>
                  <select disabled={updating} value={selected.status} onChange={e=>changeStatus(selected,e.target.value)} className="w-full border rounded-lg px-3 py-2">{statuses.map(s=><option key={s}>{s}</option>)}</select>
                  <p className="text-xs text-slate-400 mt-4 mb-2">ADMIN NOTE</p>
                  <textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Add context for the citizen..." rows="4" className="w-full border rounded-lg p-3"/>
                  <p className="text-xs text-slate-400 mt-4 mb-2">ASSIGN ADMIN</p>
                  <select value={selected.assignedTo?._id||""} onChange={async e=>{await assign(selected,e.target.value);setSelected({...selected,assignedTo:admins.find(a=>a._id===e.target.value)||null})}} className="w-full border rounded-lg px-3 py-2"><option value="">Unassigned</option>{admins.map(a=><option key={a._id} value={a._id}>{a.name} — {a.email}</option>)}</select>
                  <button
                    type="button"
                    disabled={updating}
                    onClick={() => removeReport(selected)}
                    className="mt-5 w-full px-4 py-2.5 rounded-lg border border-red-200 text-red-700 bg-red-50 hover:bg-red-100 font-semibold disabled:opacity-50"
                  >
                    Delete Report
                  </button>
                  <p className="text-xs text-slate-400 mt-4 mb-2">STATUS HISTORY</p>
                  <div className="border rounded-xl divide-y">{(selected.statusHistory||[]).slice().reverse().map((h,i)=><div key={i} className="p-3"><div className="flex justify-between"><Badge tone={toneForStatus(h.status)}>{h.status}</Badge><span className="text-xs text-slate-400">{new Date(h.changedAt).toLocaleString()}</span></div>{h.note&&<p className="text-sm mt-1">{h.note}</p>}</div>)}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
