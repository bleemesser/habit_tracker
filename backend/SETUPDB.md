In python3:
- from website.extensions import db
- from website import newapp
- from website.models.usermodel import User
- db.create_all(bind=['users'],app=newapp())
- from website.models.eventmodel import Event
- db.create_all(bind=['events'],app=newapp())