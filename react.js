import React, { useState } from 'react';
import './style.css'; // Reuses styles written above cleanly

export default function HydroWatchApp() {
  const [reports, setReports] = useState([
    { id: 1, location: "Downtown Sector 4", type: "Contamination", desc: "Drinking supply has a brownish color." },
    { id: 2, location: "Main Street Crossing", type: "Leakage", desc: "Main water pipeline burst causing road flooding." }
  ]);

  const [form, setForm] = useState({ location: '', type: 'Contamination', desc: '' });

  const totalReports = reports.length;
  const criticalCount = reports.filter(r => r.type === 'Contamination').length;
  const leakageCount = reports.filter(r => r.type === 'Leakage').length;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.location || !form.desc) return;
    
    setReports([{ id: Date.now(), ...form }, ...reports]);
    setForm({ location: '', type: 'Contamination', desc: '' });
  };

  return (
    <div className="container">
      <header>
        <h1>HydroWatch Community Portal (React)</h1>
        <p>SDG 6 Infrastructure Reporting Workspace</p>
      </header>

      <div className="metrics-grid">
        <div class="metric-card">
          <div className="metric-number">{totalReports}</div>
          <div className="metric-label">Total Reports</div>
        </div>
        <div className="metric-card critical">
          <div className="metric-number">{criticalCount}</div>
          <div className="metric-label">Contamination Alerts</div>
        </div>
        <div className="metric-card resolved">
          <div className="metric-number">{leakageCount}</div>
          <div className="metric-label">Pipe Leaks</div>
        </div>
      </div>

      <div className="main-content">
        <div className="panel">
          <h2 className="panel-title">Report An Incident</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Location Name</label>
              <input 
                type="text" 
                value={form.location} 
                onChange={e => setForm({...form, location: e.target.value})} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Primary Issue</label>
              <select 
                value={form.type} 
                onChange={e => setForm({...form, type: e.target.value})}
              >
                <option value="Contamination">Water Contamination</option>
                <option value="Leakage">Pipeline Rupture</option>
                <option value="Low Pressure">Low Pressure</option>
              </select>
            </div>
            <div className="form-group">
              <label>Detailed Description</label>
              <textarea 
                rows="4" 
                value={form.desc} 
                onChange={e => setForm({...form, desc: e.target.value})} 
                required
              ></textarea>
            </div>
            <button type="submit">Submit Live Report</button>
          </form>
        </div>

        <div className="panel">
          <h2 className="panel-title">Active Public Incident Logs</h2>
          <div className="reports-list">
            {reports.map(report => (
              <div key={report.id} className="report-item">
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
                  <span><strong>📍</strong> {report.location}</span>
                  <span className="badge">{report.type}</span>
                </div>
                <p>{report.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}