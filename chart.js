function renderChart() {
  const ctx = document.getElementById('chart').getContext('2d');
  const stored = JSON.parse(localStorage.getItem("hairData") || "[]");
  const labels = stored.map(e => e.date);
  const data = stored.map(e => e.count);

  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Hair Fall Count',
        data,
        borderColor: '#27ae60',
        backgroundColor: 'rgba(39,174,96,0.2)',
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}