import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { getCampaigns, joinCampaign } from "../api/reportApi";
import toast from "react-hot-toast";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [joining, setJoining] = useState("");
  const load = () => getCampaigns().then((res) => setCampaigns(res.data));
  useEffect(() => { load().catch(() => toast.error("Failed to load campaigns")); }, []);
  const join = async (id) => {
    setJoining(id);
    try { const res = await joinCampaign(id); toast.success(`${res.data.message}. +${res.data.rewardPoints} points`); await load(); }
    catch (e) { toast.error(e.response?.data?.message || "Could not join campaign"); }
    finally { setJoining(""); }
  };
  return <DashboardLayout><div className="max-w-6xl mx-auto p-2"><div className="mb-8"><p className="text-sky-600 font-semibold">COMMUNITY ACTION</p><h1 className="text-4xl font-bold">Campaigns</h1><p className="text-gray-500 mt-2">Join local initiatives and earn recognition for your contribution.</p></div><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{campaigns.map(c=><div key={c._id} className="bg-white rounded-2xl shadow-sm border p-6 flex flex-col"><div className="flex justify-between gap-3"><h2 className="text-xl font-bold">{c.title}</h2><span className="text-xs bg-sky-100 text-sky-700 rounded-full px-3 py-1 h-fit">+{c.rewardPoints ?? 0} pts</span></div><p className="text-gray-600 my-4 flex-1">{c.description}</p><p>📍 {c.location}</p><p className="mt-1">📅 {new Date(c.date).toLocaleDateString()}</p><button onClick={()=>join(c._id)} disabled={joining===c._id} className="w-full mt-5 bg-sky-600 disabled:bg-sky-300 text-white py-2.5 rounded-xl font-semibold">{joining===c._id?"Joining...":"Join Campaign"}</button></div>)}{!campaigns.length&&<div className="col-span-full bg-white p-10 rounded-2xl text-center text-gray-500">No campaigns available.</div>}</div></div></DashboardLayout>;
}
