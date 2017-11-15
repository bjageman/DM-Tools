import * as actions from 'redux/actions'
import { put, call, takeEvery } from 'redux-saga/effects'
import { getDataApi, postDataApi, deleteDataApi } from 'redux/api'
import { push } from 'react-router-redux'

export function* saveCharacter(action) {
    try{
      let payload = action.payload
      let url = ""
      if (payload.id) {
          url = 'adventure/characters/' + payload.id
      }else{
          url = 'adventure/characters'
      }
      const response = yield call(postDataApi, url, payload, payload.access_token)
      if (response.status === 200) {
          yield put(actions.success({"message" : response.data.name + " was created!"}))
          yield put(push('/logs/characters/' + response.data.id))
        }else{
          yield put(actions.error({ "message": response.data.description || response.data.error }))
        }
      }catch(error){
        yield put(actions.error({ "message": error.message }))
      }
}

export function* getCharacter(action) {
    try{
      let payload = action.payload
      let url = 'adventure/characters/' + payload.id
      const response = yield call(getDataApi, url, payload.access_token)
      if (response.status === 200) {
          yield put(actions.getCharacterSuccess({ "data": response.data }))
        }else{
          yield put(actions.error({ "message": response.data.description || response.data.error }))
        }
      }catch(error){
        yield put(actions.error({ "message": error.message }))
      }
}

export function* deleteCharacter(action) {
    try{
      let payload = action.payload
      let url = 'adventure/characters/' + payload.id
      const response = yield call(deleteDataApi, url, payload.access_token)
      if (response.status === 200) {
          yield put(actions.success({"message" : "Successfully Deleted!"}))
          yield put(push('/logs/characters'))
        }else{
          yield put(actions.error({ "message": response.data.description || response.data.error }))
        }
      }catch(error){
        yield put(actions.error({ "message": error.message }))
      }
}

export function* getCharacterListing(action) {
    try{
      let payload = action.payload
      let url = 'adventure/characters'
      const response = yield call(getDataApi, url, payload.access_token)
      if (response.status === 200) {
          yield put(actions.getCharacterListingSuccess({ "data": response.data }))
        }else{
          yield put(actions.error({ "message": response.data.description || response.data.error }))
        }
      }catch(error){
        yield put(actions.error({ "message": error.message }))
      }
}

//Adventure Logs

export function* saveAdventureLog(action) {
    try{
      let payload = action.payload
      let url = ""
      if (payload.id) {
          url = 'adventure/logs/' + payload.id
      }else{
          url = 'adventure/logs'
      }
      const response = yield call(postDataApi, url, payload, payload.access_token)
      if (response.status === 200) {
          yield put(actions.success({"message" : response.data.name + " was created!"}))
          yield put(push('/logs/adventures/' + response.data.id))
        }else{
          yield put(actions.error({ "message": response.data.description || response.data.error }))
        }
      }catch(error){
        yield put(actions.error({ "message": error.message }))
      }
}

export function* saveCharacterLog(action) {
    try{
      let payload = action.payload
      let url = 'adventure/logs/' + payload.log_id + "/characters/" + payload.character_id
      const response = yield call(postDataApi, url, payload, payload.access_token)
      if (response.status === 200) {
          yield put(actions.success({"message" : response.data.name + " was created!"}))
          yield put(push('/logs/adventures/' + payload.log_id))
        }else{
          yield put(actions.error({ "message": response.data.description || response.data.error }))
        }
      }catch(error){
        yield put(actions.error({ "message": error.message }))
      }
}

export function* getAdventureLog(action) {
    try{
      let payload = action.payload
      let url = 'adventure/logs/' + payload.id
      const response = yield call(getDataApi, url, payload.access_token)
      if (response.status === 200) {
          yield put(actions.getAdventureLogSuccess({ "data": response.data }))
        }else{
          yield put(actions.error({ "message": response.data.description || response.data.error }))
        }
      }catch(error){
        yield put(actions.error({ "message": error.message }))
      }
}

export function* getAdventureLogListing(action) {
    try{
      let payload = action.payload
      let url = 'adventure/logs'
      const response = yield call(getDataApi, url, payload.access_token)
      if (response.status === 200) {
          yield put(actions.getAdventureLogListingSuccess({ "data": response.data }))
        }else{
          yield put(actions.error({ "message": response.data.description || response.data.error }))
        }
      }catch(error){
        yield put(actions.error({ "message": error.message }))
      }
}


export function* logout(action){
    yield put(push('/'))
}

export default function* adventureLogSagas(){
    console.log("WORKS?")
    yield takeEvery(actions.getCharacterListing, getCharacterListing)
    yield takeEvery(actions.getCharacter, getCharacter)
    yield takeEvery(actions.saveCharacter, saveCharacter)
    yield takeEvery(actions.deleteCharacter, deleteCharacter)
    yield takeEvery(actions.getAdventureLogListing, getAdventureLogListing)
    yield takeEvery(actions.getAdventureLog, getAdventureLog)
    yield takeEvery(actions.saveAdventureLog, saveAdventureLog)
    yield takeEvery(actions.saveCharacterLog, saveCharacterLog)
}
