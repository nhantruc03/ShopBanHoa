import Axios from 'axios';
import React, { Component } from 'react';
import TableData from '../../table';
import Pagination from '../../Pagination';
import Search from '../../search';
import { AUTH } from '../../env'
import { trackPromise } from 'react-promise-tracker';
// import { Redirect } from 'react-router-dom';
const tablerow = ['Tên người đặt', 'Tên người nhận', 'Số điện thoại người nhận', 'Địa chị người nhận', 'email', 'Trạng thái', 'Thao tác']
const keydata = ['customerId', 'shipname', 'shipmobile', 'shipaddress', 'shipemail', 'status']
const obj = "orders"

class listorders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            SearchData: [],
            currentPage: 1,
            postsPerPage: 10,
            listPage: []
        }
    }

    async componentDidMount() {
        this._isMounted = true;
        const [orders] = await trackPromise(Promise.all([
            Axios.post('/orders/getAll', {}, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) => {
                    return res.data.data;
                })
        ]));
        if (orders !== null) {
            if (this._isMounted) {
                this.setState({
                    data: orders,
                    SearchData: orders
                })
            }
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getCurData = (SearchData) => {
        var indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        var indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        return SearchData.slice(indexOfFirstPost, indexOfLastPost);
    }

    getSearchData = (data) => {
        this.setState({
            SearchData: data
        })
    }

    paginate = (pageNumber) => {
        this.setState(
            {
                currentPage: pageNumber
            });
    }

    onDelete = (e) => {
        this.setState({
            data: this.state.data.filter(o => o._id !== e),
            SearchData: this.state.data.filter(o => o._id !== e)
        })
    }

    onUpdate = async (e) => {
        var status = !e.status;


        var data = {
            status: !e.status
        }
        const [orders] = await trackPromise(Promise.all([
            Axios.put('/orders/' + e._id, data, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) => {
                    return res.data.data;
                })
        ]));
        if (orders !== null) {
            if (this._isMounted) {
                this.setState({
                    data: this.state.data.map(el => (el._id === e._id ? { ...el, status } : el)),
                    SearchData: this.state.SearchData.map(el => (el._id === e._id ? { ...el, status } : el))
                })
            }
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    getlistpage = (SearchData) => {
        var listpage = [];
        for (let i = 1; i <= Math.ceil(SearchData.length / this.state.postsPerPage); i++) {
            listpage.push(i);
        }
        return listpage;
    }

    printData = (SearchData) => {
        if (this.state.data !== null) {
            return (
                <div className='mt-5 text-center'>
                    <h1 className='text-primary mb-3'>Danh sách hóa đơn</h1>
                    <Search target="shipname" data={this.state.data} getSearchData={(e) => this.getSearchData(e)} />
                    <TableData obj={obj} update={true} dataRow={tablerow} data={this.getCurData(SearchData)} keydata={keydata} onDelete={(e) => this.onDelete(e)} onUpdate={(e) => this.onUpdate(e)} review={true} />
                    <Pagination
                        postsPerPage={this.state.postsPerPage}
                        totalPosts={this.getlistpage(SearchData)}
                        paginate={(e) => this.paginate(e)}
                    />
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <div className="container-fluid">
                    {this.printData(this.state.SearchData)}
                </div>

            </div>
        );

    }
}
export default listorders;