import { createReducer } from 'redux-act'
import * as actions from './actions'

const initial = {
  logs: {
      characters: {
            listing: [],
            detail: {}
      },
      adventures: {
          listing: [],
          detail: {}
      }
  },
}

export const logs = createReducer({
  [actions.getCharacterListingSuccess]: (state, payload) => {
    console.log(payload.data)
    return {
        ...state,
        characters: {
            listing: payload.data
        }
         }
  },
  [actions.getAdventureLogListingSuccess]: (state, payload) => {
    console.log(payload.data)
    return {
        ...state,
        adventures: {
            listing: payload.data
        }
         }
  }
}, initial.logs)
