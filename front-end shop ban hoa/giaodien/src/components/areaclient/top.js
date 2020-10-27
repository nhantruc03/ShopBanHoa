import React, { Component } from 'react';

class top extends Component {
    render() {
        return (
            <div className="main-top">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <div className="right-phone-box">
                            <p>Call US :- <a href="/#"> +11 900 800 100</a></p>
                        </div>
                        <div className="our-link">
                            <ul>
                                <li><a href="/#"><i className="fa fa-user s_color" /> My Account</a></li>
                                <li><a href="/#"><i className="fas fa-location-arrow" /> Our location</a></li>
                                <li><a href="/#"><i className="fas fa-headset" /> Contact Us</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <div className="login-box">
                            <select id="basic" className="selectpicker show-tick form-control" data-placeholder="Sign In">
                                <option>Register Here</option>
                                <option>Sign In</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default top;