import Axios from 'axios';
import React, { Component } from 'react';
import TableData from '../../table';
import Pagination from '../../Pagination';
import { Redirect } from 'react-router-dom';
import Search from '../../search';
import {AUTH} from '../../env'
import { trackPromise } from 'react-promise-tracker';
const tablerow = ['Tên', 'MetaTitle', 'Ảnh đại diện', 'Mô tả', 'Thao tác']
const keydata = ['name', 'metatitle', 'image', 'detail']
const obj = "products"

const getData = async () =>
    await trackPromise(Axios.post('/products/getAll', {
        headers: {
            'Authorization': { AUTH }.AUTH
        }
    })
        .then((res) => res.data))

class listproducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            SearchData: null,
            currentPage: 1,
            postsPerPage: 3,
            listPage: [],
            onAdd: false
        }
    }

    UNSAFE_componentWillMount() {
        if (this.state.data === null) {
            getData().then((res) => {
                this.setState({
                    data: res.data,
                    SearchData: res.data
                });
            })
        }
    }

    getCurData = (SearchData) => {
        var indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        var indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        return SearchData.slice(indexOfFirstPost, indexOfLastPost);

    }

    getSearchData = (data) =>{
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

    onAddClick = () => {
        this.setState({
            onAdd: true
        })
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
                    <h1 className='text-primary mb-3'>Danh sách sản phẩm</h1>
                    <Search target="name" data={this.state.data} getSearchData={(e)=> this.getSearchData(e)}/>
                    <TableData obj={obj} dataRow={tablerow} data={this.getCurData(SearchData)} keydata={keydata} onDelete={(e) => this.onDelete(e)}/>
                    <Pagination postsPerPage={this.state.postsPerPage} totalPosts={this.getlistpage(SearchData)} paginate={(e) => this.paginate(e)}/>
                    <div onClick={() => this.onAddClick()} className="btn btn-block btn-success"><i className="fa fa-edit" />Thêm
                
            </div>
                </div>
            )
        }else{
            return(
                <div className='mt-5 text-center'>
                <h1 className='text-primary mb-3'>Danh sách sản phẩm</h1>
                <div onClick={() => this.onAddClick()} className="btn btn-block btn-success"><i className="fa fa-edit" />Thêm</div>
            </div>
            )
        }
    }

    render() {
        if (!this.state.onAdd) {
            return (
                <div>
                    <div className="container-fluid">
                        {this.printData(this.state.SearchData)}
                    </div>
                </div>
            );
        }
        else {
            return (
                <Redirect to={"/admin/addproducts/"} />
            )
        }
    }
}
export default listproducts;