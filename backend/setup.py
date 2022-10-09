def setup_db(app):
    from website.extensions import db
    from website import newapp

    db.create_all(bind=["users"], app=app)
    db.create_all(bind=["events"], app=app)

