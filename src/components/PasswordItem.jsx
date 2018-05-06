import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import { showPassword, hidePassword} from '../store/passman/actions'

class PasswordItem extends Component {
  hidePassword() {
    let censor = '*'
    let password = this.props.data.password
    
    return censor.repeat(password.length)
  }

  render() {
    let { passHidden } = this.props

    return (
      <tbody>
        <tr>
          <td>{this.props.index + 1}</td>
          <td>{this.props.data.url}</td>
          <td>{this.props.data.username}</td>
          {
            passHidden ? <td>{this.hidePassword(this.props.data.password)}</td> :
            <td>{this.props.data.password}</td>
          }
          <td>{this.props.data.createdAt}</td>
          <td>{this.props.data.updatedAt}</td>
          <td>
            <button>Show</button>
            <button>Edit</button>
            <button>Delete</button>
          </td>
        </tr>
      </tbody>
    );
  }
}

const mapStateToProps = (state) => ({
  passHidden: state.passman
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  showPassword,
  hidePassword
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordItem);