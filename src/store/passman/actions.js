import { db } from '../../config/firebase-config'
import firebase from 'firebase'
import {
  LOAD_PASSMAN_DATA_DONE,
  LOAD_PASSMAN_DATA_LOADING,
  LOAD_PASSMAN_DATA_ERROR,
  INPUT_PASSMAN_DATA
} from './action.types'
import swal from 'sweetalert'

export const loadData = (data) => {
  return dispatch => {
    dispatch(loadDataLoading())
    db.ref  (`password`).on('value', data => {
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

export const inputData = (data) => {
  data = {
    ...data,
    createdAt: firebase.database.ServerValue.TIMESTAMP,
    updatedAt: firebase.database.ServerValue.TIMESTAMP
  }

  return dispatch => {
    db.ref(`password`).push(data)
      .then(result => {
        swal('Add Password success!', '', 'success')
        dispatch(() => ({
          type: INPUT_PASSMAN_DATA
        }))
      })
      .catch(err => {
        console.error(err)
      })
  }
}