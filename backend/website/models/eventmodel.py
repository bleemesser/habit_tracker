from website.extensions import db
from sqlalchemy.sql import func
class Event(db.Model):
    __bind_key__ = "events"
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(150), nullable=False)
    date_submitted = db.Column(db.DateTime(timezone=True), default=func.now())
    event_date = db.Column(db.DateTime(timezone=True), nullable=False)
    owner = db.Column(db.String(150), nullable=False)
    data = db.Column(db.JSON, nullable=False)
    
    def __repr__(self):
        return f"Event('{self.type}', '{self.date}')"
