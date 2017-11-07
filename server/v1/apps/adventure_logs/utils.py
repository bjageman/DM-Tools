from v1.apps.utils import get_model
from flask import abort
from .errors import not_found
from .models import AdventureLog, Character

from v1.apps import db
from v1.apps.utils import *

def deleteObject(object, db):
    slug = object.slug
    db.session.delete(object)
    db.session.commit()
    return slug

def create_adventure_log(author, name, length=0, xp=0, gold=0, character=None):
    log = AdventureLog(author=author, name=name, length=length, xp=xp, gold=gold, character=character)
    return log

def get_character(character_id):
    if character_id is None:
        return None
    character = get_model(Character, character_id)
    if character is None:
        print("Character", character_id, "Not found")
        return None
    return character
