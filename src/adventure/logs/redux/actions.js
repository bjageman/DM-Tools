import { createAction } from 'redux-act'

//character log actions
export const getCharacterListing = createAction("Get the list of Characters")
export const getCharacterListingSuccess = createAction("Sucessfully got the list of Characters")
export const getCharacter = createAction("Get a specific character data")
export const getCharactersLogs = createAction("Get the Log data of a specific character")
export const getCharactersLogsSuccess = createAction("Succeeded with Get the Log data of a specific character")
export const saveCharacter = createAction("Create or edit character data")
export const saveCharacterSuccess = createAction("Sucessfully saved character data")

//Adventure Log actions
export const getAdventureLogListing = createAction("Get the list of DM Logs")
export const getAdventureLogListingSuccess = createAction("Sucessfully got the list of AdventureLogs")
export const getAdventureLog = createAction("Get a specific AdventureLog data")
export const getAdventureLogSuccess = createAction("Successfully got a specific AdventureLog data")
export const saveAdventureLog = createAction("Create or edit AdventureLog data")
export const saveAdventureLogSuccess = createAction("Sucessfully saved AdventureLog data")

//Character Log actions
export const getCharacterSuccess = createAction("Success in Get a specific character data")
export const getCharacterLog = createAction("Get a specific character Log data")
export const getCharacterLogSuccess = createAction("Get a specific character data")
export const saveCharacterLog = createAction("Create or edit character data")
export const saveCharacterLogSuccess = createAction("Sucessfully saved character data")
