import Axios from 'axios';
import React, { Component } from 'react';
import TableData from '../../table';
import Pagination from '../../Pagination';
// import { Redirect } from 'react-router-dom';
const tablerow = [ 'Tên người đặt','Tên người nhận', 'Số điện thoại người nhận', 'Địa chị người nhận', 'email', 'Thao tác']
const keydata = ['customerId','shipname', 'shipmobile', 'shipaddress', 'shipemail']
const obj = "orders"
const getData = () =>
    Axios.post('/orders/getAll')
        .then((res) => {
            console.log(res.data);
            return res.data;
        })

class listorders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            currentPage: 1,
            postsPerPage: 10,
            listPage: [],
            search: ''
        }
    }

    UNSAFE_componentWillMount() {
        if (this.state.data === null) {
            getData().then((res) => {
                this.setState({
                    data: res.data
                });
            })
        }
    }

    getCurData = (ketqua) => {
        var indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        var indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        return ketqua.slice(indexOfFirstPost, indexOfLastPost);

    }

    paginate = (pageNumber) => {
        this.setState(
            {
                currentPage: pageNumber
            });
    }

    onDelete = (e) => {
        this.setState({
            data: this.state.data.filter(o => o._id !== e)
        })
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    getlistpage = (ketqua) => {
        var listpage = [];
        for (let i = 1; i <= Math.ceil(ketqua.length / this.state.postsPerPage); i++) {
            listpage.push(i);
        }
        return listpage;
    }

    printData = (ketqua) => {
        if (this.state.data !== null) {
            return (
                <div className='mt-5 text-center'>
                    <h1 className='text-primary mb-3'>Danh sách hóa đơn</h1>
                    <input onChange={(e) => this.onChange(e)} name="search" id="search" style={{ textAlign: "center" }} className="form-control" type="text" placeholder="Tìm kiếm" />
                    <TableData obj={obj} dataRow={tablerow} data={this.getCurData(ketqua)} keydata={keydata} onDelete={(e) => this.onDelete(e)} review={true}/>

                    <Pagination
                        postsPerPage={this.state.postsPerPage}
                        totalPosts={this.getlistpage(ketqua)}
                        paginate={(e) => this.paginate(e)}
                    />
                </div>
            )
        }
    }

    render() {
        var ketqua = [];
        if (this.state.data != null) {
            this.state.data.forEach((item) => {
                if (item.shipname.toString().toLowerCase().indexOf(this.state.search) !== -1) {
                    ketqua.push(item);
                }
            })
        }
        return (
            <div>
                <div className="container-fluid">

                    {this.printData(ketqua)}
                </div>

            </div>
        );

    }
}
export default listorders;