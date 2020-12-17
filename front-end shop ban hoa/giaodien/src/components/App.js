import React, { Component } from 'react';
import './../css/App.css';
import Routing from '../router/routermodule';
import { BrowserRouter as Router } from 'react-router-dom'
import ScrollToTop from '../router/ScrollToTop';
import 'antd/dist/antd.css';
class App extends Component {
  render() {
    return (
      <Router>
        <ScrollToTop>
          <Routing />
        </ScrollToTop>
      </Router>
    );
  }
}

export default App;
