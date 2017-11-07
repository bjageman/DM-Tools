import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'

import { createReducer } from 'redux-act'
import * as actions from './actions'

import { user } from 'user/redux/reducers'

import { routerReducer as router } from 'react-router-redux'

const initial = {
  response: {
    success: false,
    error: false,
  },
}

export const response = createReducer({
  [actions.success]: (state, payload) => {
    return { success: payload.message, loading: false }
  },
  [actions.error]: (state, payload) => {
    return { error: payload.message || "Unknown Error", loading: false }
  },
  [actions.clear]: (state, payload) => {
    return { error: false, success: false }
  }
}, initial.response)

const config = {
  key: 'root',
  storage,
}

export default persistCombineReducers(
  config, { response, user, router} 
)
