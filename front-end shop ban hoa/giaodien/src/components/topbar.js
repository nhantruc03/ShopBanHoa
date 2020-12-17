import React, { Component } from 'react';
import auth from '../router/auth';
import { Link, Redirect } from 'react-router-dom'
class topbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logout: false,
            name: ''
        }
    }
    logout = () => {
        auth.logout();
        this.setState({
            logout: true
        })
    }

    componentDidMount() {
        var temp = localStorage.getItem('login');
        var obj = JSON.parse(temp);
        this.setState({
            name: obj.name
        })
    }


    render() {
        if (this.state.logout) {
            return (
                <Redirect to="admin/login" />
            )
        } else {
            return (
                <div>
                    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                        {/* Sidebar Toggle (Topbar) */}
                        <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                            <i className="fa fa-bars" />
                        </button>
                        {/* Topbar Navbar */}
                        <ul className="navbar-nav ml-auto">

                            {/* Nav Item - User Information */}
                            <li className="nav-item dropdown no-arrow">
                                <a className="nav-link dropdown-toggle" href="/" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">{this.state.name}</span>
                                </a>
                                {/* Dropdown - User Information */}
                                <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                                    <Link className="dropdown-item" to="/admin/personal">
                                        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                                    Profile
                                    </Link>
                                    <div className="dropdown-divider" />
                                    <a className="dropdown-item" onClick={() => this.logout()} href="/#" data-toggle="modal" data-target="#logoutModal">
                                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                                    Logout
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </nav>

                </div>
            );
        }
    }
}

export default topbar;