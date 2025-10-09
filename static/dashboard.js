let map, markers = [];
let selectedArea = null; // Track currently selected area

async function fetchTrafficData() {
    const res = await fetch('/api/traffic');
    const data = await res.json();
    return data.locations;
}

function initMap(center=[9.9252, 78.1198], zoom=12) {
    map = L.map('map').setView(center, zoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
}

function clearMarkers() {
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
}

function addMarkers(locations) {
    clearMarkers();
    locations.forEach(loc => {
        let color = loc.risk_score >= 7 ? 'red' : loc.risk_score >= 4 ? 'orange' : 'green';
        let marker = L.circleMarker([loc.lat, loc.lng], {
            radius: 10,
            color: color,
            fillOpacity: 0.7
        }).addTo(map).bindPopup(
            `<b>${loc.name}</b><br>
             Vehicles: ${loc.vehicle_count}<br>
             Speed: ${loc.speed} km/h<br>
             Traffic: ${loc.traffic}<br>
             Weather: ${loc.weather}<br>
             Risk Score: ${loc.risk_score}`
        );
        markers.push(marker);
    });
}

function populateAreaSelect(locations) {
    const select = document.getElementById('area-select');
    select.innerHTML = '<option value="">--Select Area--</option>'; // reset
    locations.forEach(loc => {
        const opt = document.createElement('option');
        opt.value = loc.name;
        opt.text = loc.name;
        select.appendChild(opt);
    });
}

function showCardsAll(locations) {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';
    locations.forEach(location => {
        const card = document.createElement('div');
        card.className = 'card';
        card.classList.add(
            location.risk_score >= 7 ? 'high' :
            location.risk_score >= 4 ? 'medium' : 'low'
        );
        card.innerHTML = `
            <h3>${location.name}</h3>
            <p>Vehicles: ${location.vehicle_count}</p>
            <p>Speed: ${location.speed} km/h</p>
            <p>Traffic: ${location.traffic}</p>
            <p>Weather: ${location.weather}</p>
            <p>Risk Score: ${location.risk_score}</p>
        `;
        container.appendChild(card);
    });
}

function showAlerts(location) {
    const alerts = document.getElementById('alerts-container');
    alerts.style.display = 'block';
    if (location.risk_score >= 7) {
        alerts.textContent = `⚠️ High risk detected at ${location.name}!`;
        alerts.className = 'high-risk';
    } else if (location.risk_score >= 4) {
        alerts.textContent = `⚠️ Moderate risk at ${location.name}.`;
        alerts.className = 'medium-risk';
    } else {
        alerts.textContent = `✅ Low risk at ${location.name}.`;
        alerts.className = 'low-risk';
    }
}

function showChart(location) {
    const ctx = document.getElementById('trafficChart').getContext('2d');
    if(window.trafficChartInstance) window.trafficChartInstance.destroy();

    window.trafficChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: location.history.map((_, i) => `T-${i+1}`),
            datasets: [{
                label: 'Vehicle Count',
                data: location.history.map(h => h.vehicle_count),
                borderColor: 'blue',
                fill: false
            },{
                label: 'Risk Score',
                data: location.history.map(h => h.risk_score),
                borderColor: 'red',
                fill: false
            }]
        },
        options: { responsive: true }
    });
}

// --- Area selection button ---
document.getElementById('select-area-btn').addEventListener('click', async () => {
    const areaName = document.getElementById('area-select').value;
    const locations = await fetchTrafficData();
    const loc = locations.find(l => l.name === areaName);
    if(!loc) return;

    selectedArea = loc.name;  // track selected area
    clearMarkers();
    addMarkers([loc]);
    map.setView([loc.lat, loc.lng], 14);
    showAlerts(loc);
    showCardsAll([loc]);
    showChart(loc);
});

// --- Initialize ---
(async () => {
    const locations = await fetchTrafficData();
    initMap();
    populateAreaSelect(locations);
    addMarkers(locations);
    showCardsAll(locations);

    // --- Auto-refresh every 5 seconds ---
    setInterval(async () => {
        const newData = await fetchTrafficData();

        // Update map and cards
        if(selectedArea) {
            const loc = newData.find(l => l.name === selectedArea);
            if(loc) {
                clearMarkers();
                addMarkers([loc]);
                showCardsAll([loc]);
                showAlerts(loc);
                showChart(loc);
            }
        } else {
            addMarkers(newData);
            showCardsAll(newData);
        }
    }, 5000);
})();


