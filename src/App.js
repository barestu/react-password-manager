import React, { Component } from 'react'
import Home from './views/Home'
import NavBar from './components/NavBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar/>
        <Home/>
      </div>
    );
  }
}

export default App;
