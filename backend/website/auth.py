from flask import Blueprint, render_template, request, redirect, session,jsonify
from .extensions import db, bcrypt,key
from .models.usermodel import User
import jwt
from functools import wraps
import datetime
auth = Blueprint('auth', __name__)

def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        if 'token' in request.headers:
            token = request.headers['token']
        if not token:
            return jsonify({'message': 'Token is required'}), 401
        try:
            data = jwt.decode(token, key, algorithms=["HS256"])
            if data["exp"] < datetime.datetime.utcnow():
                return jsonify({"message":"Token expired"}), 401
            current_user = User.query.filter_by(email=data["email"]).first()
        except:
            return jsonify({'message': 'Token is invalid'}), 401
        return f(current_user, *args, **kwargs)
    return decorator
    
@auth.route('/signup',methods=["POST"])
def signup():
    data = request.get_json()
    if type(data["email"]) == type("") and type(data["password"]) == type(""):
        if len(data["email"]) > 0 and len(data["password"]) > 0:
            if User.query.filter_by(email=data["email"]).first() == None:
                hashed_password = bcrypt.generate_password_hash(data["password"]).decode('utf-8')
                new_user = User(email=data["email"], password=hashed_password)
                db.session.add(new_user)
                db.session.commit()
                return {"status":"success","message":"User created successfully"}
            else:
                return {"status":"error","message":"Username already exists"}
        else:
            return {"status":"error","message":"Username or password is too short"}
    else:
        return {"status":"error","message":"Username or password is not a string"}

@auth.route("/login",methods=["POST"])
def login():
    data = request.get_json()#
    if type(data["email"]) == type("") and type(data["password"]) == type(""):
        if len(data["email"]) > 0 and len(data["password"]) > 0:
            user = User.query.filter_by(email=data["email"]).first()
            if user:
                if bcrypt.check_password_hash(user.password, data["password"]):
                    token = jwt.encode({"email":user.email,"roles":user.roles, "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=60)}, key, algorithm="HS256")
                    return {"status":"success","message":"User logged in successfully","token":token}
                else:
                    return {"status":"error","message":"Incorrect password"}
            else:
                return {"status":"error","message":"Username does not exist"}
        else:
            return {"status":"error","message":"Username or password is too short"}
    else:
        return {"status":"error","message":"Username or password is not a string"}


