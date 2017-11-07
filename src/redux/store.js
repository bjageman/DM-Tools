import { compose, createStore, applyMiddleware } from 'redux'

import createHistory from 'history/createBrowserHistory'
//Middleware
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
//Redux-Persist
import { persistStore } from 'redux-persist'

import { routerMiddleware } from 'react-router-redux'
//Custom Data
import reducers from './reducers'
import sagas from './sagas'

export const history = createHistory()



function configureStore(initialState){
  const sagaMiddleware = createSagaMiddleware()
  const loggerMiddleware = createLogger()
  let store = createStore(
    reducers,
    compose(
        applyMiddleware(
            routerMiddleware(history),
            sagaMiddleware,
            loggerMiddleware,
        ),
    ),
  )
  let persistor = persistStore(store, {whitelist: ['user', 'session']})
  sagaMiddleware.run(sagas)
  return {store, persistor}
}

export const {store, persistor} = configureStore()
export default store
