import Axios from 'axios';
import React, { Component } from 'react';
import Breadcumsection from '../breadcumsection';
import { trackPromise } from 'react-promise-tracker';
import { Redirect } from 'react-router-dom';
const bc = [
    {
        name: "Đăng ký",
        link: "/"
    }
]
class register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            name: '',
            address: '',
            phoneNumber: '',
            done: false
        }
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = async (e) => {
        e.preventDefault();
        var data = {
            username: this.state.username,
            password: this.state.password,
            name: this.state.name,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber
        }

        await trackPromise(Axios.post('/users/register', data)
            .then(res => {
                if (res.data.success === true) {

                    var h = document.getElementById("beforeend");
                    h.insertAdjacentHTML("beforeEnd", '<p className="textcolor" style="font-size: xxx-large;font-weight: bold;color:#b0b435;">Đăng kí thành công</p>');
                    setTimeout(() => {
                        h.querySelector(':last-child').remove();
                        this.onDone();
                    }, 2000);

                }
            })
            .catch((err) => {
                var h = document.getElementById("beforeend");
                h.insertAdjacentHTML("beforeEnd", '<p className="textcolor" style="font-size: xxx-large;font-weight: bold;color:#b0b435;">' + err.response.data.error + '</p>');
                setTimeout(() => {
                    h.querySelector(':last-child').remove();
                }, 5000);
            })
        )
    }
    onDone = () => {
        this.setState({
            done: true
        })
    }
    render() {
        if (this.state.done) {
            return (
                <Redirect to="/login"></Redirect>
            )
        }
        else {
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

                                <label htmlFor="name"  >Tên</label>
                                <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="name" placeholder="Tên" required />

                                <label htmlFor="address"  >Địa chỉ</label>
                                <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="address" placeholder="Địa chỉ" required />

                                <label htmlFor="phoneNumber"  >Số điện thoại</label>
                                <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="phoneNumber" placeholder="Số điện thoại" required />


                                <br />
                                <div className="submit-button text-center">
                                    <button className="btn hvr-hover btn-success" id="submit" type="submit">Đăng ký</button>
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
}

export default register;