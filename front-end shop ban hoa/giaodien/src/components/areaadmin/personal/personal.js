import React, { Component } from 'react';
import { AUTH } from '../../env'
import Axios from 'axios';
import { trackPromise } from 'react-promise-tracker';
class personal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            phoneNumber: '',
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

    onSubmit = async (e) => {
        e.preventDefault();
        const login = localStorage.getItem('login');
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
    }

    onDone = () => {
        this.setState({
            isDone: !this.state.isDone
        })
    }

    async componentDidMount() {
        const login = localStorage.getItem('login');
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

    goBack = () => {
        this.props.history.goBack();
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="container-fluid">
                    <div className="container-fluid mt-3">
                        <div className="row">
                            <div className="col-12">
                                <div className="section">
                                    <li className="fas fa-user"></li> Thông tin
                                </div>
                                <div className="row mt-3">
                                    <div className="col-7">
                                        <label htmlFor="username"  >Tài khoản</label>
                                        <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="username" placeholder="Tài khoản" value={this.state.username} required={true} />
                                    </div>
                                    <div className="col-5">
                                        <label htmlFor="name"  >Tên</label>
                                        <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="name" placeholder="Tên người dùng" value={this.state.name} required={true} />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-7">
                                        <label htmlFor="phoneNumber"  >Điện thoại</label>
                                        <input onChange={(e) => this.onChange(e)} type="number" className="form-control" name="phoneNumber" placeholder="Eg. 0919385172" value={this.state.phoneNumber} required={true} />
                                    </div>
                                    <div className="col-5">
                                        <label htmlFor="address">Địa chỉ</label>
                                        <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="address" placeholder="Eg. 37/10BIS" value={this.state.address} required={true} />
                                    </div>
                                </div>
                                <hr></hr>
                                <label htmlFor="password"  >Mật khẩu</label>
                                <input onChange={(e) => this.onChange(e)} type="password" className="form-control" name="password" placeholder="Mật khẩu" value={this.state.password} required={true} />
                                <br></br>
                            </div>

                            <div className="col-1"></div>
                            <button type="submit" className="btn btn-success form-control">Sửa</button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default personal;