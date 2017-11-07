from flask import Blueprint

adventure_logs = Blueprint('adventure_logs', __name__)

from . import views
