import { db } from '../../config/firebase-config'
import firebase from 'firebase'
import swal from 'sweetalert'
import {
  LOAD_PASSMAN_DATA_DONE,
  LOAD_PASSMAN_DATA_LOADING,
  LOAD_PASSMAN_DATA_ERROR,
  INPUT_PASSMAN_DATA,
  SHOW_PASSMAN_DATA,
  HIDE_PASSMAN_DATA
} from './action.types'

export const loadData = (userId, data) => {
  return dispatch => {
    dispatch(loadDataLoading())
    db.ref(`password/${userId}`).on('value', data => {
      let dataPass = data.val()
      let arrPass = []

      for (let key in dataPass) {
        let objPass = {
          ...dataPass[key],
          id: key
        }
        arrPass.push(objPass)
      }

      dispatch(loadDataDone(arrPass))
    }, err => {
      console.error(err)
      dispatch(loadDataError(err))
    })
  }
}

const loadDataDone = (data) => ({
  type: LOAD_PASSMAN_DATA_DONE,
  payload: data
})

const loadDataLoading = () => ({
  type: LOAD_PASSMAN_DATA_LOADING
})

const loadDataError = (error) => ({
  type: LOAD_PASSMAN_DATA_ERROR,
  payload: error.message
})

export const inputData = (userId, data) => {
  data = {
    ...data,
    passHidden: true,
    createdAt: firebase.database.ServerValue.TIMESTAMP,
    updatedAt: firebase.database.ServerValue.TIMESTAMP
  }

  return dispatch => {
    db.ref(`password/${userId}`).push(data)
      .then(result => {
        swal('Add Password success!', '', 'success')
        dispatch(inputDataDone())
      })
      .catch(err => {
        console.error(err)
      })
  }
}

const inputDataDone = () => ({
  type: INPUT_PASSMAN_DATA
})

export const showPassword = (userId, passData) => {
  return dispatch => {
    let passId = passData.id

    db.ref(`password/${userId}/${passId}`)
      .update(passData)
      .then(result => {
        dispatch(showPasswordDone())
      })
      .catch(err => {
        console.error(err)
      })
  }
}

const showPasswordDone = () => ({
  type: SHOW_PASSMAN_DATA
})

export const hidePassword = (userId, passData) => {
  return dispatch => {
    let passId = passData.id

    db.ref(`password/${userId}/${passId}`)
      .update(passData)
      .then(result => {
        dispatch(hidePasswordDone())
      })
      .catch(err => {
        console.error(err)
      })
  }
}

const hidePasswordDone = () => ({
  type: HIDE_PASSMAN_DATA
})
