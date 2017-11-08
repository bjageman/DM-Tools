import { createAction } from 'redux-act'

//character log actions
export const getCharacterListing = createAction("Get the list of Characters")
export const getCharacterListingSuccess = createAction("Sucessfully got the list of Characters")
export const getCharacter = createAction("Get a specific character data")
export const saveCharacter = createAction("Create or edit character data")
export const saveCharacterSuccess = createAction("Sucessfully saved character data")

//DM Log actions
export const getDMListing = createAction("Get the list of DM Logs")
export const saveDMLog = createAction("Save DM Log data")
