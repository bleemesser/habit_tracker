from flask import Blueprint, render_template, request, redirect, session,jsonify
from .extensions import db, bcrypt,key
from .models.usermodel import User
from functools import wraps
import datetime
from .auth import token_required
form = Blueprint('form', __name__)

@form.route("/procrastination",methods=["POST"])
@token_required
def register_procrastination(current_user):
    req = request.get_json()
    print(req, current_user)
    # once the questions are more concrete, we can add the data to the database here
    return {"status":"success","message":"Procrastination registered successfully"}

@form.route("/sleep",methods=["POST"])
@token_required
def register_sleep(current_user):
    req = request.get_json()
    print(req, current_user)
    # once the questions are more concrete, we can add the data to the database here
    return {"status":"success","message":"Sleep registered successfully"}
