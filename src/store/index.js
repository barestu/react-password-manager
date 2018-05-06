import { createStore, combineReducers, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import passmanReducers from './passman/reducers'
import userReducers from './user/reducers'

const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const reducers = combineReducers({
  passman: passmanReducers,
  user: userReducers
})

const store = createStore(
  reducers,
  reduxDevtools,
  applyMiddleware(thunk, logger)
)

export default store