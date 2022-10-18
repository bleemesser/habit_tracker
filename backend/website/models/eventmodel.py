from datetime import datetime
from website.extensions import db
from sqlalchemy.sql import func
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


class Event(db.Model):
    __bind_key__ = "events"
    __tablename__ = "events"
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(150), nullable=False)
    date_submitted = db.Column(db.DateTime(timezone=True), default=func.now())
    event_date = db.Column(db.DateTime(timezone=True), nullable=False)
    owner = db.Column(db.Integer, db.ForeignKey("users.id"))
    data = db.Column(db.JSON, nullable=False)

    def __repr__(self):
        data = vars(self)
        if isinstance(data["date_submitted"], datetime):
            data["date_submitted"] = data["date_submitted"].strftime("%m-%d-%Y")
        if isinstance(data["event_date"], datetime):
            data["event_date"] = data["event_date"].strftime("%m-%d-%Y")
        # remove apostrophes from any values
        for key, value in data.items():
            if isinstance(value, dict):
                for k, v in value.items():
                    if isinstance(v, str):
                        value[k] = v.replace("'", "&#39;").replace('"', "&#34;")

        desired_data = ["id", "type", "date_submitted", "event_date", "owner", "data"]
        return str({key: data[key] for key in desired_data})
