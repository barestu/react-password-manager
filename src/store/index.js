import { createStore, combineReducers, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import passmanReducers from './passman/reducers'

const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const reducers = combineReducers({
  passman: passmanReducers
})

const store = createStore(
  reducers,
  reduxDevtools,
  applyMiddleware(thunk, logger)
)

export default store