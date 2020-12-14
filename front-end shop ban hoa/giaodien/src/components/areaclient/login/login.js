import Axios from 'axios';
import React, { Component } from 'react';
import auth from '../../../router/auth';
import Breadcumsection from '../breadcumsection';
import { trackPromise } from 'react-promise-tracker';
const bc = [
    {
        name: "Đăng nhập",
        link: "/"
    }
]
class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = async (e) => {
        e.preventDefault();
        var data = new FormData();

        data.append("username", this.state.username);
        data.append("password", this.state.password);
        await trackPromise(Axios.post('/users/login', data)
            .then(res => {
                if (res.data.success === true) {
                    auth.login(res.data.data);
                }
                if (auth.isAuthenticatedClient() === true) {
                    this.onDone();
                }
                else {
                    var h = document.getElementById("beforeend");
                    h.insertAdjacentHTML("beforeEnd", '<p className="textcolor" style="font-size: xxx-large;font-weight: bold;color:#b0b435;">Đăng nhập thất bại</p>');
                    setTimeout(() => {
                        h.querySelector(':last-child').remove();
                    }, 3000);
                }
            })
            .catch(err => {
                console.log(err);
            }))
    }
    onDone = () => {
        this.props.history.goBack();
    }
    render() {
        return (
            <div>
                <Breadcumsection data={bc} />
                <div className="shop-detail-box-main">
                    <div className="container">
                        <form className="form-group" onSubmit={(e) => this.onSubmit(e)}>
                            <label htmlFor="username"  >Tài khoản</label>
                            <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="username" placeholder="Tài khoản" required />

                            <label htmlFor="password"  >Mật khẩu</label>
                            <input onChange={(e) => this.onChange(e)} type="password" className="form-control" name="password" placeholder="Mật khẩu" required />

                            <br />
                            <div className="submit-button text-center">
                                <button className="btn hvr-hover btn-success" id="submit" type="submit">Đăng nhập</button>
                                <div id="msgSubmit" className="h3 text-center hidden" />
                                <div className="clearfix" />
                            </div>
                        </form>
                        <div className="beforeend text-center" id="beforeend">

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default login;