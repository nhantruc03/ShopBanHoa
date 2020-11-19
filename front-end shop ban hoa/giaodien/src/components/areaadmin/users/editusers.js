import Axios from 'axios';
import React, { Component } from 'react';
import Select from 'react-select';
import { Redirect } from 'react-router-dom'
import {AUTH} from '../../env'
var Roles = [
    { value: 'admin', label: 'Quản trị viên' },
    { value: 'client', label: 'Khách hàng' }
];
class editusers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            phoneNumber: '',
            role: '',
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

    onSubmit = (e) => {
        e.preventDefault();
        var data = {
            name: this.state.name,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            role: this.state.role
        }
        Axios.put('/users/' + this.props.match.params.id, data, {
            headers: {
                'Authorization': { AUTH }.AUTH
            }
        })
            .then(res => {
                this.onDone();
            })
            .catch(err => {
                console.log(err);
            })
    }

    onDone = () => {
        this.setState({
            isDone: !this.state.isDone
        })
    }

    componentDidMount() {
        let temp = null;
        if (this.props.match.params.id) {
            Axios.get('/users/' + this.props.match.params.id, {
                params: {
                    role: 'admin'
                }
            }, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) => {
                    temp = res.data.data;
                    console.log(temp)
                    this.setState({
                        name: temp.name,
                        address: temp.address,
                        phoneNumber: temp.phoneNumber,
                        role: temp.role
                    })
                    this.setState({
                        isLoad: false
                    })
                })
        }
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
                    <h1 className="text-center">Trang sửa danh mục</h1>
                    <div className="container-fluid">
                        <form className="form-group" onSubmit={(e) => this.onSubmit(e)}>
                            <label htmlFor="name"  >Tên người dùng</label>
                            <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="name" placeholder="Tên người dùng" value={this.state.name} required={true} />
                            <label htmlFor="address">Địa chỉ</label>
                            <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="address" placeholder="Địa chỉ" required={true}  value={this.state.address}/>
                            <label htmlFor="phoneNumber"  >Số điện thoại</label>
                            <input onChange={(e) => this.onChange(e)} type="number" className="form-control" name="phoneNumber" placeholder="Số điện thoại" required={true} value={this.state.phoneNumber}/>
                            <label htmlFor="role"  >Chức vụ</label>
                            <Select
                                onChange={(e) => this.onSelect(e)}
                                value={Roles.filter(({ value }) => value === this.state.role)}
                                options={Roles}
                            />
                            <br />
                            <button type="submit" className="btn btn-success">Sửa</button>
                        &nbsp;
                        <button onClick={() => this.onDone()} className="btn btn-warning">Quay về</button>
                        </form>
                    </div>
                </div>
            );
        }
    }
}

export default editusers;