import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loadData } from '../store/passman/actions'
import PasswordList from '../components/PasswordList';
import AddPasswordForm from '../components/AddPasswordForm';

class Home extends Component {
  componentDidMount() {
    setTimeout(() => {
      let userId = this.props.userId
      this.props.loadData(userId)
    }, 2000)
  }

  render() {
    return (
      <div className="container">
        <div className="text-center my-5">
          <h1>Welcome to Passman</h1>
          <h5>Your private password manager</h5>
        </div>
        <AddPasswordForm/>
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