from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from functools import wraps
import datetime
from sqlalchemy import exc


# import json
# import hashlib
# import requests

app = Flask(__name__)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'

db = SQLAlchemy(app)
db.init_app(app)

# Models


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    token = db.Column(db.Text, nullable=False)
    email = db.Column(db.Text, nullable=False)


class Announcement(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=False)
    body = db.Column(db.Text, nullable=True)
    timestamp = db.Column(db.Text, nullable=False)

    @property
    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'body': self.body,
            'timestamp': self.timestamp
        }

# Decorators


def needs_hacker_auth(f):
    """Checks for valid hacker token. If user is admin-authed, will succeed"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # TODO: actually do
        return f(*args, **kwargs)
    return decorated_function


def needs_admin_auth(f):
    """Checks for valid admin token"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # TODO: actually do
        return f(*args, **kwargs)
    return decorated_function

# Routes


@app.route('/')
def root():
    return 'Api Root'


@app.route('/login', methods=['POST'])
def login():
    """Login for hacker app"""
    data = request.get_json()
    if ('email' not in data) or ('password' not in data):
        return "Invalid body", 400

    # r = requests.post(url="https://my.bit.camp/api/auth/sign_in",
    # data=request.json)
    # return (r.content.data, r.status_code, {"uid": r.headers['uid'],
    # "access-token": r.headers['access-token'], "client": r.headers['client'],
    # "Content-Type": "application/json"})
    return jsonify([])


@app.route('/login/admin', methods=['POST'])
def login_admin():
    """Login for scanner app and admin dashboard"""
    data = request.get_json()
    if ('email' not in data) or ('password' not in data):
        return "Invalid body", 400

    return jsonify([])


# Announce
@app.route('/announce', methods=['GET'])
def get_announce():
    """Lists announcements"""
    accouncements = Announcement.query.all()
    res = [a.serialize() for a in accouncements]
    return jsonify(res)


@app.route('/announce', methods=['POST'])
@needs_admin_auth
def post_announce():
    """Create an announcement"""
    data = request.get_json()
    if ('title' not in data) or ('body' not in data):
        return "Invalid body", 400
    dt = datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ")
    try:
        a = Announcement(data['title'], data['body'], dt)
        db.session.add(a)
        db.session.commit()
    except exc.IntegrityError:
        db.session.rollback()
        return "Error creating announcement", 400
    db.session.refresh(a)
    # TODO: Push announcement via expo
    return jsonify(a.serialize())


@app.route('/announce', methods=['PUT', 'DELETE'])
@needs_admin_auth
def modify_announce():
    """Update or delete announcement"""
    if 'id' not in request.args:
        return "Missing id", 400
    a_id = request.args.get('id')

    if request.methid == "PUT":
        data = request.get_json()
        if ('title' not in data) or ('body' not in data):
            return "Invalid body", 400
        an = Announcement.query.filter_by(id=a_id).first()

        if an is None:
            return "not found", 404

        an.title = data['title']
        an.body = data['body']

        try:
            db.session.commit()
        except exc.IntegrityError:
            db.session.rollback()
            return "Error creating announcement", 400
        return jsonify(an.serialize())
    elif request.method == "DELETE":
        an = Announcement.query.filter_by(id=a_id).first()

        if an is None:
            return "not found", 404
        try:
            db.session.delete(an)
            db.session.commit()
        except exc.IntegrityError:
            db.session.rollback()
            return "Error deleting announcement", 400
    return None, 204


@app.route('/announce/subscribe', methods=['POST'])
@needs_hacker_auth
def announce_subscribe():
    data = request.get_json()
    if 'token' not in data:
        return "Invalid body", 400
    # TODO: How to associate user and token?
    # Idea: get email via authtoken, then assoc. expo token and email
    return None, 204

# Entry
@app.route('/entry/checkin', methods=['POST'])
@needs_admin_auth
def entry_checkin():
    data = request.get_json()
    if 'email' not in data:
        return "Invalid body", 400
    return jsonify([])


@app.route('/entry/nfc-pair', methods=['POST'])
@needs_admin_auth
def entry_nfc():
    data = request.get_json()
    if ('email' not in data) or ('nfc' not in data):
        return "Invalid body", 400
    return jsonify([])

# Events
@app.route('/events')
def get_events():
    return jsonify([])


@app.route('/events/hash')
def get_events_hash():
    return ""


@app.route('/events/follow', methods=['POST'])
@needs_hacker_auth
def follow_event():
    return jsonify([])


@app.route('/events/unfollow', methods=['POST'])
@needs_hacker_auth
def unfollow_event():
    return jsonify([])


@app.route('/events/following-count')
def get_events_count():
    return jsonify([])


@app.route('/events/following')
@needs_hacker_auth
def get_events_following():
    return jsonify([])


@app.route('/events/checkin', methods=['POST'])
@needs_hacker_auth
def event_checkin():
    return jsonify([])


@app.route('/questions')
def get_questions():
    return jsonify([])


@app.route('/questions/submit', methods=['POST'])
@needs_hacker_auth
def post_question():
    return jsonify([])


@app.route('/questions/delete', methods=['DELETE'])
@needs_hacker_auth
def delete_question():
    return jsonify([])


@app.route('/questions/claim', methods=['POST'])
def claim_question():
    return jsonify([])

# Teams
@app.route('/teams')
def get_teams():
    return jsonify([])

# Get token and email
# @app.route('/announcements/subscribe', methods=['POST'])
# def postToken():
#    data = request.get_json()
#    token = data['token']
#    email = data['email']
#    user = User(token=token, email=email)
#    db.session.add(user)
#    db.session.commit()
#    return jsonify({'added' : email})
#
# def getAllTokens():
#    tokens = []
#    for u in User.query.with_entities(User.token).all():
#        tokens.append(list(u)[0])
#    return tokens
#
# def getToken(email):
#    return User.query.filter_by(email=email).first().token

# Testing - simulate actions that should be handled by Dashboard


def test_login(email, password):
    return


if __name__ == '__main__':
    db.create_all()
    app.run()
