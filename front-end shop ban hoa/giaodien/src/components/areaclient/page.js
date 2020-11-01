import React, { Component } from 'react';
import MainTop from './maintop';
import SearchBar from './searchbar';
import Top from './top';
import Footer from './footer'
class page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sideBar: ''
        }
    }

    handleOnClick = () =>{
        if(this.state.sideBar === ''){
            this.setState({
                sideBar: 'on'
            })
        }else{
            this.setState({
                sideBar: ''
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <Top />
                <MainTop handleSideBar={()=>this.handleOnClick()}  sideBar={this.state.sideBar}/>
                <SearchBar />
                {this.props.children}
                <Footer />
                <a href="/#" id="back-to-top" title="Back to top" style={{ display: 'inline-block' }}>↑</a>
            </React.Fragment>
        );
    }
}

export default page;