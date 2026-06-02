let reports = [
    { id: 1, location: "Downtown Sector 4", type: "Contamination", desc: "Drinking supply has a brownish color." },
    { id: 2, location: "Main Street Crossing", type: "Leakage", desc: "Main water pipeline burst causing road flooding." }
];

document.getElementById('reportForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const location = document.getElementById('location').value;
    const type = document.getElementById('issueType').value;
    const desc = document.getElementById('description').value;

    reports.unshift({ id: Date.now(), location, type, desc });
    updateUI();
    this.reset();
});

function updateUI() {
    const listContainer = document.getElementById('reportsList');
    listContainer.innerHTML = '';
    let criticalCount = 0, leakageCount = 0;

    reports.forEach(report => {
        if (report.type === 'Contamination') criticalCount++;
        if (report.type === 'Leakage') leakageCount++;

        const div = document.createElement('div');
        div.className = 'report-item';
        div.innerHTML = `
            <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
                <span><strong>📍</strong> ${escapeHTML(report.location)}</span>
                <span class="badge">${report.type}</span>
            </div>
            <p>${escapeHTML(report.desc)}</p>
        `;
        listContainer.appendChild(div);
    });

    document.getElementById('count-total').textContent = reports.length;
    document.getElementById('count-critical').textContent = criticalCount;
    document.getElementById('count-leakage').textContent = leakageCount;
}

function escapeHTML(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

updateUI();