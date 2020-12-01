import Axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Search from '../../search';
import TableData from './TableData';
import { AUTH } from '../../env'
import Breadcumsection from '../breadcumsection';
const tablerow = ['Tên sản phẩm', 'Số lượng', 'Giá']
const keydata = ['productId', 'quantity', 'price']
const obj = "order-details"
const bc = [
    {
        name: "Thông tin cá nhân",
        link: "/personal"
    }, {
        name: "Lịch sử mua hàng",
        link: "/"
    }
]
const getData = (id) =>
    Axios.post('/order-details/getAll', { orderId: id }, {
        headers: {
            'Authorization': { AUTH }.AUTH
        }
    })
        .then((res) => {
            return res.data;
        })

class orderdetails_history extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            SearchData: null,
            total: 0,
            currentPage: 1,
            postsPerPage: 10,
            listPage: []
        }
    }

    async componentDidMount() {
        this._isMounted = true;
        if (this.state.data === null) {
            getData(this.props.match.params.id).then((res) => {

                this.setState({
                    data: res.data,
                    SearchData: res.data
                });
                this.getTotal();
            })
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    paginate = (pageNumber) => {
        this.setState(
            {
                currentPage: pageNumber
            });
    }
    getSearchData = (data) => {
        this.setState({
            SearchData: data
        })
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
                    <h1 className='mb-3' style={{fontWeight:"bold"}}>Chi tiết hóa đơn</h1>
                  
                    <Search targetParent="productId" target="name" data={this.state.data} getSearchData={(e) => this.getSearchData(e)} />
                    <TableData obj={obj} dataRow={tablerow} data={SearchData} keydata={keydata} onDelete={(e) => this.onDelete(e)} noaction={true} />
                </div>
            )
        }
    }
    onDone = () => {
        this.setState({
            isDone: true
        })
    }
    getTotal = () => {
        var total = 0;
        this.state.data.forEach(o => {
            total += o.price;
        });
        this.setState({
            total: total
        })
    }

    renderTotal = () => {
        return (
            <p style={{ fontSize: '2rem', textAlign: "center" }}>Tổng tiền : {this.state.total}</p>
        )
    }

    render() {
        if (this.state.isDone) {
            return (
                <Redirect to="/admin/listorders" />
            )
        } else {
            return (
                <div>
                    <Breadcumsection data={bc} />
                    <div className="container-fluid">
                        {this.printData(this.state.SearchData)}
                        {this.renderTotal()}
                        <br />
                    </div>
                </div>
            );
        }
    }
}

export default orderdetails_history;