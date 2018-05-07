import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { editData } from '../store/passman/actions'
import PasswordWidgets from './PasswordWidgets';

class EditPasswordForm extends Component {
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

  componentDidMount() {
    this.setState({
      ...this.state,
      url: this.props.data.url,
      username: this.props.data.username,
      password: this.props.data.password
    })
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

  handleChange = (e) => {
    let typed = e.target.value
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      this.handleValidation(typed)
    })
  }
  
  handleSubmit = (e) => {
    e.preventDefault()
    let userId = this.props.userId
    let data = {
      ...this.props.data,
      url: this.state.url,
      username: this.state.username,
      password: this.state.password
    }
    console.log('DATA1', data)
    this.props.editData(userId, data)
  }

  render() {
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
          name="password"
          placeholder="Password" />
        </div>
        {
          this.state.validPassword ?
          <PasswordWidgets
          containLowercase={this.state.containLowercase}
          containUppercase={this.state.containUppercase}
          containSpecialChar={this.state.containSpecialChar}
          containNumber={this.state.containNumber}
          containMinLength={this.state.containMinLength}
          /> :
          this.state.password.length > 0 ?
          <div className="alert alert-info" role="alert">Password valid</div> :
          <div className="alert alert-danger" role="alert">Password required</div>
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
  editData
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditPasswordForm);