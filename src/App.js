import React, { Component } from 'react'
import { auth } from './config/firebase-config'
import Home from './views/Home'
import NavBar from './components/NavBar';

class App extends Component {
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
