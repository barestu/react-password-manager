import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { userLogin } from '../store/user/actions'

class LoginForm extends Component {
  constructor() {
    super();
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

  handleSubmit(e) {
    e.preventDefault()
    this.props.userLogin(this.state.email, this.state.password)
  }

  render() {
    return (
      <form className="p-4" onSubmit={this.handleSubmit.bind(this)}>
        <h1 className="text-center">User Login</h1>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            className="form-control"
            onChange={this.handleChange.bind(this)}
            value={this.state.email}
            name="email"
            placeholder="Email"
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
          placeholder="Password" />
        </div>
        <div className="form-group">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  userLogin
}, dispatch)

export default connect(
    null,
    mapDispatchToProps
  )(LoginForm);