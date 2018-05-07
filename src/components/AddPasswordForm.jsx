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

  handleChange(e) {
    let typed = e.target.value
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      this.handleValidation(typed)
    })
  }
  
  handleSubmit(e) {
    e.preventDefault()
    let userId = this.props.userId
    let data = this.state
    this.props.inputData(userId, data)
  }

  render() {
    return (
      <form className="p-4" onSubmit={this.handleSubmit.bind(this)}>
        <h1 className="text-center">Add New Password</h1>
        <div className="form-group">
          <label htmlFor="email">URL</label>
          <input
            type="text"
            className="form-control"
            onChange={this.handleChange.bind(this)}
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
            onChange={this.handleChange.bind(this)}
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
          onChange={this.handleChange.bind(this)}
          value={this.state.password}
          name="password"
          placeholder="Password" />
        </div>
        <PasswordWidgets
          containLowercase={this.state.containLowercase}
          containUppercase={this.state.containUppercase}
          containSpecialChar={this.state.containSpecialChar}
          containNumber={this.state.containNumber}
          containMinLength={this.state.containMinLength}
        />
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