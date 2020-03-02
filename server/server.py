from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import json
import hashlib

app = Flask(__name__)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    token = db.Column(db.Text, nullable=False)
    email = db.Column(db.Text, nullable=False)

@app.route('/')
def hello_world():
    return 'Hello, World!'

def get_events():
    return []

# Returns JSON with events.
# Mirrors https://my.bit.camp/events.json
@app.route('/events')
def get_events():
    return jsonify([])

# Returns hashed string of data from /events
@app.route('/events/hash')
def get_events_hash():
    return jsonify([])

# Takes an event ID and an access token, favorites an event
@app.route('/events/favorite', methods=['POST'])
def post_events_favorite():
    return jsonify([])

# Takes an event ID and an access token, unfavorites an event
@app.route('/events/unfavorite', methods=['POST'])
def post_events_favorite():
    return jsonify([])

# Gets a count of all favorites
@app.route('/events/favorite_count')
def post_events_favorite():
    return jsonify([])

# Given an access token,
@app.route('/events/my_favorites')
def post_events_favorite():
    return jsonify([])

# Get token and email
@app.route('/notifications/subscribe', methods=['POST'])
def postToken():
    data = request.get_json()
    token = data['token']
    email = data['email']
    user = User(token=token, email=email)
    db.session.add(user)
    db.session.commit()
    return jsonify({'added' : email})

def getAllTokens():
    tokens = []
    for u in User.query.with_entities(User.token).all():
        tokens.append(list(u)[0])
    return tokens

def getToken(email):
    return User.query.filter_by(email=email).first().token
