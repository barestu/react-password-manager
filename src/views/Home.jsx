import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loadData } from '../store/passman/actions'
import PasswordList from '../components/PasswordList'
import AddPasswordForm from '../components/AddPasswordForm'

class Home extends Component {
  componentDidMount() {
    setTimeout(() => {
      let userId = this.props.userId
      this.props.loadData(userId)
    }, 1000)
  }

  render() {
    return (
      <div className="container">
        <div className="text-center my-5">
          <h1>Welcome to Passman</h1>
          <h5>Your private password manager</h5>
          <button className="btn btn-primary my-2" data-toggle="modal" data-target="#addPassForm">Add Password</button>
        </div>
        <div className="modal fade" id="addPassForm" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <AddPasswordForm/>
            </div>
          </div>
        </div>
        <PasswordList/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.user.userData.id
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loadData
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);