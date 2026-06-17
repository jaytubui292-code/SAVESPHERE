// Central Data Store
const State = {
    view: 'dashboard',
    inventory: ['Coles Supply Chain', 'Woolies Bulk Link'],
    savingsData: [120, 190, 300, 500, 412]
};

function renderView(viewName) {
    const mount = document.getElementById('view-mount');
    if (viewName === 'dashboard') {
        mount.innerHTML = `
            <h2>Market Analytics</h2>
            <div class="card">
                <canvas id="mainChart" style="max-height: 300px;"></canvas>
            </div>
        `;
        initChart();
    } else if (viewName === 'procurement') {
        mount.innerHTML = `
            <h2>Procurement Manager</h2>
            <div class="card">
                <ul id="proc-list"></ul>
            </div>
        `;
        renderList();
    }
}

function initChart() {
    const ctx = document.getElementById('mainChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: { labels: ['J', 'F', 'M', 'A', 'M'], datasets: [{ data: State.savingsData, borderColor: '#4f46e5' }] }
    });
}

function renderList() {
    const list = document.getElementById('proc-list');
    list.innerHTML = State.inventory.map(item => `<li>${item} - <span style="color:#10b981">SYNCED</span></li>`).join('');
}

// Initialize default view
renderView('dashboard');
