import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loadData } from '../store/passman/actions'
import { setLogin } from '../store/user/actions';
import PasswordList from '../components/PasswordList'
import AddPasswordForm from '../components/AddPasswordForm'

class Home extends Component {
  componentWillMount() {
    let token = localStorage.getItem('token')
    if (token) {
      this.props.setLogin()
    }
  }

  componentDidUpdate() {
    let userId = this.props.userId
    this.props.loadData(userId)
  }

  render() {
    let isLogin = this.props.isLogin

    return (
      <div className="container">
        <div className="text-center my-3">
          <h1>Welcome to Passman</h1>
          <h5>Your private password manager</h5>
        </div>
        {
          isLogin ?
          <div className="content">
            <div className="text-center">
              <button className="btn btn-primary my-2" data-toggle="modal" data-target="#addPassForm">Add Password</button>
            </div>
            <div className="modal fade" id="addPassForm" tabIndex="-1" role="dialog">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <AddPasswordForm/>
                </div>
              </div>
            </div>
            <PasswordList/>
          </div> :
          <div className="alert alert-info text-center" role="alert">
            <h3>You need to login first to input data!</h3>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLogin: state.user.isLogin,
  userId: state.user.userData.id
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loadData,
  setLogin
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);