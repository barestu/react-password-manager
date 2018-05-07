import { db } from '../../config/firebase-config'
import firebase from 'firebase'
import swal from 'sweetalert'
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

export const loadData = (userId, data) => {
  return dispatch => {
    dispatch(loadDataLoading())
    db.ref(`passmanData/${userId}`).on('value', data => {
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

export const searchData = (searchKey) => ({
  type: SEARCH_PASSMAN_DATA,
  payload: searchKey
})

export const inputData = (userId, data) => {
  data = {
    ...data,
    userId: userId,
    passHidden: true,
    createdAt: firebase.database.ServerValue.TIMESTAMP,
    updatedAt: firebase.database.ServerValue.TIMESTAMP
  }

  return dispatch => {
    db.ref(`passmanData/${userId}`)
      .push(data)
      .then(result => {
        swal('Add Password success!', '', 'success')
        dispatch(inputDataDone())
      })
      .catch(err => {
        console.error(err)
      })
  }
}

export const editData = (userId, data) => {
  return dispatch => {
    let passId = data.id

    db.ref(`passmanData/${userId}/${passId}`)
      .update(data)
      .then(result => {
        swal('Edit Password success!', '', 'success')
        dispatch(editDataDone())
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const deleteData = (userId, passId) => {
  return dispatch => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover the data!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    })
      .then(willDelete => {
        if (willDelete) {
          db.ref(`passmanData/${userId}/${passId}`)
            .remove()
            .then(result => {
              dispatch(deleteDataDone())
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              })
            })
            .catch(err => console.error(err))
        }
      })
  }
}

export const showPassword = (userId, passData) => {
  return dispatch => {
    let passId = passData.id

    db.ref(`passmanData/${userId}/${passId}`)
      .update(passData)
      .then(result => {
        dispatch(showPasswordDone())
      })
      .catch(err => {
        console.error(err)
      })
  }
}

export const hidePassword = (userId, passData) => {
  return dispatch => {
    let passId = passData.id

    db.ref(`passmanData/${userId}/${passId}`)
      .update(passData)
      .then(result => {
        dispatch(hidePasswordDone())
      })
      .catch(err => {
        console.error(err)
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

const inputDataDone = () => ({
  type: INPUT_PASSMAN_DATA
})

const editDataDone = () => ({
  type: EDIT_PASSMAN_DATA
})

const deleteDataDone = () => ({
  type: DELETE_PASSMAN_DATA
})

const showPasswordDone = () => ({
  type: SHOW_PASSMAN_DATA
})

const hidePasswordDone = () => ({
  type: HIDE_PASSMAN_DATA
})
