import {
  LOAD_PASSMAN_DATA_DONE,
  LOAD_PASSMAN_DATA_LOADING,
  LOAD_PASSMAN_DATA_ERROR,
  INPUT_PASSMAN_DATA,
  SHOW_PASSMAN_DATA,
  HIDE_PASSMAN_DATA,
  SEARCH_PASSMAN_DATA,
  DELETE_PASSMAN_DATA,
  EDIT_PASSMAN_DATA
} from './action.types'

const initialState = {
  data: [],
  filtered: [],
  searchKey: '',
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
    case SEARCH_PASSMAN_DATA:
      let searchResult = []

      if (action.payload !== '') {
        searchResult = state.data.filter(result => result.url.includes(action.payload))
      }

      return {
        ...state,
        searchKey: action.payload,
        filtered: searchResult
      }
    case INPUT_PASSMAN_DATA:
      return {
        ...state
      }
    case EDIT_PASSMAN_DATA:
      return {
        ...state
      }
    case DELETE_PASSMAN_DATA:
      return {
        ...state
      }
    case SHOW_PASSMAN_DATA:
      return {
        ...state
      }
    case HIDE_PASSMAN_DATA:
      return {
        ...state
      }
    default:
      return state
  }
}

export default passmanReducers