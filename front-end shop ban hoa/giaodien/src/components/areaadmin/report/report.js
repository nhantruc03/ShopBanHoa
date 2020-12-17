import Axios from 'axios';
import React, { Component } from 'react';
import Search from '../../search';
import TableData from '../../table';
import { AUTH } from '../../env'
import { trackPromise } from 'react-promise-tracker';
import NumberFormat from 'react-number-format';
const tablerow = ['Tên sản phẩm', 'Ngày mua', 'Số lượng', 'Giá']
const keydata = ['productId', 'createdAt', 'quantity', 'price']
const obj = "order-details"
const getData = async () =>
    await trackPromise(Axios.post('/order-details/getAll', {}, {
        headers: {
            'Authorization': { AUTH }.AUTH
        }
    })
        .then((res) => {
            return res.data;
        }))

class report extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            ReportData: null,
            SearchData: null,
            total: 0,
            currentPage: 1,
            postsPerPage: 10,
            listPage: [],
            day: '',
            month: '',
            year: ''
        }
    }

    async componentDidMount() {
        this._isMounted = true;
        if (this.state.data === null) {
            getData().then((res) => {
                var temp = res.data.reduce((prev, cur) => {
                    console.log(cur.createdAt)
                    const index = prev.findIndex(v => (v.productId._id === cur.productId._id && v.price === cur.price
                        && new Date(v.createdAt).getDate() === new Date(cur.createdAt).getDate()
                        && new Date(v.createdAt).getMonth() === new Date(cur.createdAt).getMonth()
                        && new Date(v.createdAt).getFullYear() === new Date(cur.createdAt).getFullYear()));
                    if (index === -1) {
                        prev.push(cur);
                    } else {
                        prev[index].quantity = Number(prev[index].quantity) + Number(cur.quantity);
                    }
                    return prev;
                }, [])

                this.setState({
                    data: temp,
                    ReportData: temp,
                    SearchData: temp
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

        this.getTotal();
    }
    onDelete = (e) => {
        this.setState({
            data: this.state.data.filter(o => o._id !== e)
        })
    }
    onChange = (e) => {
        if (e.target.name === "day") {
            if ((e.target.value >= 1 && e.target.value <= 31) || e.target.value === '') {
                this.setState({
                    [e.target.name]: e.target.value
                })


            }
        }
        else if (e.target.name === "month") {
            if ((e.target.value >= 1 && e.target.value <= 12) || e.target.value === '') {
                this.setState({
                    [e.target.name]: Number(e.target.value)
                })
            }
        }
        else if (e.target.name === "year") {
            if (e.target.value >= 1 || e.target.value === '') {
                this.setState({
                    [e.target.name]: e.target.value
                })
            }
        }
        else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }
    getlistpage = (ReportData) => {
        var listpage = [];
        for (let i = 1; i <= Math.ceil(ReportData.length / this.state.postsPerPage); i++) {
            listpage.push(i);
        }
        return listpage;
    }

    Report = () => {
        var data = [];

        this.state.data.forEach(e => {
            var temp = new Date(e.createdAt);
            if (this.state.day !== '') {
                if (this.state.month !== '' && this.state.year !== '') {
                    if (temp.getDate() === Number(this.state.day) && temp.getMonth() + 1 === Number(this.state.month) && temp.getFullYear() === Number(this.state.year)) {
                        data.push(e);
                    }
                }
                else if (this.state.month !== '') {
                    if (temp.getDate() === Number(this.state.day) && temp.getMonth() + 1 === Number(this.state.month)) {
                        data.push(e);
                    }
                }
                else if (this.state.year !== '') {
                    if (temp.getDate() === Number(this.state.day) && temp.getFullYear() === Number(this.state.year)) {
                        data.push(e);
                    }
                } else {
                    if (temp.getDate() === Number(this.state.day)) {
                        data.push(e);
                    }
                }
            }
            else if (this.state.month !== '') {
                if (this.state.year !== '') {
                    if (Number(this.state.month) === temp.getMonth() + 1 && Number(this.state.year) === temp.getFullYear()) {
                        data.push(e)
                    }
                }
                else {
                    if (Number(this.state.month) === temp.getMonth() + 1) {
                        data.push(e)
                    }
                }
            }
            else if (this.state.year !== '') {
                if (Number(this.state.year) === temp.getFullYear()) {
                    data.push(e)
                }
            }
        })

        if (this.state.day === '' && this.state.month === '' && this.state.year === '') {
            this.setState({
                ReportData: this.state.data,
                SearchData: this.state.data
            }, () => {
                this.getTotal();
            })
        } else {
            this.setState({
                ReportData: data,
                SearchData: data
            }, () => {
                this.getTotal();
            })
        }

    }

    printData = (ReportData) => {
        if (this.state.data !== null) {
            return (
                <div className='mt-5 text-center'>
                    <h1 className='text-primary mb-3'>Thống kê báo cáo</h1>

                    <div className="row">
                        <div className="col-3">
                            <input className='form-control' onChange={(e) => this.onChange(e)} type="number" name="day" min="1" max="31" placeholder="Ngày"></input>
                        </div>
                        <div className="col-3">
                            <input className='form-control' onChange={(e) => this.onChange(e)} type="number" name="month" min="1" max="12" placeholder="Tháng"></input>
                        </div>
                        <div className="col-3">
                            <input className='form-control' onChange={(e) => this.onChange(e)} type="number" name="year" min="1" placeholder="Năm"></input>
                        </div>
                        <div className="col-3">

                            <button onClick={this.Report} className="btn btn-success form-control" >Xem báo cáo</button>
                        </div>

                    </div>
                    <br></br>
                    <Search targetParent="productId" target="name" data={this.state.ReportData} getSearchData={(e) => this.getSearchData(e)} />
                    <TableData obj={obj} dataRow={tablerow} data={ReportData} keydata={keydata} onDelete={(e) => this.onDelete(e)} noaction={true} />

                    {this.renderTotal()}
                </div>
            )
        }
    }
    getTotal = () => {
        var total = 0;
        this.state.SearchData.forEach(o => {
            total += o.price * o.quantity;
        });
        this.setState({
            total: total
        })
    }

    renderTotal = () => {
        return (
            <p style={{ fontSize: '2rem', textAlign: "center" }}>Tổng tiền:<NumberFormat style={{fontSize:'2rem'}} value={this.state.total} displayType={'text'} thousandSeparator={true} prefix={'đ'} /></p>
        )
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

export default report;