import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import auth from '../../router/auth';

class top extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            role: '',
            logout: false,
            thongtincanhan: false
        }
    }
    componentDidMount() {
        var login = localStorage.getItem('login');
        var obj = JSON.parse(login);
        if (obj !== null) {
            this.setState({
                name: obj.name,
                role: obj.role
            })
        }
        else {
            console.log('null')
        }

    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    LogOut = (e) => {
        e.preventDefault();
        auth.logout();
        this.setState({
            logout: true
        })
    }

    renderData = () => {
        if (this.state.name !== '') {
            return (
                <li>
                    <Link className="link" to={`/personal`} ><i className="fa fa-user s_color" /> {this.state.name}</Link>
                </li>

            )
        }
    }

    renderAction = () => {
        if (this.state.name !== '') {
            return (
                <li><a onClick={(e) => this.LogOut(e)} href="/#"><i className="fa fa-user s_color" /> Đăng xuất</a></li>
            )
        } else {
            return (
                <li>
                    <Link className="link" to={`/login`} ><i className="fa fa-user s_color" /> Đăng nhập</Link>
                </li>
            )
        }
    }

    render() {
        if (this.state.logout) {
            return (
                <Redirect to="login" />
            )
        } else {
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
                                        {this.renderData()}
                                        {this.renderAction()}
                                        <li>
                                            <Link className="link" to={`/contact`} >
                                                <i className="fas fa-headset" /> Liên hệ
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

    }
}

export default top;