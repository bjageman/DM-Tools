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
    def level(self):
        level = 1
        checkpoint_total = self.checkpoints()
        if checkpoint_total <= 16:
            return level + int(checkpoint_total / 4)
        else:
            checkpoint_total = checkpoint_total - 16
            level = level + 4
            return level + int(checkpoint_total / 8)
    def checkpoints(self):
        checkpoint_total = 0
        for character_log in self.logs:
            checkpoint_total = checkpoint_total + character_log.checkpoint
        return checkpoint_total
    def treasurepoints(self):
        treasurepoint_total = 0
        for character_log in self.logs:
            treasurepoint_total = treasurepoint_total + character_log.treasurepoint
        return treasurepoint_total


class CharacterLog(Base, TimestampMixin):
    character_id = db.Column(db.ForeignKey('character.id'), index=True)
    character = db.relationship('Character', backref=backref("logs", cascade="all, delete"))
    log_id = db.Column(db.ForeignKey('adventurelog.id'), index=True)
    log = db.relationship('AdventureLog', backref=backref("character_logs", cascade="all, delete"))
    checkpoint = db.Column(db.Integer, default=0)
    treasurepoint = db.Column(db.Float, default=0)

class AdventureLog(Base, TimestampMixin):
    date_ran = db.Column(db.DateTime, default=datetime.utcnow)
    length = db.Column(db.Integer)
    author_id = db.Column(db.ForeignKey('user.id'), index=True)
    author = db.relationship('User',  backref='logs')
    tier = db.Column(db.Integer)
    def checkpoint_total(self):
        checkpoint = 0
        for character_log in self.character_logs:
            checkpoint = character_log.checkpoint + checkpoint
        return checkpoint
    def treasurepoint_total(self):
        treasurepoint = 0
        for character_log in self.character_logs:
            treasurepoint = character_log.treasurepoint + treasurepoint
        return treasurepoint

### Will be used to handle more than one campaign
class CampaignLog(Base, TimestampMixin):
    pass
    #logs = ...
    #characters = ...
