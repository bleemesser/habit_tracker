from flask import Blueprint, render_template, request, redirect, session,jsonify
from .extensions import db, bcrypt,key
from .models.usermodel import User
from .models.eventmodel import Event
from functools import wraps
import datetime
from .auth import token_required,teacher_token_required
teacher = Blueprint('teacher', __name__)

# bodie put your teacher routes here
# example: 
@teacher.route("/dashboard",methods=["GET"])
@teacher_token_required
def dashboard(current_user):
    # pull users from database and send it to the frontend
    users = User.query.filter_by(roles="student").all()
    return {"status":"success","message":"Data found successfully", "data": f"{users}"}