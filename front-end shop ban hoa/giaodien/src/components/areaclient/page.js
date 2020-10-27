import React, { Component } from 'react';
import MainTop from './maintop';
import Routing from '../../router/routeclient';
import SearchBar from './searchbar';
import Top from './top';
import Footer from './footer'
import { BrowserRouter as Router } from 'react-router-dom'
import ScrollToTop from '../../router/ScrollToTop'
class page extends Component {
    render() {
        return (
            <Router>
                <ScrollToTop>
                    <Top />
                    <MainTop />
                    <SearchBar />
                    <Routing />
                    <Footer />
                    <a href="/#" id="back-to-top" title="Back to top" style={{ display: 'inline-block' }}>↑</a>
                </ScrollToTop>
            </Router>
        );
    }
}

export default page;