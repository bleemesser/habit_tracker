import json
from flask import Blueprint, request, jsonify
from .extensions import db, bcrypt, key
from .models.usermodel import User
import jwt
from functools import wraps
import datetime
from datetime import timezone, timedelta

auth = Blueprint("auth", __name__)


def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        if "token" in request.headers:
            token = request.headers["token"]
        if not token:
            return jsonify({"status": "autherror", "message": "Token is required"})
        try:
            data = jwt.decode(token, key, algorithms=["HS256"])
            current_user = User.query.filter_by(email=data["email"]).first()
        except:
            return jsonify({"status": "autherror", "message": "Token is invalid"})
        if datetime.datetime.utcfromtimestamp(data["exp"]) < datetime.datetime.utcnow():
            return jsonify({"status": "autherror", "message": "Token expired"})
        return f(current_user, *args, **kwargs)

    return decorator


def teacher_token_required(f):
    # basically the same as token_required but requires teacher role
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        if "token" in request.headers:
            token = request.headers["token"]
        if not token:
            return jsonify({"status": "autherror", "message": "Token is required"})
        try:
            data = jwt.decode(token, key, algorithms=["HS256"])
            # print(data)
            current_user = User.query.filter_by(email=data["email"]).first()
            # db.session.commit()
        except:
            return jsonify({"status": "autherror", "message": "Token is invalid"})
        # print(datetime.datetime.utcfromtimestamp(data['exp']),datetime.datetime.now(timezone.utc))
        if datetime.datetime.utcfromtimestamp(data["exp"]) < datetime.datetime.utcnow():
            return jsonify({"status": "autherror", "message": "Token expired"})
        if current_user.roles != "teacher":
            return jsonify({"status": "autherror", "message": "User is not a teacher"})
        return f(current_user, *args, **kwargs)

    return decorator


@auth.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    try:
        if (
            type(data["email"]) == type("")
            and type(data["password"]) == type("")
            and type(data["teacher"]) == type("")
            and type(data["blocknum"]) == type("")
            and type(data["name"]) == type("")
        ):
            if (
                len(data["email"]) > 0
                and len(data["password"]) > 0
                and len(data["teacher"]) > 0
                and int(data["blocknum"]) > 0
                and len(data["name"]) > 0
            ):
                if User.query.filter_by(email=data["email"]).first() == None:
                    hashed_password = bcrypt.generate_password_hash(
                        data["password"]
                    ).decode("utf-8")
                    new_user = User(
                        email=data["email"],
                        password=hashed_password,
                        teacher=data["teacher"],
                        blocknum=data["blocknum"],
                        name=data["name"],
                    )
                    db.session.add(new_user)
                    db.session.commit()
                    return {"status": "success", "message": "User created successfully"}
                else:
                    return {"status": "error", "message": "Email already registered"}
            else:
                return {
                    "status": "error",
                    "message": "An input is too short or not present",
                }
        else:
            return {"status": "error", "message": "Data is of invalid type"}
    except KeyError:
        return {"status": "error", "message": "Data is missing"}

@auth.route("/create_teacher", methods=["POST"])
@teacher_token_required
def create_teacher(current_user):
    data = request.get_json()
    try:
        if (
            type(data["email"]) == type("")
            and type(data["password"]) == type("")
            and type(data["name"]) == type("")
        ):
            if len(data["email"]) > 0 and len(data["password"]) > 0:
                if User.query.filter_by(email=data["email"]).first() == None:
                    hashed_password = bcrypt.generate_password_hash(
                        data["password"]
                    ).decode("utf-8")
                    new_user = User(
                        email=data["email"],
                        password=hashed_password,
                        roles="teacher",
                        name=data["name"],
                        blocknum=0
                    )
                    db.session.add(new_user)
                    db.session.commit()
                    return {
                        "status": "success",
                        "message": "Teacher user created successfully",
                    }
                else:
                    return {"status": "error", "message": "Email already exists"}
            else:
                return {"status": "error", "message": "Email or password is too short"}
        else:
            return {"status": "error", "message": "Email or password is not a string"}
    except KeyError:
        return {"status": "error", "message": "Data is missing"}
@auth.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    try:
        if type(data["email"]) == type("") and type(data["password"]) == type(""):
            if len(data["email"]) > 0 and len(data["password"]) > 0:
                user = User.query.filter_by(email=data["email"]).first()
                if user:
                    if bcrypt.check_password_hash(user.password, data["password"]):
                        token = jwt.encode(
                            {
                                "email": user.email,
                                "roles": user.roles,
                                "exp": datetime.datetime.now(timezone.utc)
                                + timedelta(minutes=60),
                            },
                            key,
                            algorithm="HS256",
                        )
                        return {
                            "status": "success",
                            "message": "User logged in successfully",
                            "roles": user.roles,
                            "token": token,
                        }
                    else:
                        return {"status": "error", "message": "Incorrect password"}
                else:
                    return {"status": "error", "message": "User does not exist"}
            else:
                return {"status": "error", "message": "Email or password is too short"}
        else:
            return {"status": "error", "message": "Email or password is not a string"}
    except KeyError:
        return {"status": "error", "message": "Data is missing"}

@auth.route("/token", methods=["POST"])
def check_token():
    if "token" in request.headers:
        token = request.headers["token"]
    if not token:
        return jsonify({"status": "fail", "message": "Token is required"})
    try:
        data = jwt.decode(token, key, algorithms=["HS256"])
    except:
        return jsonify({"status": "fail", "message": "Token is invalid"})
    if datetime.datetime.utcfromtimestamp(data["exp"]) < datetime.datetime.utcnow():
        return jsonify({"status": "fail", "message": "Token expired"})
    return jsonify({"status": "success", "message": "token is valid"})
