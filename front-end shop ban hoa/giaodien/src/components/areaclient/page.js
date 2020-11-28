import React, { Component } from 'react';
import MainTop from './maintop';
import SearchBar from './searchbar';
import Top from './top';
import Footer from './footer'
import { LoadingIndicator } from '../LoadingIndicator';



class page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sideBar: '',
            menu: ''
        }
    }
    handleMenu = () => {
        if (this.state.menu === '') {
            this.setState({
                menu: 'show'
            })
        } else {
            this.setState({
                menu: ''
            })
        }
    }

    handleOnClick = () => {
        if (this.state.sideBar === '') {
            this.setState({
                sideBar: 'on'
            })
        } else {
            this.setState({
                sideBar: ''
            })
        }
    }

    click = (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }

    render() {
        return (
            <React.Fragment>
                <Top />
                <MainTop handleSideBar={() => this.handleOnClick()} sideBar={this.state.sideBar} handleMenu={() => this.handleMenu()} Menu={this.state.menu} />
                <SearchBar />
                {this.props.children}
                <LoadingIndicator/>
                <Footer />
                <a onClick={(e) => this.click(e)} href="/#" id="back-to-top" title="Back to top" style={{ display: 'inline-block' }}><span>↑</span></a>
            </React.Fragment>
        );
    }
}

export default page;