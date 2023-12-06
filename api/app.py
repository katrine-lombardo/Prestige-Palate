from flask import Flask

# Initialize Flask.
app = Flask(__name__)


@app.get("/")
def root():
    return {"message": "You hit the root path! Prestige Palate"}


# Run the Flask app (127.0.0.1:5000 by default).
app.run()
