from v1.apps import db
from v1.apps.models import *

##
#  Static Model Data
##

class Character(Base, TimestampMixin):
    race = db.Column(db.String(32))
    class = db.Column(db.String(32))
    background = db.Column(db.String(32))

class DMLog(Base, TimestampMixin):
    date_ran = db.Column(db.DateTime, default=datetime.utcnow)
    length = db.Column(db.Integer)
    xp = db.Column(db.Integer)
    gold = db.Column(db.Integer)
    character_id = db.Column(db.ForeignKey('character.id'), index=True)
    character = db.relationship('Character', backref='dm_logs')
