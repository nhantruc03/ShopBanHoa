import React, { Component } from 'react';
import './../css/App.css';
import Routing from '../router/bigroutermodule';
import { BrowserRouter as Router } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
         <Routing />
      </Router>
    );
  }
}

export default App;
