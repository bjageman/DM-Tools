from . import adventure_logs
from flask import make_response, jsonify, abort

def handle_custom_message(error, default_response = "Unspecified Error"):
    if "message" in error.description:
        return error.description['message']
    else:
        return default_response

def broadcast_error(message, error, status_code):
    return make_response(jsonify({
        'description': message,
        'error': error,
        'status_code': status_code
        }), status_code)

@adventure_logs.errorhandler(404)
def not_found(error):
    status_code = 404
    generic_error = "Not Found"
    message = handle_custom_message(error, generic_error)
    return broadcast_error(message, generic_error, status_code)

@adventure_logs.errorhandler(401)
def unauthorized(error):
    status_code = 401
    generic_error = "Unauthorized Access"
    message = handle_custom_message(error, generic_error)
    return broadcast_error(message, generic_error, status_code)

@adventure_logs.errorhandler(400)
def bad_request(error):
    status_code = 400
    generic_error = "Bad Request"
    message = handle_custom_message(error, generic_error)
    return broadcast_error(message, generic_error, status_code)
