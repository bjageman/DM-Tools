from v1.apps.parsers import parse_base, parse_image
from v1.apps.users.parsers import parse_user

def parse_logs(logs, detailed=False):
    log_set = []
    for log in logs:
        log_set.append(parse_log(log))
    return(log_set)

def parse_log(log):
    try:
        result = parse_base(log)
        result.update({
            "length": log.length,
            "xp": log.xp,
            "gold": log.gold,
            "character": parse_character(log.character),
            "author": parse_user(log.author)
            })
        return result
    except AttributeError as e:
        return None

def parse_characters(characters):
    character_set = []
    for character in characters:
        character_set.append(parse_character(character))
    return(character_set)

def parse_character(character):
    try:
        result = parse_base(character)
        result.update({
            "class": character.classChar,
            "race": character.race,
            "background": character.background,
            })
        return result
    except AttributeError:
        return None

#
# def parse_pages(pages, detailed=False):
#     page_set = []
#     for page in pages:
#         page_set.append(parse_page(page, detailed))
#     return(page_set)
#
# def parse_page(page, detailed=True):
#     try:
#         result = parse_base(page)
#         if (detailed):
#             result.update({
#                 "description": page.description,
#                 "start": page.start,
#                 "choices": parse_choices(page.choices),
#                 })
#         return result
#     except AttributeError as e:
#         return None
#
# def parse_choices(choices):
#     choice_set = []
#     for choice in choices:
#         choice_set.append(parse_choice(choice))
#     return(choice_set)
#
# def parse_choice(choice):
#     try:
#         result = parse_base(choice)
#         result.update({
#             "required_item": choice.required_item,
#             "actions": parse_actions(choice.actions)
#         })
#         return result
#     except AttributeError:
#         return None
#
# def parse_actions(actions):
#     action_set = []
#     for action in actions:
#         action_set.append(parse_action(action))
#     return(action_set)
#
# def parse_action(action):
#     try:
#         result = parse_base(action)
#         result.update({
#             "command": parse_command(action.command),
#             "target": action.target,
#             "page": parse_page(action.page, False),
#             "item": parse_item(action.item, False),
#         })
#         return result
#     except AttributeError as e:
#         return None
#
# def parse_items(items):
#     item_set = []
#     for item in items:
#         item_set.append(parse_item(item))
#     return(item_set)
#
# def parse_item(item, detailed=False):
#     try:
#         result = parse_base(item)
#         result.update({
#             "name": item.name,
#         })
#         return result
#     except AttributeError as e:
#         return None
#
# def parse_sessions(sessions):
#     session_set = []
#     for session in sessions:
#         session_set.append(parse_session(session))
#     return(session_set)
#
# def parse_session(session):
#     try:
#         result = parse_base(session)
#         result.update({
#             "host": parse_user(session.host),
#             "story": parse_story(session.story, False),
#             "players": parse_players(session.players),
#         })
#         return result
#     except AttributeError as e:
#         return None
#
# def parse_players(players):
#     player_set = []
#     for player in players:
#         player_set.append(parse_player(player))
#     return(player_set)
#
# def parse_player(player):
#     try:
#         result = parse_base(player)
#         result.update({
#             "user": parse_user(player.user),
#             "inventory": parse_items(player.inventory),
#         })
#         return result
#     except AttributeError as e:
#         return None
#
# def choice_vote_count(page, votes):
#     choice_set = []
#     vote_max = 0
#     winner = []
#     for choice in page.choices:
#         vote_count = 0
#         for vote in votes:
#             if vote.choice == choice:
#                 vote_count = vote_count + 1
#         result = parse_choice(choice)
#         result.update({ 'votes': vote_count })
#         choice_set.append(result)
#         if vote_count == vote_max:
#             winner.append(choice)
#         if vote_count > vote_max:
#             vote_max = vote_count
#             winner = [choice]
#     return choice_set, winner
#
# def vote_count(votes):
#     vote_set = {}
#     for vote in votes:
#         if vote.choice.id in vote_set:
#             vote_set[vote.choice.id]['count'] = vote_set[vote.choice.id]['count'] + 1
#             vote_set[vote.choice.id]['voters'].append(parse_player(vote.player))
#         else:
#             vote_set[vote.choice.id] = {
#                 'count': 1,
#                 'voters': [parse_player(vote.player)]
#                 }
#     return(vote_set)
#
# def parse_votes(votes):
#     vote_set = []
#     for vote in votes:
#         vote_set.append(parse_vote(vote))
#     return(vote_set)
#
#
# def parse_vote(vote):
#     try:
#         result = {}
#         result.update({
#             "voter": parse_player(vote.player),
#             "page": parse_page(vote.page),
#             "choice": parse_choice(vote.choice),
#         })
#         return result
#     except AttributeError as e:
#         return None
