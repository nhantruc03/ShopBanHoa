import Axios from 'axios';
import React, { Component } from 'react';
import Breadcumsection from '../breadcumsection';
import { AUTH } from '../../env';
import Orderhistory from './order_history';
import { trackPromise } from 'react-promise-tracker';
import { LoadingIndicator } from '../../LoadingIndicator';
const bc = [
    {
        name: "Thông tin cá nhân",
        link: "/"
    }
]
class personal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            name: '',
            phoneNumber: '',
            address: ''
        }
    }

    async componentDidMount() {
        const login = window.sessionStorage.getItem('login');
        // const login = localStorage.getItem('login');
        const obj = JSON.parse(login);

        this._isMounted = true;
        const [user] = await trackPromise(Promise.all([
            Axios.get('/users/' + obj.id, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) =>
                    res.data.data
                )
        ]));


        if (user !== null) {
            if (this._isMounted) {
                this.setState({
                    name: user.name,
                    address: user.address,
                    phoneNumber: user.phoneNumber,
                    username: user.username,
                    password: user.password
                })
            }
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const login = window.sessionStorage.getItem('login');
        // const login = localStorage.getItem('login');
        const obj = JSON.parse(login);
        var data = {
            name: this.state.name,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            username: this.state.username,
            password: this.state.password
        };
        await trackPromise(Axios.put('/users/' + obj.id, data, {
            headers: {
                'Authorization': { AUTH }.AUTH
            }
        })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            }))
        var h = document.getElementById("beforeend");
        h.insertAdjacentHTML("beforeEnd", '<p className="textcolor" style="font-size: xxx-large;font-weight: bold;color:#b0b435;">Cập nhật thông tin thành công</p>');
        setTimeout(() => {
            h.querySelector(':last-child').remove();
            this.setState({
                done: true
            })
        }, 2000);
    }

    render() {
        return (
            <div>
                <Breadcumsection data={bc} />
                <div className="shop-detail-box-main">
                    <div className="container">
                        <div className="row" >
                            <h1 style={{ fontWeight: "bold" }}>Thông tin cá nhân</h1>
                        </div>
                        <div className="col-lg-12 col-sm-12">
                            <form className="form-group" onSubmit={(e) => this.onSubmit(e)}>
                                <div className="row">
                                    <div className="col-5">
                                        <label htmlFor="name"  >Tên</label>
                                        <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="name" value={this.state.name} required />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="phoneNumber"  >Số điện thoại</label>
                                        <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="phoneNumber" value={this.state.phoneNumber} required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="address"  >Địa chỉ</label>
                                        <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="address" value={this.state.address} required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <label htmlFor="username"  >Tài khoản</label>
                                        <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="username" value={this.state.username} required />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="password"  >Mật khẩu</label>
                                        <input onChange={(e) => this.onChange(e)} type="password" className="form-control" name="password" value={this.state.password} required />
                                    </div>
                                </div>
                                <div className="update-box pt-2">
                                    <input value="Cập nhật thông tin" type="submit" />
                                </div>
                            </form>
                            <LoadingIndicator/>
                            <div className="beforeend text-center" id="beforeend">

                            </div>
                        </div>
                        <Orderhistory />
                    </div>

                </div>

            </div>
        );
    }
}

export default personal;