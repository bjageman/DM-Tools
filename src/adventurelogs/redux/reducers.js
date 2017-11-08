import { createReducer } from 'redux-act'
import * as actions from './actions'

const initial = {
  logs: {
      characters: {
            listing: [],
            detail: {}
      },
      dm: {
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
  }
}, initial.logs)
