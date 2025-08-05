from flask import Flask, request, jsonify, render_template
from ultralytics import YOLO
from PIL import Image
from datetime import datetime
import sqlite3
import io
import os

app = Flask(__name__)

# === Define database path ===
DB_PATH = os.path.join(os.path.dirname(__file__), "database.db")

# Load YOLO model
model = YOLO("best(1).pt")
print("Model classes:", model.names)

# === Initialize Database ===
def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS history (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        filename TEXT,
                        toolbox INTEGER,
                        oxygen INTEGER,
                        fire INTEGER,
                        date TEXT
                    )''')
    conn.commit()
    conn.close()

init_db()

# === PAGE ROUTES ===

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/chatbot')
def chatbot():
    return render_template('chatbot.html')

# Combined Predict route (GET page + POST API)
@app.route('/predict', methods=['GET', 'POST'])
def predict():
    if request.method == 'GET':
        return render_template('predict.html')

    # POST logic for prediction
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    filename = file.filename

    # Load and predict
    image = Image.open(io.BytesIO(file.read()))
    results = model(image)

    counts = {"toolbox": 0, "oxygen": 0, "fire": 0}
    for box in results[0].boxes:
        cls = int(box.cls[0])
        name = results[0].names[cls]
        if name == "Toolbox":
            counts["fire"] += 1
        elif name == "Oxygen Tank":
            counts["toolbox"] += 1
        elif name == "Fire Extinguisher":
            counts["oxygen"] += 1

    # Save prediction to DB
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO history (filename, toolbox, oxygen, fire, date) VALUES (?, ?, ?, ?, ?)",
        (filename, counts["toolbox"], counts["oxygen"], counts["fire"],
         datetime.now().strftime("%d %b %Y"))
    )
    conn.commit()
    conn.close()

    return jsonify(counts)

@app.route('/history')
def history():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Fetch predictions (latest first)
    cursor.execute("SELECT * FROM history ORDER BY id DESC")
    rows = cursor.fetchall()

    # Fetch totals
    cursor.execute("SELECT SUM(toolbox), SUM(oxygen), SUM(fire) FROM history")
    totals = cursor.fetchone() or (0, 0, 0)
    conn.close()

    return render_template('history.html', rows=rows, totals=totals)

@app.route('/team')
def team():
    return render_template('team.html')

@app.route('/insights')
def insights():
    return render_template('insights.html')

# API for Insights Charts (real-time data)
@app.route('/insights-data')
def insights_data():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    # Total detections
    c.execute("SELECT SUM(toolbox), SUM(oxygen), SUM(fire) FROM history")
    totals = c.fetchone() or (0, 0, 0)
    toolbox_total, oxygen_total, fire_total = [t or 0 for t in totals]

    # Most detected item
    counts = {
        "Toolbox": toolbox_total,
        "Oxygen": oxygen_total,
        "Fire": fire_total
    }
    most_detected = max(counts, key=counts.get) if any(counts.values()) else "None"

    # Detections over time (last 7 days)
    c.execute("""
        SELECT date, SUM(toolbox+oxygen+fire) as total
        FROM history
        GROUP BY date
        ORDER BY date DESC LIMIT 7
    """)
    over_time = [{"date": row[0], "count": row[1]} for row in c.fetchall()][::-1]

    conn.close()

    return jsonify({
        "totals": counts,
        "most_detected": most_detected,
        "over_time": over_time
    })

@app.route('/contact')
def contact():
    return render_template('contact.html')

if __name__ == "__main__":
    # Ensure templates folder exists
    if not os.path.exists("templates"):
        os.makedirs("templates")
    app.run(debug=True)
