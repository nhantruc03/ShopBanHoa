import Axios from 'axios';
import React, { Component } from 'react';
import Select from 'react-select';
import { Redirect } from 'react-router-dom'
const trangthai = [
    { value: 'true', label: 'Khả dụng' },
    { value: 'false', label: 'Không khả dụng' }
]

class addproduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            MetaTitle: '',
            Status: true,
            isDone: false
        }
    }

    onSelectStatus = (e) => {
        if (e.value === 'true') {
            this.setState({
                Status: true
            })
        }
        else {
            this.setState({
                Status: false
            })
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        var data = new FormData();

        data.append("Name", this.state.Name);
        data.append("MetaTitle",this.state.MetaTitle);
        data.append('Status',this.state.Status);
       
        Axios.post('/categories/add', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                console.log(res);
                this.onDone();
            })
            .catch(err => {
                console.log(err);
            })
    }

    onDone= () =>{
        this.setState({
            isDone: ! this.state.isDone
        })
    }

    render() {
        if (this.state.isDone) {
            return (
                <Redirect to="/listcategories" />
            )
        }
        else {
            return (
                <div >
                    <h1 className="text-center">Trang thêm sản phẩm</h1>
                    <div className="container-fluid">
                        <form className="form-group" onSubmit={(e) => this.onSubmit(e)}>
                            <label htmlFor="Name"  >Tên sản phẩm</label>
                            <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="Name" placeholder="Tên sản phẩm" required={true} />

                            <label htmlFor="MetaTitle"  >Meta Title</label>
                            <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="MetaTitle" placeholder="ten-san-pham" />

                            <label htmlFor="Status"  >Trạng thái</label>
                            <Select onChange={(e) => this.onSelectStatus(e)} name="Status" options={trangthai} />
                            <br />
                            <button type="submit" className="btn btn-success">Thêm</button>
                        &nbsp;
                        <button onClick={()=>this.onDone()} className="btn btn-warning">Quay về</button>
                        </form>

                    </div>
                </div>
            );
        }
    }
}

export default addproduct;
