from v1.apps import db
from v1.apps.models import *
from v1.apps.users.models import User
from sqlalchemy.orm import backref
##
#  Static Model Data
##

class Character(Base, TimestampMixin):
    race = db.Column(db.String(32))
    charClass = db.Column(db.String(32))
    background = db.Column(db.String(32))

class CharacterLog(Base, TimestampMixin):
    character_id = db.Column(db.ForeignKey('character.id'), index=True)
    character = db.relationship('Character', backref=backref("logs", cascade="all, delete"))
    log_id = db.Column(db.ForeignKey('adventurelog.id'), index=True)
    log = db.relationship('AdventureLog', backref=backref("characters", cascade="all, delete"))
    xp = db.Column(db.Integer, default=0)
    gold = db.Column(db.Integer, default=0)

class AdventureLog(Base, TimestampMixin):
    date_ran = db.Column(db.DateTime, default=datetime.utcnow)
    length = db.Column(db.Integer)
    author_id = db.Column(db.ForeignKey('user.id'), index=True)
    author = db.relationship('User',  backref='logs')
    def xp_total(self):
        xp = 0
        for character in self.characters:
            xp = character.xp + xp
        return xp
    def gold_total(self):
        gold = 0
        for character in self.characters:
            gold = character.gold + gold
        return gold
