import Axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Search from '../../search';
import TableData from '../../table';
const tablerow = ['Tên sản phẩm', 'Số lượng', 'Tổng']
const keydata = ['productId', 'quantity', 'price']
const obj = "order-details"
const getData = (id) =>
    Axios.post('/order-details/getAll', { orderId: id })
        .then((res) => {
            return res.data;
        })

class listorders extends Component {
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

    UNSAFE_componentWillMount() {
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
                    <h1 className='text-primary mb-3'>Chi tiết hóa đơn</h1>
                    <Search targetParent="productId" target="name" data={this.state.data} getSearchData={(e)=> this.getSearchData(e)}/>
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
            <p style={{ fontSize: '2rem', textAlign: "center" }}>Tông tiền:{this.state.total}</p>
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
                    <div className="container-fluid">
                        {this.printData(this.state.SearchData)}
                        {this.renderTotal()}
                        <button onClick={() => this.onDone()} className="btn btn-warning">Quay về</button>
                        <br />
                    </div>
                </div>
            );
        }
    }
}
export default listorders;