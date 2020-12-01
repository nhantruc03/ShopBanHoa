import Axios from 'axios';
import React, { Component } from 'react';
import TableData from './TableData';
import Pagination from '../../Pagination';
import Search from '../../search';
import { AUTH } from '../../env';
import { trackPromise } from 'react-promise-tracker';
// import { Redirect } from 'react-router-dom';
const tablerow = ["Ngày đặt",'Tên người nhận', 'SĐT', 'Địa chỉ', 'Email', 'Thao tác']
const keydata = ['createdAt','shipname', 'shipmobile', 'shipaddress', 'shipemail']
const obj = "orders"
class order_history extends Component {
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
        const login = localStorage.getItem('login');
        const obj = JSON.parse(login);
        const [orders] = await trackPromise(Promise.all([
            Axios.post('/orders/getAll', {customerId: obj.id}, {
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
                    <div className="row" >
                        <h1 style={{ fontWeight: "bold" }}>Danh sách hóa đơn</h1>
                    </div>
                    <Search target="shipname" data={this.state.data} getSearchData={(e) => this.getSearchData(e)} />
                    <TableData obj={obj} dataRow={tablerow} data={this.getCurData(SearchData)} keydata={keydata} onDelete={(e) => this.onDelete(e)} review={true} />

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

export default order_history;