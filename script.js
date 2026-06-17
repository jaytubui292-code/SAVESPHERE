document.getElementById('scan-btn').addEventListener('click', () => {
    const status = document.getElementById('status-output');
    status.innerText = "Scanning nodes... Status: OPTIMAL.";
    status.style.color = "#10b981";
});
