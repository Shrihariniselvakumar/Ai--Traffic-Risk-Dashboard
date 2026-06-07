# 🚦 AI-Powered Traffic Risk Dashboard

> A real-time traffic risk monitoring system built for **Madurai Police** — dynamically classifying road risk levels using live data feeds and an AI scoring model. Recognised at the **Kalam Awards** for innovation in smart traffic monitoring.

[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)

---

## 📌 Project Overview

This dashboard was developed to assist the **Madurai Police Department** in monitoring and responding to traffic risk in real time. It ingests live location-based traffic data, scores each zone using a risk model, and visualises the results on an interactive web dashboard — enabling faster, smarter traffic management decisions.

🏆 **Presented and recognised at the Kalam Awards** for innovation in smart traffic monitoring.

---

## ✨ Features

- 🗺️ **Real-time Location Mapping** — monitors multiple road locations simultaneously with lat/lng coordinates
- ⚠️ **Dynamic Risk Classification** — classifies traffic zones as Low / Medium / High risk based on live data
- 🚗 **Multi-factor Scoring** — considers vehicle count, speed, traffic density, and weather conditions
- 📊 **Interactive Dashboard** — live-updating UI built with HTML, CSS, and JavaScript
- ⚡ **FastAPI Backend** — lightweight, high-performance REST API serving traffic data
- 🌧️ **Weather-aware** — integrates weather condition (Clear, Rainy, Foggy) into risk scoring

---

## 📊 Data Schema

Each monitored location sends the following data points:

```json
{
  "locations": [
    {
      "name": "Main Street",
      "vehicle_count": 60,
      "speed": 80,
      "traffic": "High",
      "weather": "Rainy",
      "lat": 12.9716,
      "lng": 77.5946
    }
  ]
}
```

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Road / location name |
| `vehicle_count` | int | Number of vehicles detected |
| `speed` | int | Average speed (km/h) |
| `traffic` | string | Traffic density — Low / Medium / High |
| `weather` | string | Weather condition — Clear / Rainy / Foggy |
| `lat` / `lng` | float | GPS coordinates of the location |

---

## 🧠 Risk Classification Logic

| Traffic Level | Vehicle Count | Weather | Risk Score |
|--------------|---------------|---------|------------|
| High | > 50 | Rainy / Foggy | 🔴 High Risk |
| Medium | 20 – 50 | Any | 🟡 Medium Risk |
| Low | < 20 | Clear | 🟢 Low Risk |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend API | Python, FastAPI |
| Frontend | HTML, CSS, JavaScript |
| Data Format | JSON |
| Deployment | Local / Uvicorn |

**Language breakdown:**

![JavaScript](https://img.shields.io/badge/JavaScript-49.4%25-F7DF1E?style=flat&logo=javascript&logoColor=black)
![CSS](https://img.shields.io/badge/CSS-26.6%25-1572B6?style=flat&logo=css3&logoColor=white)
![Python](https://img.shields.io/badge/Python-15.3%25-3776AB?style=flat&logo=python&logoColor=white)
![HTML](https://img.shields.io/badge/HTML-8.7%25-E34F26?style=flat&logo=html5&logoColor=white)

---

## 📁 Project Structure

```
Ai--Traffic-Risk-Dashboard/
│
├── app.py                  # FastAPI backend — serves traffic data & risk scores
├── data/
│   └── traffic_data.json   # Live traffic data (location, vehicle count, speed, weather)
├── static/
│   ├── style.css           # Dashboard styling
│   └── script.js           # Frontend logic — data fetch, risk rendering, map updates
├── templates/
│   └── index.html          # Main dashboard HTML template
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Shrihariniselvakumar/Ai--Traffic-Risk-Dashboard.git
cd Ai--Traffic-Risk-Dashboard
```

### 2. Install dependencies
```bash
pip install fastapi uvicorn
```

### 3. Run the FastAPI server
```bash
uvicorn app:app --reload
```

### 4. Open the dashboard
```
http://127.0.0.1:8000
```

---

## 🔄 How It Works

```
traffic_data.json (live feed)
        ↓
FastAPI backend reads & processes data
        ↓
Risk scoring model classifies each location
        ↓
JavaScript frontend fetches & renders dashboard
        ↓
Live map + risk alerts displayed to police operators
```

1. **Data Layer** — `traffic_data.json` holds real-time snapshots of each road location
2. **Backend** — FastAPI reads the data, applies risk scoring, and exposes a REST API endpoint
3. **Frontend** — JavaScript polls the API, updates the dashboard UI, and highlights risk zones
4. **Risk Display** — Each location shows its risk level with colour-coded indicators

---

## 📸 Screenshots

> _Add screenshots of your dashboard here_

```
screenshots/
├── dashboard_overview.png
├── high_risk_alert.png
└── location_map.png
```

---

## 🔮 Future Improvements

- [ ] Integrate real-time CCTV / IoT sensor feeds
- [ ] Add Google Maps / Leaflet.js interactive map layer
- [ ] SMS / WhatsApp alert system for high-risk zones
- [ ] Historical risk trend analysis with charts
- [ ] Deploy on cloud (AWS / GCP) for city-wide monitoring
- [ ] Mobile-responsive version for field officers

---

## 🏆 Recognition

> Presented at the **Kalam Awards** — recognised for innovation in AI-powered smart traffic monitoring for law enforcement.

---

## 👩‍💻 Author

**Shri Harini Selvakumar**  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/shriharini-selvakumar-8811aa361)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/Shrihariniselvakumar)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
