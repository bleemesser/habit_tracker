from flask import Blueprint, render_template, request, redirect, session, jsonify
from .extensions import db, bcrypt, key
from .models.usermodel import User
from .models.eventmodel import Event
from functools import wraps
import datetime
from .auth import token_required, teacher_token_required

teacher = Blueprint("teacher", __name__)


@teacher.route("/dashboard", methods=["GET"])
@teacher_token_required
def dashboard(current_user):
    # pull users from database and send it to the frontend
    # does not require any input from the frontend
    if current_user.email == "master@teacher":
        users = User.query.filter(User.email != "master@teacher").all()
    else:
        users = User.query.filter_by(roles="student",teacher=current_user.name).all()
    return {
        "status": "success",
        "message": "Data found successfully",
        "data": str(users).replace("'",'"'), # need to replace single quotes with double quotes for JSON parsing on the frontend
    }

@teacher.route("/delete-student", methods=["POST"])
@teacher_token_required
def delete_student(current_user):
    # requires "email" in the request body and a content type of application/json
    data = request.get_json()
    user = User.query.filter_by(email=data["email"]).first()
    # print(user)
    db.session.execute(
        db.delete(User).where(User.email == data["email"])
    )
    db.session.commit()
    return {
        "status": "success",
        "message": "Student deleted successfully",
    }


@teacher.route("/edit-student", methods=["POST"])
@teacher_token_required
def edit_student(current_user):
    # requires "email" in the request body and a content type of application/json
    # there is probably a neater way to not specify the kwargs if the request doesn't update them but this works and i don't care enough
    data = request.get_json()
    if "name" in data:
        db.session.execute(
            db.update(User)
            .where(User.email == data["email"])
            .values(
                name=data["name"],
            )
        )
        db.session.commit()
    if "teacher" in data:
        db.session.execute(
            db.update(User)
            .where(User.email == data["email"])
            .values(
                teacher=data["teacher"],
            )
        )
        db.session.commit()
    if "blocknum" in data:
        db.session.execute(
            db.update(User)
            .where(User.email == data["email"])
            .values(
                blocknum=data["blocknum"],
            )
        )
        db.session.commit()
    return {
        "status": "success",
        "message": "Student edited successfully",
    }

@teacher.route("/teacher-names", methods=["GET"])
def teacher_names():
    # pull users from database and send it to the frontend
    # does not require any input from the frontend
    users = User.query.filter_by(roles="teacher").where(User.email != "master@teacher").all()
    return {
        "status": "success",
        "message": "Data found successfully",
        "data": str(users).replace("'",'"'), # need to replace single quotes with double quotes for JSON parsing on the frontend
    }