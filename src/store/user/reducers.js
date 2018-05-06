import {
  USER_REGISTER,
  USER_LOGIN,
  USER_SET_LOGIN,
  USER_LOGOUT
} from './action.types'

const initialState = {
  isLogin: false,
  userData: {}
}

const userReducers = (state = {...initialState}, action) => {
  switch (action.type) {
    case USER_REGISTER:
      return {
        ...state
      }
    case USER_LOGIN:
      return {
        ...state,
        isLogin: true,
        userData: action.payload
      }
    case USER_SET_LOGIN:
      return {
        ...state,
        isLogin: true,
        userData: action.payload
      }
    case USER_LOGOUT:
      return {
        ...state,
        isLogin: false,
        userData: {}
      }
    default:
      return state
  }
}

export default userReducers