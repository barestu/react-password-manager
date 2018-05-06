import React, { Component } from 'react'
import { auth } from '../firebase-config'

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
    auth.signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(response => {
        console.info('Login success', response)
      })
      .catch(err => {
        console.error('Login failed', err)
      })
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

export default LoginForm;