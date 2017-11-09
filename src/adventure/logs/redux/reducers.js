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
    return {
        ...state,
        characters: {
            ...state.adventures,
            listing: payload.data
        }
         }
  },
  [actions.getAdventureLogListingSuccess]: (state, payload) => {
    return {
        ...state,
        adventures: {
            ...state.adventures,
            listing: payload.data
        }
         }
  },
  [actions.getAdventureLogSuccess]: (state, payload) => {
    return {
        ...state,
        adventures: {
            ...state.adventures,
            detail: payload.data
        }
         }
  }
}, initial.logs)
