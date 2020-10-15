import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isDone: false
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();


        this.setState({
            isDone:true
        })
    }
    render() {
        if (this.state.isDone) {
            return (
                <Redirect to="/admin" />
            )
        }
        else {
            return (
                <div className="bg-gradient-primary" style={{ height: '100vh' }}>
                    <div className="container" style={{ paddingTop: 100 }}>
                        {/* Outer Row */}
                        <div className="row justify-content-center">
                            <div className="col-xl-10 col-lg-12 col-md-9">
                                <div className="card o-hidden border-0 shadow-lg my-5">
                                    <div className="card-body p-0">
                                        {/* Nested Row within Card Body */}
                                        <div className="row">
                                            <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                                            <div className="col-lg-6">
                                                <div className="p-5">
                                                    <div className="text-center">
                                                        <h1 className="h4 text-gray-900 mb-4">Xin chào!</h1>
                                                    </div>
                                                    <form className="user" onSubmit={(e) => this.onSubmit(e)}>
                                                        <div className="form-group">
                                                            <input type="text" className="form-control form-control-user" name="username" placeholder="Nhập tài khoản..." required />
                                                        </div>
                                                        <div className="form-group">
                                                            <input type="password" className="form-control form-control-user" name="password" placeholder="Mật khẩu" required />
                                                        </div>

                                                        <button type="submit" style={{ marginTop: 100 }} className="btn btn-primary btn-user btn-block">
                                                            Đăng nhập
                                                    </button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            );
        }
    }
}

export default login;