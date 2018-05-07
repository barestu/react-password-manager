import React, { Component } from 'react';
import { connect } from 'react-redux'
import { auth } from '../config/firebase-config'

class SecurityCheck extends Component {
  constructor() {
    super()
    this.state = {
      password: ''
    }
  }

  render() {
    return (
      <form className="p-4">
        <h1 className="text-center">Input Password</h1>
        <p className="text-center">Confirm your password to continue this action</p>
        <div className="form-group">
          <input
          type="password"
          className="form-control"
          value={this.state.password}
          name="password"
          placeholder="Password" />
        </div>
        <div className="form-group text-center">
          <button className="btn btn-primary">Confirm</button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.userData.email
})

export default connect(
  mapStateToProps,
  null
)(SecurityCheck);