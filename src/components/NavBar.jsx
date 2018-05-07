import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { userLogout, setLogin } from '../store/user/actions'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'

class NavBar extends Component {
  componentDidMount() {
    let token = localStorage.getItem('token')
    if (token) {
      this.props.setLogin()
    }
  }

  render() {
    let isLogin = this.props.isLogin

    return (
      <nav className="navbar navbar-expand-lg bg-primary">
        <a className="navbar-brand text-light">Passman.</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link text-light">Home</a>
            </li>
          </ul>
          <div className="mx-1  mr-auto">
          </div>
          {
            isLogin ?
            <div className="mx-1">
              <button onClick={this.props.userLogout} className="btn btn-outline-light">Log out</button>
            </div> :
            <div>
              <button className="btn btn-outline-light mx-1" data-toggle="modal" data-target="#loginForm">Login</button>
              <button className="btn btn-outline-light mx-1" data-toggle="modal" data-target="#registerForm">Register</button>
            </div>
          }
        </div>

        <div className="modal fade" id="registerForm" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <RegisterForm />
            </div>
          </div>
        </div>

        <div className="modal fade" id="loginForm" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <LoginForm />
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  isLogin: state.user.isLogin
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  userLogout,
  setLogin
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps  
  )(NavBar)