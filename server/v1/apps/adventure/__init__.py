from flask import Blueprint

adventure = Blueprint('adventure', __name__)

from . import views
