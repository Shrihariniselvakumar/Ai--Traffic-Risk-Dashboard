from flask import Flask, render_template, jsonify
import random

app = Flask(__name__)

# Simulated traffic data for Madurai
def generate_data():
    locations = [
        {"name": "Madurai City", "lat": 9.9252, "lng": 78.1198},
        {"name": "Thiruparankundram", "lat": 9.9060, "lng": 78.0613},
        {"name": "Mattuthavani", "lat": 9.9447, "lng": 78.1228},
        {"name": "Kalavasal", "lat": 9.9383, "lng": 78.1064},
        {"name": "Melur", "lat": 10.0910, "lng": 78.2755},
        {"name": "Dindigul-Madurai Bypass", "lat": 9.9750, "lng": 78.1789},
        {"name": "Simmakkal", "lat": 9.9290, "lng": 78.1180},
        {"name": "Anna Nagar", "lat": 9.9490, "lng": 78.1200},
        {"name": "Vilangudi", "lat": 9.9405, "lng": 78.1089},
        {"name": "K.K. Nagar", "lat": 9.9395, "lng": 78.1105}
    ]

    # Add simulated traffic details
    for loc in locations:
        loc["vehicle_count"] = random.randint(10, 120)
        loc["speed"] = random.randint(20, 100)
        loc["traffic"] = random.choice(["Low", "Medium", "High"])
        loc["weather"] = random.choice(["Clear", "Rainy", "Foggy", "Hot"])
        loc["risk_score"] = random.randint(1, 10)
        loc["history"] = [{"vehicle_count": random.randint(10, 120), "risk_score": random.randint(1, 10)} for _ in range(10)]
    return locations

@app.route("/")
def dashboard():
    return render_template("dashboard.html")

@app.route("/api/traffic")
def traffic_api():
    return jsonify({"locations": generate_data()})

if __name__ == "__main__":
    app.run(debug=True)
