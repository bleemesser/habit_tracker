from website.extensions import db
from flask_login import UserMixin

class User(db.Model, UserMixin):
    __bind_key__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.Text, unique=True, nullable=False)
    roles = db.Column(db.Text, nullable=False, default="student")
    last_submission = db.Column(db.DateTime, nullable=True)
    password = db.Column(db.String(150), nullable=False)
    teacher = db.Column(db.String(150))
    blocknum = db.Column(db.Integer)
    def __repr__(self) -> str:
        data = vars(self)
        desired_data = ['id', 'email', 'roles', 'last_submission', 'teacher', 'blocknum', 'name']
        return str({key: data[key] for key in desired_data})
