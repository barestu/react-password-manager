import {
  LOAD_PASSMAN_DATA_DONE,
  LOAD_PASSMAN_DATA_LOADING,
  LOAD_PASSMAN_DATA_ERROR,
  INPUT_PASSMAN_DATA
} from './action.types'

const initialState = {
  data: [],
  loading: false,
  error: {
    status: false,
    message: ''
  }
}

const passmanReducers = (state = {...initialState}, action) => {
  switch (action.type) {
    case LOAD_PASSMAN_DATA_LOADING:
      return {
        ...state,
        loading: true
      }
    case LOAD_PASSMAN_DATA_DONE:
      return {
        ...state,
        loading: false,
        data: action.payload
      }
    case LOAD_PASSMAN_DATA_ERROR:
      let errObj = {
        status: true,
        message: action.payload
      }

      return {
        ...state,
        loading: false,
        error: {...errObj}
      }
    case INPUT_PASSMAN_DATA:
      return {
        ...state.data
      }
    default:
      return state
  }
}

export default passmanReducers