import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { inputData } from '../store/passman/actions'

class AddPasswordForm extends Component {
  constructor() {
    super()
    this.state = {
      url: '',
      username: '',
      password: '',
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
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
      <form className="p4" onSubmit={this.handleSubmit.bind(this)}>
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
        <div className="form-group">
          <button className="btn btn-secondary">Submit</button>
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