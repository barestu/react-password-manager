import React, { Component } from 'react'
import { auth } from './firebase-config'
import Home from './Views/Home'
import NavBar from './Components/NavBar';

class App extends Component {
  userLogout() {
    auth.signOut()
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        console.info('Already logged in', user)
      } else {
        console.error('Not logged in yet')
      }
    })
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <Home/>
      </div>
    );
  }
}

export default App;
