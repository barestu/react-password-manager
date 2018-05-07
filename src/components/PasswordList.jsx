import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loadData, searchData } from '../store/passman/actions'
import PasswordItem from './PasswordItem';

class PasswordList extends Component {
  constructor() {
    super()
    this.state = {
      searchKey: ''
    }
  }

  handleSearch(e) {
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      this.props.searchData(this.state.searchKey)
    })
  }

  render() {
    let { data, filtered, loading, error } = this.props.data
    let password = this.state.searchKey.length ? filtered : data
    let passData = password.map((pass, index) => 
      <PasswordItem data={pass} index={index} key={index}/>
    )
    
    return (
      <div>
        <div className="my-2 col-4">
          <input
            onChange={this.handleSearch.bind(this)}
            value={this.state.searchKey}
            name="searchKey"
            className="form-control my-2"
            type="search"
            placeholder="Search By URL"
          />
        </div>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.passman
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loadData,
  searchData
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordList);