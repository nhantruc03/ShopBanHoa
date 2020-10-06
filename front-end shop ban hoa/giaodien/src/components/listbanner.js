import Axios from 'axios';
import React, { Component } from 'react';
import TableData from './table';
import Pagination from './Pagination';
import { Redirect } from 'react-router-dom';
const tablerow = ['Tên', 'Đường dẫn', 'Hình ảnh','Trạng thái', 'Thao tác']
const keydata = ['Name', 'Link', 'Image','Status']
const obj = "banners"

const getData = () =>
    Axios.get('http://localhost:9000/banners/list')
        .then((res) => res.data)

class listbanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            currentPage: 1,
            postsPerPage: 10,
            listPage: [],
            search: '',
            loading: false
        }
    }
    UNSAFE_componentWillMount() {
        if (this.state.data === null) {
            getData().then((res) => {
                this.setState({
                    data: res
                });
                console.log(this.state.data);
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

    onAddClick = () => {
        this.setState({
            onAdd: true
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
                    <h1 className='text-primary mb-3'>Danh sách banner</h1>
                    <input onChange={(e) => this.onChange(e)} name="search" id="search" style={{ textAlign: "center" }} className="form-control" type="text" placeholder="Tìm kiếm" />
                    <TableData obj={obj} dataRow={tablerow} data={this.getCurData(ketqua)} keydata={keydata} onDelete={(e) => this.onDelete(e)} />

                    <Pagination
                        postsPerPage={this.state.postsPerPage}
                        totalPosts={this.getlistpage(ketqua)}
                        paginate={(e) => this.paginate(e)}
                    />
                    <div onClick={() => this.onAddClick()} className="btn btn-block btn-success"><i className="fa fa-edit" />Thêm</div>

                </div>
            )
        }else{
            return(
                <div className='mt-5 text-center'>
                <h1 className='text-primary mb-3'>Danh sách banner</h1>
              
                <div onClick={() => this.onAddClick()} className="btn btn-block btn-success"><i className="fa fa-edit" />Thêm</div>

            </div>
            )
        }
    }
    render() {
        var ketqua = [];
        if (this.state.data != null) {
            this.state.data.forEach((item) => {
                if (item.Name.toString().toLowerCase().indexOf(this.state.search) !== -1) {
                    ketqua.push(item);
                }
            })
        }
        if (!this.state.onAdd) {
            return (
                <div>
                    <div className="container-fluid">

                        {this.printData(ketqua)}
                    </div>

                </div>
            );
        }
        else {
            return (
                <Redirect to={"/addbanners/"} />
            )
        }
    }
}

export default listbanner;