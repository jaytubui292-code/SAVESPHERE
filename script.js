// --- 1. UI Navigation Logic ---
function switchTab(tabId) {
    // Hide all panels
    document.querySelectorAll('.view-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    // Remove active state from buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show target panel and set button active
    document.getElementById('view-' + tabId).classList.add('active');
    event.currentTarget.classList.add('active');

    // Update Top Title
    const titles = {
        'dashboard': 'Live Dashboard',
        'market': 'Market Matrix',
        'network': 'Node Network Terminal'
    };
    document.getElementById('page-title').innerText = titles[tabId];
}

// --- 2. Live Chart Generator (The Illusion) ---
let liveChart;
function initChart() {
    const ctx = document.getElementById('liveChart').getContext('2d');
    
    // Generate initial fake data array
    let initialData = Array.from({length: 20}, () => Math.floor(Math.random() * 50) + 100);
    let labels = Array.from({length: 20}, (_, i) => `T-${20-i}s`);

    liveChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Market Index Value',
                data: initialData,
                borderColor: '#4f46e5',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                borderWidth: 2,
                pointRadius: 0, // Hides the dots to make it look like a smooth live ticker
                fill: true,
                tension: 0.4 // Smooth curves
            }]
        },
        options: {
            responsive: true,
            animation: { duration: 0 }, // Disable animation so it "ticks" instantly
            scales: {
                y: { grid: { color: '#334155' } },
                x: { grid: { display: false } }
            },
            plugins: { legend: { display: false } }
        }
    });
}

// --- 3. The Data Randomizer Engine ---
function randomizeData() {
    // 1. Randomize Top Metrics
    const yieldBase = 450;
    const yieldFluctuation = (Math.random() * 20 - 10); // Random number between -10 and +10
    const newYield = yieldBase + yieldFluctuation;
    document.getElementById('val-yield').innerText = '$' + newYield.toFixed(2);
    
    const yieldSub = document.getElementById('val-yield-sub');
    if (yieldFluctuation > 0) {
        yieldSub.innerText = `+${(Math.random() * 2).toFixed(2)}% from last hour`;
        yieldSub.className = 'metric-sub text-green';
    } else {
        yieldSub.innerText = `-${(Math.random() * 2).toFixed(2)}% from last hour`;
        yieldSub.className = 'metric-sub text-red';
    }

    document.getElementById('val-nodes').innerText = Math.floor(Math.random() * 500) + 1200;
    document.getElementById('val-efficiency').innerText = (Math.random() * 5 + 94).toFixed(1) + '%';

    // 2. Update Live Chart
    if (liveChart) {
        const newDataPoint = Math.floor(Math.random() * 50) + 100;
        
        // Remove oldest data point, add new one
        liveChart.data.datasets[0].data.shift();
        liveChart.data.datasets[0].data.push(newDataPoint);
        liveChart.update();
    }
}

// --- 4. Fake Table Generator ---
function populateTable() {
    const tableBody = document.getElementById('market-table-body');
    const nodes = ['Coles.Syd.01', 'Woolies.Metro.04', 'Aldi.Hub.09', 'Local.Vendor.X'];
    
    let html = '';
    for(let i = 0; i < 8; i++) {
        const id = 'COM-' + Math.floor(Math.random() * 9000 + 1000);
        const node = nodes[Math.floor(Math.random() * nodes.length)];
        const price = '$' + (Math.random() * 15 + 2).toFixed(2);
        const volatility = (Math.random() * 4 - 2);
        
        const volColor = volatility > 0 ? 'text-green' : 'text-red';
        const volText = volatility > 0 ? '+' + volatility.toFixed(2) + '%' : volatility.toFixed(2) + '%';

        html += `
            <tr>
                <td style="color: #94a3b8;">${id}</td>
                <td>${node}</td>
                <td style="font-weight: 600;">${price}</td>
                <td class="${volColor}">${volText}</td>
            </tr>
        `;
    }
    tableBody.innerHTML = html;
}

// --- 5. Fake Terminal Logs ---
function forceSync() {
    const terminal = document.getElementById('terminal-output');
    const phrases = [
        "> Bypassing local cache...",
        "> Establishing secure socket to pricing node...",
        "> 142 new commodities detected.",
        "> Synchronizing matrix... SUCCESS.",
        "> Recalculating efficiency parameters..."
    ];
    
    // Switch to terminal tab automatically to show the effect
    switchTab('network');
    
    let delay = 0;
    phrases.forEach(phrase => {
        setTimeout(() => {
            terminal.innerHTML += phrase + '<br>';
            terminal.scrollTop = terminal.scrollHeight; // Auto-scroll to bottom
        }, delay);
        delay += Math.random() * 800 + 400; // Random delay between messages
    });
}

// --- INITIALIZATION ---
// Run these functions when the page loads
window.onload = () => {
    initChart();
    populateTable();
    randomizeData();
    
    // Set Intervals to make the data change continuously on its own
    setInterval(randomizeData, 2000); // Updates top numbers and chart every 2 seconds
    setInterval(populateTable, 5000); // Refreshes table every 5 seconds
};
