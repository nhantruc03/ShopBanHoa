import React, { Component } from 'react';
import './../css/App.css';
import Sidebar from './sidebar';
import Footer from './footer'
import Topbar from './topbar'
import Routing from '../router/routermodule';
import { BrowserRouter as Router } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <div id="page-top">
          <div id="wrapper">
            {/* sidebar */}
            <Sidebar />
            {/* content wrapper */}
            <div id="content-wrapper" className="d-flex flex-column">
              <Topbar />
              <Routing />
              <Footer />
            </div>
          </div>
          <a className="scroll-to-top rounded" href="#page-top">
            <i className="fas fa-angle-up"></i>
          </a>
        </div>
      </Router>
    );
  }
}

export default App;
