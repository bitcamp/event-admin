from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import json
import hashlib
import requests

app = Flask(__name__)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'

db = SQLAlchemy(app)

#### Models

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    token = db.Column(db.Text, nullable=False)
    email = db.Column(db.Text, nullable=False)

class Announcement(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=False)
    text = db.Column(db.Text, nullable=True)
    time = db.Column(db.Integer, nullable=False)

#### Routes

@app.route('/')
def root():
    return 'Api Root'

## Login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if ('email' not in data) or ('password' not in data):
        return "Invalid body", 400

    #r = requests.post(url="https://my.bit.camp/api/auth/sign_in", data=request.json)
    #return (r.content.data, r.status_code, {"uid": r.headers['uid'], "access-token": r.headers['access-token'], "client": r.headers['client'], "Content-Type": "application/json"})
    return jsonify([])

@app.route('/login/admin', methods=['POST'])
def login_admin():
    data = request.get_json()
    if ('email' not in data) or ('password' not in data):
        return "Invalid body", 400

    return jsonify([])


## Announce
@app.route('/announce', methods=['GET', 'POST', 'PUT', 'DELETE'])
def announce():
    if request.method == "GET":
        return jsonify([])
    elif request.methid == "POST":
        data = request.get_json()
        if ('title' not in data) or ('body' not in data):
            return "Invalid body", 400
    elif request.method == "PUT":
        data = request.get_json()
        if ('email' not in data) or ('password' not in data):
            return "Invalid body", 400
        if 'id' not in request.args:
            return "Invalid params", 400
    elif request.method == "DELETE":
        if 'id' not in request.args:
            return "Invalid params", 400
    return jsonify([])

@app.route('/announce/subscribe')
def announce_subscribe():
    data = request.get_json()
    if 'token' not in data:
        return "Invalid body", 400
    return jsonify([])

## Entry
@app.route('/entry/checkin', methods=['POST'])
def entry_checkin():
    data = request.get_json()
    if 'email' not in data:
        return "Invalid body", 400
    return jsonify([])

@app.route('/entry/nfc-pair', methods=['POST'])
def entry_nfc():
    data = request.get_json()
    if ('email' not in data) or ('nfc' not in data):
        return "Invalid body", 400
    return jsonify([])

## Events
@app.route('/events')
def get_events():
    return jsonify([])

@app.route('/events/hash')
def get_events():
    return ""

@app.route('/events/follow', methods=['POST'])
def follow_event():
    return jsonify([])

@app.route('/events/unfollow', methods=['POST'])
def follow_event():
    return jsonify([])

@app.route('/events/following-count')
def get_events_count():
    return jsonify([])

@app.route('/events/following')
def get_events_following():
    return jsonify([])

@app.route('/events/checkin', methods=['POST'])
def event_checkin():
    return jsonify([])

## Mentorship
@app.route('/mentorship')
def get_questions():
    return jsonify([])

@app.route('/mentorship/submit', methods=['POST'])
def post_question():
    return jsonify([])

@app.route('/mentorship/claim', methods=['POST'])
def claim_question():
    return jsonify([])

## Get token and email
#@app.route('/announcements/subscribe', methods=['POST'])
#def postToken():
#    data = request.get_json()
#    token = data['token']
#    email = data['email']
#    user = User(token=token, email=email)
#    db.session.add(user)
#    db.session.commit()
#    return jsonify({'added' : email})
#
#def getAllTokens():
#    tokens = []
#    for u in User.query.with_entities(User.token).all():
#        tokens.append(list(u)[0])
#    return tokens
#
#def getToken(email):
#    return User.query.filter_by(email=email).first().token

if __name__ == '__main__':
    db.create_all()
    app.run()