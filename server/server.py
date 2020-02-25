from flask import Flask, jsonify
import json
import hashlib

app = Flask(__name__)

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
def post_events_favorite()
    return jsonify([])

# Takes an event ID and an access token, unfavorites an event
@app.route('/events/unfavorite', methods=['POST'])
def post_events_favorite()
    return jsonify([])

# Gets a count of all favorites
@app.route('/events/favorite_count')
def post_events_favorite()
    return jsonify([])

# Given an access token,
@app.route('/events/my_favorites')
def post_events_favorite()
    return jsonify([])