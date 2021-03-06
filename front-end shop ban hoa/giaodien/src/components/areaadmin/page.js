import React, { Component } from 'react';
import { LoadingIndicator } from '../LoadingIndicator';
import Sidebar from '../sidemenu';
// import Footer from '../footer'
import Topbar from '../topbar'
class page extends Component {
    render() {
        return (
            <React.Fragment>
                <div id="page-top">
                    <div id="wrapper">
                        {/* sidebar */}
                        <Sidebar />
                        {/* content wrapper */}
                        <div id="content-wrapper" className="d-flex flex-column">
                            <Topbar />
                            {this.props.children}
                            <LoadingIndicator color="#4e73df" />
                            {/* <Footer /> */}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default page;