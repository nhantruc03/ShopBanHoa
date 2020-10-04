import Axios from 'axios';
import React, { Component } from 'react';
import TableData from './table';
import Pagination from './Pagination';
import { Redirect } from 'react-router-dom';
const tablerow = ['Tên', 'MetaTitle', 'Ảnh đại diện', 'Mô tả', 'Thao tác']
const keydata = ['Name', 'MetaTitle', 'Image', 'Description']
const obj="products"



const getData = () =>
    Axios.get('http://localhost:9000/products/list')
        .then((res) => res.data)

class listproducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            currentPage: 1,
            postsPerPage: 10,
            listPage: [],
            loading: false,
            onAdd: false
        }
    }

    UNSAFE_componentWillMount() {
        if (this.state.data === null) {
            getData().then((res) => {
                this.setState({
                    data: res
                });
            })
        }
    }

    getCurData = () => {
        var indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        var indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        return this.state.data.slice(indexOfFirstPost, indexOfLastPost);

    }

    paginate = (pageNumber) => {
        this.setState(
            {
                currentPage: pageNumber
            });
    }

    onAddClick = () => {
        this.setState({
            onAdd:true
        })
    }

    onDelete = (e)=>{
        this.setState({
            data: this.state.data.filter(o => o._id !== e)
        })
    }

    printData = () => {
        if (this.state.data !== null) {
            return (
                <div className='mt-5 text-center'>
                    <h1 className='text-primary mb-3'>Danh sách sản phẩm</h1>
                    <TableData obj={obj} dataRow={tablerow} data={this.getCurData()} keydata={keydata}  onDelete={(e) => this.onDelete(e)}/>

                    <Pagination
                        postsPerPage={this.state.postsPerPage}
                        totalPosts={this.state.data.length}
                        paginate={(e) => this.paginate(e)}
                    />
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
                        {this.printData()}
                    </div>

                </div>
            );
        }
        else {
            return (
                <Redirect to={"/addproducts/"} />
            )
        }
    }
}
export default listproducts;