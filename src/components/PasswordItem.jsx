import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import { auth } from '../config/firebase-config'
import { deleteData, showPassword, hidePassword} from '../store/passman/actions'
import EditPasswordForm from '../components/EditPasswordForm'

class PasswordItem extends Component {
  constructor() {
    super()
    this.state = {
      confirmPass: ''
    }
  }

  formatDate(rawDate) {
    const arrMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let date = new Date(rawDate).getDate()
    let month = new Date(rawDate).getMonth()
    let year = new Date(rawDate).getFullYear()

    return `${date} ${arrMonth[month]} ${year}`
  }

  censorPass(pass) {
    let censor = '*'
    let password = pass
    
    return censor.repeat(password.length)
  }

  securityCheck = (e) => {
    e.preventDefault()
    let email = this.props.userEmail
    let password = this.state.confirmPass
    console.log('security check')
    auth.signInWithEmailAndPassword(email, password)
      .then(result => {
        this.showPassword()
        setTimeout(() => {
          this.hidePassword()
        }, 5000)
      })
      .catch(err => {
        console.error(err)
        alert('Wrong Password!')
      })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  showPassword() {
    let userId = this.props.userId
    let patch = {
      ...this.props.data,
      passHidden: false
    }
    this.props.showPassword(userId, patch)
  }

  hidePassword() {
    let userId = this.props.userId
    let patch = {
      ...this.props.data,
      passHidden: true
    }
    this.props.hidePassword(userId, patch)
  }

  deletePassword() {
    let userId = this.props.userId
    let passId = this.props.data.id
    this.props.deleteData(userId, passId)
  }

  render() {
    let passHidden = this.props.data.passHidden

    return (
      <tbody>
        <tr>
          <td>{this.props.index + 1}</td>
          <td>{this.props.data.url}</td>
          <td>{this.props.data.username}</td>
          {
            passHidden ? <td>{this.censorPass(this.props.data.password)}</td> :
            <td>{this.props.data.password}</td>
          }
          <td>{this.formatDate(this.props.data.createdAt)}</td>
          <td>{this.formatDate(this.props.data.updatedAt)}</td>
          <td>
            <button data-toggle="modal" data-target={"#secure"+this.props.data.id}>Show</button>
            <button data-toggle="modal" data-target={"#editPassForm"+this.props.data.id}>Edit</button>
            <button onClick={this.deletePassword.bind(this)}>Delete</button>

            <div className="modal fade" id={"editPassForm"+this.props.data.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <EditPasswordForm data={this.props.data}/>
                </div>
              </div>
            </div>

            <div className="modal fade" id={"secure"+this.props.data.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                <form onSubmit={this.securityCheck}  className="p-4">
                    <h1 className="text-center">Input Password</h1>
                    <p className="text-center">Confirm your password to continue this action</p>
                    <div className="form-group">
                      <input
                      type="password"
                      className="form-control"
                      onChange={this.handleChange}
                      value={this.state.confirmPass}
                      name="confirmPass"
                      placeholder="Password" />
                    </div>
                    <div className="form-group text-center">
                      <button className="btn btn-primary">Confirm</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.user.userData.id,
  userEmail: state.user.userData.email
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  deleteData,
  showPassword,
  hidePassword
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordItem);