from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    token = db.Column(db.Text, nullable=False)
    email = db.Column(db.Text, nullable=False)

@app.route('/')
def index():
    return 'Hey :)'

@app.route('/user', methods=['POST'])
def processjson():
    data = request.get_json()
    token = data['token']
    email = data['email']
    user = User(token=token, email=email)
    db.session.add(user)
    db.session.commit()
    return jsonify({'added' : email})

def getAllTokens():
    return User.query.with_entities(User.token).all()

def getToken(email):
    return User.query.filter_by(email=email).first().token

if __name__ == '__main__':
    app.run(debug=True)
