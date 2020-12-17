import Axios from 'axios';
import React, { Component } from 'react';
import Select from 'react-select';
import { Redirect } from 'react-router-dom'
import {AUTH} from '../../env'
import { trackPromise } from 'react-promise-tracker';
var Roles = [
    { value: 'admin', label: 'Quản trị viên' },
    { value: 'client', label: 'Khách hàng' }
];
class addusers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            phoneNumber: '',
            role: 'client',
            username: '',
            password: '',
            isDone: false
        }
    }

    onSelect = (e) => {
        this.setState({
            role: e.value
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = async (e) => {
        e.preventDefault();
        var data = {
            name: this.state.name,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            username: this.state.username,
            password: this.state.password,
            role: this.role
        };
        await trackPromise(Axios.post('/users', data, {
            headers: {
                'Authorization': { AUTH }.AUTH
            }
        })
            .then(res => {
                this.onDone();
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

    componentDidMount() {
        this.setState({
            isLoad: true
        })
        this.setState({
            isLoad: false
        })
    }

    render() {
        if (this.state.isDone) {
            return (
                <Redirect to="/admin/listusers" />
            )
        }
        else {
            return (
                <div >
                    <h1 className="text-center">Trang thêm người dùng</h1>
                    <div className="container-fluid">
                        <form className="form-group" onSubmit={(e) => this.onSubmit(e)}>
                            <label htmlFor="name"  >Tên người dùng</label>
                            <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="name" placeholder="Tên người dùng" required={true} />
                            <label htmlFor="address">Địa chỉ</label>
                            <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="address" placeholder="Địa chỉ" required={true} />
                            <label htmlFor="phoneNumber"  >Số điện thoại</label>
                            <input onChange={(e) => this.onChange(e)} type="number" className="form-control" name="phoneNumber" placeholder="Số điện thoại" required={true} />
                            <label htmlFor="username"  >Tên tài khoản</label>
                            <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="username" placeholder="Tài khoản" required={true} />
                            <label htmlFor="password"  >Mật khẩu</label>
                            <input onChange={(e) => this.onChange(e)} type="password" className="form-control" name="password" placeholder="Mật khẩu" required={true} />
                            <label htmlFor="role"  >Chức vụ</label>
                            <Select
                                onChange={(e) => this.onSelect(e)}
                                defaultValue={Roles[1]}
                                options={Roles}
                            />
                            <br />
                            <button type="submit" className="btn btn-success">Thêm</button>
                        &nbsp;
                        <button onClick={() => this.onDone()} className="btn btn-warning">Quay về</button>
                        </form>

                    </div>
                </div>
            );
        }
    }
}

export default addusers;