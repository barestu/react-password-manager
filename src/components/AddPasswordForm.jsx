import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { inputData } from '../store/passman/actions'
import PasswordWidgets from './PasswordWidgets';

class AddPasswordForm extends Component {
  constructor() {
    super()
    this.state = {
      url: '',
      username: '',
      password: '',
      validPassword: false,
      containUppercase: false,
      containLowercase: false,
      containSpecialChar: false,
      containNumber: false,
      containMinLength: false
    }
  }

  handleValidation(typed) {
    let validPassword = false
    let containLowercase = new RegExp('^(?=.*[a-z])').test(typed)
    let containUppercase = new RegExp('^(?=.*[A-Z])').test(typed)
    let containNumber = new RegExp('(?=.*[0-9])').test(typed)
    let containSpecialChar = new RegExp('(?=.*[!@#$%^&*])').test(typed)
    let containMinLength = new RegExp('(?=.{6,})').test(typed)

    if (containUppercase && containLowercase && containSpecialChar && containNumber && containMinLength) {
      validPassword = true
    }

    this.setState({
      ...this.state,
      validPassword: validPassword,
      containUppercase: containUppercase,
      containLowercase: containLowercase,
      containSpecialChar: containSpecialChar,
      containNumber: containNumber,
      containMinLength: containMinLength
    })
  }

  clearState() {
    this.setState({
      ...this.state,
      url: '',
      username: '',
      email: '',
      password: ''
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      let typed = this.state.password
      this.handleValidation(typed)
    })
  }
  
  handleSubmit = (e) => {
    e.preventDefault()
    let userId = this.props.userId
    let data = this.state

    if (this.state.validPassword) {
      this.props.inputData(userId, data)
      this.clearState()
      document.querySelector('#password').classList.remove('is-invalid')
    } else {
      document.querySelector('#password').classList.add('is-invalid')
    }
  }

  render() {
    let password = this.state.password

    return (
      <form className="p-4" onSubmit={this.handleSubmit}>
        <h1 className="text-center">Add New Password</h1>
        <div className="form-group">
          <label htmlFor="email">URL</label>
          <input
            type="text"
            className="form-control"
            onChange={this.handleChange}
            value={this.state.url}
            name="url"
            placeholder="URL"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Username/Email</label>
          <input
            type="text"
            className="form-control"
            onChange={this.handleChange}
            value={this.state.username}
            name="username"
            placeholder="Username/Email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
          type="password"
          className="form-control"
          onChange={this.handleChange}
          value={this.state.password}
          id="password"
          name="password"
          placeholder="Password" />
        </div>
        {
          (password.length > 0) ?
          <PasswordWidgets
            validPassword={this.state.validPassword}
            containLowercase={this.state.containLowercase}
            containUppercase={this.state.containUppercase}
            containSpecialChar={this.state.containSpecialChar}
            containNumber={this.state.containNumber}
            containMinLength={this.state.containMinLength}
          /> :
          (password.length === 0 ) ?
          <div className="alert alert-warning" role="alert">
            <span className="font-weight-bold">Password required!</span>
          </div> :
          <div/>
        }
        <div className="form-group text-center">
          <button className="btn btn-secondary">Add Data</button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  isLogin: state.user.isLogin,
  userId: state.user.userData.id
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  inputData
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddPasswordForm);