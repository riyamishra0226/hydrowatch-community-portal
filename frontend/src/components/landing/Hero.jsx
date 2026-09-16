import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPublicStats } from "../../api/publicApi";
import heroImage from "../../assets/images/hydro-hero.png";

const formatNumber = (value) => new Intl.NumberFormat("en-IN").format(value || 0);

function Hero() {
  const [stats, setStats] = useState(null);
  useEffect(() => { getPublicStats().then((response) => setStats(response.data)).catch((error) => console.error("Hero statistics:", error)); }, []);
  const heroStats = [
    ["totalReports", "Water Reports"],
    ["communityMembers", "Community Members"],
    ["resolvedIssues", "Issues Resolved"],
  ];
  return <section id="home" className="min-h-[110vh] bg-gradient-to-r from-sky-50 to-white" style={{backgroundImage:`url(${heroImage})`,backgroundRepeat:"no-repeat",backgroundPosition:"right center",backgroundSize:"cover"}}>
    <div className="w-full pl-8 pr-8 lg:pl-12 lg:pr-8"><div className="grid lg:grid-cols-2 gap-16 items-center"><div>
      <span className="inline-block bg-sky-100 text-sky-700 px-4 py-2 rounded-full text-sm font-semibold">💧 SDG 6 • Clean Water & Sanitation</span>
      <h1 className="text-6xl font-extrabold text-slate-900 leading-tight mt-6">Protect Every Drop.<br/>Empower Every<span className="text-sky-600"> Community.</span></h1>
      <p className="text-lg text-gray-600 mt-6 leading-8">Report water leakage, pollution, illegal water wastage, and participate in community campaigns to build a cleaner, greener future together.</p>
      <div className="flex gap-5 mt-10"><Link to="/report" className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-4 rounded-xl shadow-lg hover:scale-105 transition duration-300">🚨 Report Issue</Link><Link to="/register" className="border-2 border-sky-600 text-sky-600 px-8 py-4 rounded-xl hover:bg-sky-50 hover:scale-105 transition duration-300">🌍 Join Community</Link></div>
      <div className="grid grid-cols-3 gap-8 mt-16">{heroStats.map(([key,label])=><div key={key}><h2 className="text-4xl font-bold text-sky-600">{stats?formatNumber(stats[key]):"—"}</h2><p className="text-gray-500 mt-2">{label}</p></div>)}</div>
    </div><div className="flex justify-center items-center"></div></div></div>
  </section>;
}
export default Hero;
