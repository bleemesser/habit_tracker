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
    users = User.query.filter_by(roles="student").all()
    # print(users)
    return {
        "status": "success",
        "message": "Data found successfully",
        "data": f"{users}",
    }


@teacher.route("/delete-student", methods=["POST"])
@teacher_token_required
def delete_student(current_user):
    # requires "email" in the request body and a content type of application/json
    data = request.get_json()
    user = User.query.filter_by(email=data["email"]).first()
    db.session.delete(user)
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
    if "block" in data:
        db.session.execute(
            db.update(User)
            .where(User.email == data["email"])
            .values(
                block=data["block"],
            )
        )
        db.session.commit()
    return {
        "status": "success",
        "message": "Student edited successfully",
    }
