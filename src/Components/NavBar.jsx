import React, { Component } from 'react'
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

class NavBar extends Component {
  render() {
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
          <div className="mx-1">
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search"/>
              <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
          <div className="mx-1">
            <button onClick={this.userLogout} className="btn btn-outline-light">Log out</button>
          </div>
          <div className="mx-1">
            <button className="btn btn-outline-light" data-toggle="modal" data-target="#loginForm">Login</button>
          </div>
          <div className="mx-1">
            <button className="btn btn-outline-light" data-toggle="modal" data-target="#registerForm">Register</button>
          </div>
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

export default NavBar