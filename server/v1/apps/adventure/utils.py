from v1.apps.utils import get_model
from flask import abort
from .errors import not_found
from .models import AdventureLog, CharacterLog, Character

from v1.apps import db
from v1.apps.utils import *

def deleteObject(object, db):
    slug = object.slug
    db.session.delete(object)
    db.session.commit()
    return slug

def create_log(author, name, length=0, tier=1, characters=[]):
    log = AdventureLog(author=author, name=name, length=length, tier=tier)
    return log

def create_character_log(log, character, name="", checkpoint=0, treasurepoint=0):
    character_log = CharacterLog(name=name, log=log, character=character, checkpoint=checkpoint, treasurepoint=treasurepoint)
    return character_log

def create_character(name, race=None, charClass=None, background=None):
    character_log = Character(name=name, race=race, charClass=charClass, background=background)
    return character_log

def get_character(character_id):
    if character_id is None:
        return None
    character = get_model(Character, character_id)
    if character is None:
        print("Character", character_id, "Not found")
        return None
    return character
