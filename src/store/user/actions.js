import { auth } from '../../config/firebase-config'
import swal from 'sweetalert'
import {
  USER_REGISTER,
  USER_LOGIN,
  USER_SET_LOGIN,
  USER_LOGOUT
} from './action.types'

export const userRegister = (email, password) => {
  return dispatch => {
    auth.createUserWithEmailAndPassword(email, password)
      .then(result => {
        swal('Register success!', '', 'success')
        dispatch(userRegisterDone())
      })
      .catch(err => {
        console.error('Register failed', err)
        swal('Register failed', '', 'danger')
      })
  }
}

const userRegisterDone = () => ({
  type: USER_REGISTER
})

export const userLogin = (email, password) => {
  return dispatch => {
    auth.signInWithEmailAndPassword(email, password)
      .then(result => {
        localStorage.setItem('token', result.refreshToken)
        let userData = {
          email: result.email,
          id: result.uid
        }
        dispatch(userLoginDone(userData))
      })
      .catch(err => {
        console.error('Login failed', err)
      })
  }
}

const userLoginDone = (data) => ({
  type: USER_LOGIN,
  payload: data
})

export const setLogin = () => {
  return dispatch => {
    auth.onAuthStateChanged(result => {
      if (result) {
        localStorage.setItem('token', result.refreshToken)
        let userData = {
          email: result.email,
          id: result.uid
        }
        dispatch(setLoginDone(userData))
      } else {
        console.log('Not logged in')
      }
    })
  }
}

const setLoginDone = (result) => ({
  type: USER_SET_LOGIN,
  payload: result
})

export const userLogout = () => {
  return dispatch => {
    localStorage.removeItem('token')
    auth.signOut()
    dispatch(userLogoutDone())
  }
}

const userLogoutDone = () => ({
  type: USER_LOGOUT
})