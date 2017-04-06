import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import persistState from 'redux-localstorage'

import reducer from './reducers'

let composeEnhancers = compose
if (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
}

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk),
    persistState(['token', 'files', 'users', 'sortBy'], {
      key: 'slack-files'
    })
  )
)

export default store
