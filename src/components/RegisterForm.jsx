import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { userRegister } from '../store/user/actions'

export class RegisterForm extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  clearState() {
    this.setState({
      email: '',
      password: ''
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.userRegister(this.state.email, this.state.password)
    this.clearState()
  }

  render() {
    return (
      <form id="form" className="p-4" onSubmit={this.handleSubmit.bind(this)}>
        <h1 className="text-center">User Register</h1>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            className="form-control"
            onChange={this.handleChange.bind(this)}
            value={this.state.email}
            name="email"
            placeholder="Email"
            id="registerEmail"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            onChange={this.handleChange.bind(this)}
            value={this.state.password}
            name="password"
            placeholder="Password"
            id="registerPassword"
          />
        </div>
        <div className="form-group">
          <button type="submit" id="button" className="btn btn-secondary">Register</button>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  userRegister
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(RegisterForm)