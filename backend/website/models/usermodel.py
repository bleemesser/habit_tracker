from traceback import format_exc
from website.extensions import db
from datetime import datetime
# from flask_login import UserMixin
from sqlalchemy import (
    Column,
    ForeignKey,
    Integer,
    String,
    DateTime,
    Boolean,
    func,
    JSON,
    Table,
)
from sqlalchemy.orm import relationship, declarative_base

Base = declarative_base()


class User(db.Model, Base):
    __bind_key__ = "users"
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.Text, unique=True, nullable=False)
    roles = db.Column(db.Text, nullable=False, default="student")
    last_submission = db.Column(db.DateTime, nullable=True)
    password = db.Column(db.String(150), nullable=False)
    teacher = db.Column(db.String(150))
    blocknum = db.Column(db.Integer)
    events = relationship("Event")

    def __repr__(self) -> str:
        data = vars(self)
        # print(data["last_submission"])
        for key in data.keys():
            if data[key] == None:
                data[key] = "None"
        if data["last_submission"] != "None":
            data["last_submission"] = data["last_submission"].strftime("%m-%d-%Y")
    
        # if data["last_submission"] is not  or data["last_submission"] is not "":
        #     data["last_submission"] = data["last_submission"].strftime("%m-%d-%y")
        # else: 
        #     data["last_submission"] = "None"
        desired_data = [
            "id",
            "email",
            "roles",
            "last_submission",
            "teacher",
            "blocknum",
            "name",
        ]
        out = {key: data[key] for key in desired_data}
        out["events"] = self.events
        return str(out)
