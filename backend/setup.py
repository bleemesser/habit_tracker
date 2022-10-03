def setup_db():
    from website.extensions import db
    from website import newapp
    from website.models.usermodel import User
    # db.create_all(bind=['data'],app=newapp())
    from website.models.eventmodel import Event
    db.create_all(bind=['users'],app=newapp())
    db.create_all(bind=['events'],app=newapp())