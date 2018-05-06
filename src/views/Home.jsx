import React, { Component } from 'react'
import PasswordList from '../components/PasswordList';
import AddPasswordForm from '../components/AddPasswordForm';

class Home extends Component {
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

export default Home;