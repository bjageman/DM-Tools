from v1.apps import db
from v1.apps.models import *
from v1.apps.users.models import User

##
#  Static Model Data
##

class Character(Base, TimestampMixin):
    race = db.Column(db.String(32))
    charClass = db.Column(db.String(32))
    background = db.Column(db.String(32))

class AdventureLog(Base, TimestampMixin):
    date_ran = db.Column(db.DateTime, default=datetime.utcnow)
    length = db.Column(db.Integer)
    xp = db.Column(db.Integer)
    gold = db.Column(db.Integer)
    character_id = db.Column(db.ForeignKey('character.id'), index=True)
    character = db.relationship('Character', backref='adventure_logs')
    author_id = db.Column(db.ForeignKey('user.id'), index=True)
    author = db.relationship('User', backref='adventure_logs')
