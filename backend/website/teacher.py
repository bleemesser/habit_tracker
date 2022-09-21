from flask import Blueprint, render_template, request, redirect, session,jsonify
from .extensions import db, bcrypt,key
from .models.usermodel import User
from functools import wraps
import datetime
from .auth import token_required
form = Blueprint('form', __name__)

# bodie put your teacher routes here