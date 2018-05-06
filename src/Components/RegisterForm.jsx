import React, { Component } from 'react'
import { auth } from '../firebase-config'

class RegisterForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(response => {
        console.info('Register success', response)
      })
      .catch(err => {
        console.error('Register failed', err)
      })
  }

  render() {
    return (
      <form className="p-4" onSubmit={this.handleSubmit}>
        <h1 className="text-center">User Register</h1>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            className="form-control"
            onChange={this.handleChange}
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
          onChange={this.handleChange}
          value={this.state.password}
          name="password"
          placeholder="Password" />
        </div>
        <div className="form-group">
          <button className="btn btn-secondary">Register</button>
        </div>
      </form>
    );
  }
}

export default RegisterForm;