import { createAction } from 'redux-act'

//character log actions
export const getCharacterListing = createAction("Get the list of Characters")
export const getCharacterListingSuccess = createAction("Sucessfully got the list of Characters")
export const getCharacter = createAction("Get a specific character data")
export const saveCharacter = createAction("Create or edit character data")
export const saveCharacterSuccess = createAction("Sucessfully saved character data")

//DM Log actions
export const getAdventureLogListing = createAction("Get the list of DM Logs")
export const getAdventureLogListingSuccess = createAction("Sucessfully got the list of AdventureLogs")
export const getAdventureLog = createAction("Get a specific AdventureLog data")
export const saveAdventureLog = createAction("Create or edit AdventureLog data")
export const saveAdventureLogSuccess = createAction("Sucessfully saved AdventureLog data")
