const form = document.getElementById('hairFallForm');
const countInput = document.getElementById('count');
let hairData = JSON.parse(localStorage.getItem("hairData") || "[]");

form.onsubmit = (e) => {
  e.preventDefault();
  const count = parseInt(countInput.value);
  hairData.push({ date: new Date().toISOString().split('T')[0], count });
  localStorage.setItem("hairData", JSON.stringify(hairData));
  countInput.value = '';
  renderChart();
};

async function generateTips() {
  const input = document.getElementById("userInput").value;
  const outputDiv = document.getElementById("aiTips");
  outputDiv.innerHTML = "⏳ Generating tip...";

  try {
    const res = await fetch('/generate-tip', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mood: input })
    });

    const data = await res.json();
    outputDiv.innerHTML = `<p>💡 ${data.tip}</p>`;
  } catch {
    outputDiv.innerHTML = "<p>❌ Failed to get tip.</p>";
  }
}

async function pushNotification() {
  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      const res = await fetch('/generate-tip', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood: 'Send a cute hair care push notification' })
      });
      const data = await res.json();
      new Notification("💇 Hair Care Reminder", {
        body: data.tip,
        icon: "/icon.png"
      });
    } catch (err) {
      console.log("Push failed");
    }
  }
}

window.onload = () => {
  renderChart();
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
  }
  if (Notification.permission !== 'granted') {
    Notification.requestPermission();
  }

  // Trigger notification every 4 hours
  setInterval(() => {
    if (Notification.permission === 'granted') {
      pushNotification();
    }
  }, 1000 * 60 * 60 * 4); // 4 hours
};