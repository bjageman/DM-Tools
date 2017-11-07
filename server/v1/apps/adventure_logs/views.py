from flask import request, jsonify, abort
from flask_jwt import jwt_required, current_identity
#App Specific
from . import adventure_logs
from .models import Character, AdventureLog
from .parsers import *
from .errors import *
from .utils import *

#Utilities/Tools
from v1.apps import db
from v1.apps.errors import *
from v1.apps.utils import *
from v1.apps.users.models import User

@adventure_logs.route('', methods=['GET'])
# @jwt_required()
def get_logs(author=None):
    author = request.args.get("author")
    if author is not None:
        author = User.query.filter_by(name=author).first()
        logs = AdventureLog.query.filter_by(author=author).all()
    else:
        logs = AdventureLog.query.all()
    return jsonify(parse_logs(logs))

@adventure_logs.route('', methods=['POST', 'PUT'])
@jwt_required()
def create_log():
    data = request.get_json()
    author = current_identity
    name = get_required_data(data, "name")
    length = get_optional_data(data, "length")
    xp = get_optional_data(data, "xp")
    gold = get_optional_data(data, "gold")
    character_id = get_optional_data(data, "character_id")
    character = get_character(character_id)
    log = create_adventure_log(author, name, length, xp, gold, character)
    db.session.add(log)
    db.session.commit()
    return jsonify({"log": parse_log(log) })

# ##
# # Editor Tools
# ##
#
# @editor.route('/tools', methods=['GET'])
# @jwt_required()
# def get_tools():
#     commands = Command.query.all()
#     return jsonify({"commands": parse_commands(commands)})
#
# ##
# #  Stories
# ##
#
# @editor.route('', methods=['GET'])
# @jwt_required()
# def get_owner_stories():
#     stories = Story.query.filter_by(owner=current_identity)
#     return jsonify({"listing": parse_stories(stories)})
#
# @editor.route('/<story_id>', methods=['GET'])
# @jwt_required()
# def get_story_request(story_id):
#     story = get_story(story_id)
#     if story.owner == current_identity:
#         return jsonify({"story": parse_story(story) })
#     else:
#         abort(401)
#
# @editor.route('', methods=['POST', 'PUT'])
# @jwt_required()
# def save_story_request():
#     data = request.get_json()
#     name = get_required_data(data, "name")
#     description = get_optional_data(data, "description")
#     pages = get_optional_data(data, "pages")
#     story = create_story(name, current_identity, description, pages)
#     db.session.add(story)
#     db.session.commit()
#     return jsonify({"story": parse_story(story) })
#
# @editor.route('/<story_id>', methods=['POST', 'PUT'])
# @jwt_required()
# def update_story_request(story_id):
#     story = get_story(story_id)
#     data = request.get_json()
#     name = get_optional_data(data, "name")
#     description = get_optional_data(data, "description")
#     pages = get_optional_data(data, "pages")
#     story = update_story(story, name, description, pages)
#     db.session.add(story)
#     db.session.commit()
#     return jsonify({"story": parse_story(story)})
#
# @editor.route('/<story_id>', methods=['DELETE'])
# @jwt_required()
# def delete_story(story_id):
#     story = get_story(story_id)
#     slug = story.slug
#     db.session.delete(story)
#     return jsonify({
#         "deleted": True,
#         "slug": slug,
#         "object": "story",
#         })
#
# ##
# #  Items
# ##
#
# url_base_items = "/<story_id>/items"
#
# @editor.route(url_base_items, methods=['GET'])
# def get_items(story_id):
#     story = get_story(story_id)
#     return jsonify({"listing": parse_items(story.items)})
#
# @editor.route(url_base_items + '/<item_id>', methods=['GET'])
# def get_item_request(story_id, item_id):
#     item = get_item(item_id, story_id)
#     story = get_story(story_id)
#     return jsonify({"story": parse_story(story) })
#
# @editor.route(url_base_items, methods=['POST', 'PUT'])
# @jwt_required()
# def create_item(story_id):
#     story = get_story(story_id)
#     data = request.get_json()
#     name = get_required_data(data, "name")
#     item = Item(name=name)
#     story.items.append(item)
#     db.session.add(story)
#     db.session.commit()
#     story = get_story(story_id)
#     return jsonify({"story": parse_story(story) })
#
# @editor.route(url_base_items + '/<item_id>', methods=['POST', 'PUT'])
# @jwt_required()
# def update_item(story_id, item_id):
#     item = get_item(item_id, story_id)
#     data = request.get_json()
#     name = get_optional_data(data, "name")
#     if name is not None:
#         item.set_name(name)
#     db.session.add(item)
#     db.session.commit()
#     story = get_story(story_id)
#     return jsonify({"story": parse_story(story) })
#
# @editor.route(url_base_items + '/<item_id>', methods=['DELETE'])
# @jwt_required()
# def delete_item(story_id, item_id):
#     item = get_item(item_id, story_id)
#     slug = item.slug
#     db.session.delete(item)
#     story = get_story(story_id)
#     return jsonify({
#         "story": parse_story(story),
#         "deleted": True,
#         "slug": slug,
#         "object": "item",
#         })
#
# ##
# #  Pages
# ##
#
# url_base_pages = "/<story_id>/pages"
#
# @editor.route(url_base_pages, methods=['GET'])
# def get_pages(story_id):
#     story = get_story(story_id)
#     return jsonify({"listing": parse_pages(story.pages)})
#
# @editor.route(url_base_pages + '/<page_id>', methods=['GET'])
# def get_page_request(story_id, page_id):
#     page = get_page(page_id, story_id)
#     story = get_story(story_id)
#     return jsonify({"story": parse_story(story) })
#
# @editor.route(url_base_pages, methods=['POST', 'PUT'])
# @jwt_required()
# def create_page_request(story_id):
#     story = get_story(story_id)
#     data = request.get_json()
#     name = get_required_data(data, "name")
#     description = get_optional_data(data, "description")
#     choices = get_optional_data(data, "choices")
#     create_page(story, name, description, choices)
#     return jsonify({"story": parse_story(story) })
#
# @editor.route(url_base_pages + '/<page_id>', methods=['POST', 'PUT'])
# @jwt_required()
# def update_page_request(story_id, page_id):
#     page = get_page(page_id, story_id)
#     data = request.get_json()
#     name = get_optional_data(data, "name")
#     description = get_optional_data(data, "description")
#     update_page(page, name, description)
#     story = get_story(story_id)
#     return jsonify({"story": parse_story(story) })
#
# @editor.route(url_base_pages + '/<page_id>', methods=['DELETE'])
# @jwt_required()
# def delete_page_request(story_id, page_id):
#     page = get_page(page_id, story_id)
#     slug = deleteObject(page, db)
#     story = get_story(story_id)
#     return jsonify({
#         "story": parse_story(story),
#         "deleted": True,
#         "slug": slug,
#         "object": "page",
#         })
#
# ##
# #  Choices
# ##
#
# url_base_choices = url_base_pages + "/<page_id>/choices"
#
# @editor.route(url_base_choices, methods=['GET'])
# def get_choices(story_id, page_id):
#     page = get_page(page_id, story_id)
#     story = get_story(story_id)
#     return jsonify({"story": parse_story(story) })
#
# @editor.route(url_base_choices + '/<choice_id>', methods=['GET'])
# def get_choice_request(story_id, page_id, choice_id):
#     choice = get_choice(choice_id, page_id, story_id)
#     story = get_story(story_id)
#     return jsonify({"story": parse_story(story) })
#
# @editor.route(url_base_choices, methods=['POST', 'PUT'])
# def create_choice_request(story_id, page_id):
#     page = get_page(page_id, story_id)
#     data = request.get_json()
#     name = get_required_data(data, "name")
#     actions = get_optional_data(data, "actions", return_none=[])
#     choice = create_choice(name, actions)
#     page.choices.append(choice)
#     db.session.add(page)
#     db.session.commit()
#     story = get_story(story_id)
#     return jsonify({"story": parse_story(story) })
#
# @editor.route(url_base_choices + '/<choice_id>', methods=['POST', 'PUT'])
# @jwt_required()
# def update_choice_request(story_id, page_id, choice_id):
#     choice = get_choice(choice_id, page_id, story_id)
#     data = request.get_json()
#     name = get_optional_data(data, "name")
#     description = get_optional_data(data, "description")
#     choice = update_choice(choice, name)
#     story = get_story(story_id)
#     return jsonify({"story": parse_story(story) })
#
#
# @editor.route(url_base_choices + '/<choice_id>', methods=['DELETE'])
# @jwt_required()
# def delete_choice(story_id, page_id, choice_id):
#     choice = get_choice(choice_id, page_id, story_id)
#     slug = choice.slug
#     db.session.delete(choice)
#     story = get_story(story_id)
#     return jsonify({
#         "story": parse_story(story),
#         "deleted": True,
#         "slug": slug,
#         "object": "choice",
#         })
#
# ##
# #  Actions
# ##
#
# url_base_actions = url_base_choices + "/<choice_id>/actions"
#
# @editor.route(url_base_actions, methods=['GET'])
# def get_actions(story_id, page_id, choice_id):
#     choice = get_choice(choice_id, page_id, story_id)
#     story = get_story(story_id)
#     return jsonify({"story": parse_story(story) })
#
# @editor.route(url_base_actions, methods=['POST', 'PUT'])
# def create_action_request(story_id, page_id, choice_id):
#     choice = get_choice(choice_id, page_id, story_id)
#     data = request.get_json()
#     name = get_required_data(data, "name")
#     target = get_required_data(data, "target")
#     command = get_required_data(data, "command")
#     action = create_action(name, target, command)
#     choice.actions.append(action)
#     db.session.add(choice)
#     db.session.commit()
#     story = get_story(story_id)
#     return jsonify({"story": parse_story(story) })
#
# def create_action(name, target, command):
#     command = get_model(Command, command)
#     if command is None:
#         abort(404, {'message': 'Command not found'})
#     return Action(name=name, target=target, command=command)
