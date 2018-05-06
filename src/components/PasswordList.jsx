import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loadData } from '../store/passman/actions'
import PasswordItem from './PasswordItem';

class PasswordList extends Component {
  render() {
    let { data, loading, error } = this.props.data
    let passData = data.map((pass, index) => 
      <PasswordItem data={pass} index={index} key={index}/>
    )
    
    return (
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>URL</th>
            <th>Username/Email</th>
            <th>Password</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        {
          loading ? <tbody><tr><td className="text-center" colSpan="6">Loading user data...</td></tr></tbody> :
          error.status ? <tbody><tr><td className="text-center" colSpan="6">Oops, something wrong</td></tr></tbody> :
          passData
        }
        
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.passman
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loadData
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordList);