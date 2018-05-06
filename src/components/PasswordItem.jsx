import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import { showPassword, hidePassword} from '../store/passman/actions'

class PasswordItem extends Component {
  censorPass(pass) {
    let censor = '*'
    let password = pass
    
    return censor.repeat(password.length)
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
          <td>{this.props.data.createdAt}</td>
          <td>{this.props.data.updatedAt}</td>
          <td>
            {
              passHidden ? <button onClick={this.showPassword.bind(this)}>Show</button> :
              <button onClick={this.hidePassword.bind(this)}>Hide</button>
            }
            <button>Edit</button>
            <button>Delete</button>
          </td>
        </tr>
      </tbody>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.user.userData.id
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  showPassword,
  hidePassword
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordItem);