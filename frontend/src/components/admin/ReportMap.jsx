import { useEffect, useRef, useState } from "react";

const LEAFLET_CSS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
const LEAFLET_JS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
const severityIcons = { Critical: "#dc2626", High: "#ea580c", Medium: "#d97706", Low: "#16a34a" };

function loadLeaflet() {
  if (window.L) return Promise.resolve(window.L);
  return new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-hydrowatch-leaflet="true"]');
    if (existing) {
      existing.addEventListener("load", () => resolve(window.L), { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }
    if (!document.querySelector('link[data-hydrowatch-leaflet="true"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet"; link.href = LEAFLET_CSS; link.dataset.hydrowatchLeaflet = "true";
      document.head.appendChild(link);
    }
    const script = document.createElement("script");
    script.src = LEAFLET_JS; script.async = true; script.dataset.hydrowatchLeaflet = "true";
    script.onload = () => resolve(window.L); script.onerror = () => reject(new Error("Map library failed"));
    document.body.appendChild(script);
  });
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
}

export default function ReportMap({ reports = [] }) {
  const mapRef = useRef(null), instanceRef = useRef(null), layerRef = useRef(null);
  const [mapError, setMapError] = useState(false);
  const isPlausibleIndiaCoordinate = (latitude, longitude) =>
    latitude >= 6 && latitude <= 37.5 && longitude >= 68 && longitude <= 97.5;
  const coordinateReports = reports.filter(r => Number.isFinite(Number(r.latitude)) && Number.isFinite(Number(r.longitude)));
  const mappedReports = coordinateReports.filter(r => isPlausibleIndiaCoordinate(Number(r.latitude), Number(r.longitude)));
  const invalidCoordinateCount = coordinateReports.length - mappedReports.length;

  useEffect(() => {
    let cancelled = false;
    loadLeaflet().then(L => {
      if (cancelled || !mapRef.current || instanceRef.current) return;
      const map = L.map(mapRef.current, { scrollWheelZoom: true }).setView([20.5937, 78.9629], 5);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors', maxZoom: 19,
      }).addTo(map);
      instanceRef.current = map; layerRef.current = L.layerGroup().addTo(map);
      setTimeout(() => map.invalidateSize(), 100);
    }).catch(() => setMapError(true));
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const map = instanceRef.current, L = window.L;
    if (!map || !L || !layerRef.current) return;
    layerRef.current.clearLayers();
    const bounds = [];
    mappedReports.forEach(report => {
      const lat = Number(report.latitude), lng = Number(report.longitude); bounds.push([lat, lng]);
      const color = severityIcons[report.severity] || "#475569";
      const icon = L.divIcon({ className: "hydrowatch-marker", html: `<div style="width:18px;height:18px;border-radius:50%;background:${color};border:3px solid white;box-shadow:0 1px 6px rgba(15,23,42,.45)"></div>`, iconSize: [18,18], iconAnchor: [9,9] });
      const popup = `<div style="min-width:210px;font-family:system-ui,sans-serif"><strong style="font-size:15px">${escapeHtml(report.title || "Water issue")}</strong><div style="margin-top:6px;font-size:12px;color:#475569">${escapeHtml(report.category || "—")} · ${escapeHtml(report.severity || "—")}</div><div style="margin-top:4px;font-size:12px;color:#475569">Status: ${escapeHtml(report.status || "—")}</div><div style="margin-top:4px;font-size:12px;color:#64748b">${escapeHtml(report.location || "GPS location")}</div><div style="margin-top:4px;font-size:11px;color:#94a3b8">GPS: ${lat.toFixed(5)}, ${lng.toFixed(5)}</div></div>`;
      L.marker([lat,lng], { icon }).bindPopup(popup).addTo(layerRef.current);
    });
    if (bounds.length === 1) map.setView(bounds[0], 13);
    else if (bounds.length > 1) map.fitBounds(bounds, { padding: [30,30], maxZoom: 14 });
    else map.setView([20.5937,78.9629], 5);
  }, [mappedReports]);

  return <div className="bg-white rounded-2xl border p-5 mb-6 shadow-sm">
    <div className="flex flex-wrap justify-between gap-3 items-start mb-4">
      <div><h2 className="font-bold text-lg">Report Hotspot Map</h2><p className="text-sm text-slate-500">Geographic view of reports with GPS coordinates. Click a marker for details.</p></div>
      <div className="flex flex-wrap gap-2 text-xs">{Object.entries(severityIcons).map(([severity,color]) => <span key={severity} className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-50 border text-slate-600"><span style={{backgroundColor:color}} className="w-2.5 h-2.5 rounded-full" />{severity}</span>)}</div>
    </div>
    {mapError ? <div className="h-72 rounded-xl bg-slate-50 border grid place-items-center p-6 text-center"><div><p className="font-semibold text-slate-700">Map could not be loaded.</p><p className="text-sm text-slate-500 mt-1">Check your internet connection and refresh the dashboard.</p></div></div> : <div className="relative"><div ref={mapRef} className="h-80 md:h-[430px] rounded-xl overflow-hidden border" /><div className="absolute left-3 bottom-3 z-[500] bg-white/95 border rounded-lg px-3 py-2 text-xs text-slate-600 shadow-sm">{mappedReports.length} mapped · {reports.length} filtered</div></div>}
    {!mapError && invalidCoordinateCount > 0 && <p className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mt-3">{invalidCoordinateCount} report{invalidCoordinateCount > 1 ? "s have" : " has"} invalid/out-of-India GPS coordinates and {invalidCoordinateCount > 1 ? "were" : "was"} hidden from the map. Edit the affected report and capture its location again with GPS.</p>}
    {!mapError && mappedReports.length === 0 && invalidCoordinateCount === 0 && <p className="text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mt-3">No reports in the current filters have GPS coordinates. Create a report with location access enabled to place it on the map.</p>}
  </div>;
}
