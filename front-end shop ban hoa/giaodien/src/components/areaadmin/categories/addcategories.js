import Axios from 'axios';
import React, { Component } from 'react';
import Select from 'react-select';
import { Redirect } from 'react-router-dom'
import { ChangeToSlug } from '../../../services/convertoslug'
var CategorycontentsID = [];
class addcategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            metatitle: '',
            categorycontentsId: '',
            isDone: false
        }
    }

    onSelect = (e) => {
        this.setState({
            categorycontentsId: e.value
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        if (e.target.name === 'name') {
            this.setState({
                metatitle: ChangeToSlug(e.target.value)
            })
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        var data = {
            name: this.state.name,
            metatitle: this.state.metatitle,
            categorycontentsId:this.state.categorycontentsId
        };


        Axios.post('/categories', data)
            .then(res => {
                this.onDone();
            })
            .catch(err => {
                console.log(err);
            })
    }

    onDone = () => {
        this.setState({
            isDone: !this.state.isDone
        })
    }

    componentDidMount() {
        this.setState({
            isLoad: true
        })
        let temp = null;

        var data = {
            isDeleted: false
        };
        Axios.post('/categorycontents/getAll', data)
            .then((res) => {
                temp = res.data.data;
                CategorycontentsID = [];
                temp.forEach(o => {
                    var object = {
                        value: o._id,
                        label: o.name
                    }
                    CategorycontentsID.push(object);
                })
                this.setState({
                    isLoad: false
                })
            })
    }

    render() {
        if (this.state.isDone) {
            return (
                <Redirect to="/admin/listcategories" />
            )
        }
        else {
            return (
                <div >
                    <h1 className="text-center">Trang thêm danh mục sản phẩm</h1>
                    <div className="container-fluid">
                        <form className="form-group" onSubmit={(e) => this.onSubmit(e)}>
                            <label htmlFor="name"  >Tên danh mục sản phẩm</label>
                            <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="name" placeholder="Tên sản phẩm" required={true} />

                            <label htmlFor="metatitle"  >Meta Title</label>
                            <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="metatitle" placeholder="ten-san-pham" value={this.state.metatitle} required={true} />

                            <label htmlFor="categorycontentsId"  >Loại danh mục</label>
                            <Select
                                name="categorycontentsId"
                                onChange={(e) => this.onSelect(e)}
                                options={CategorycontentsID}
                            />
                            <br />
                            <button type="submit" className="btn btn-success">Thêm</button>
                        &nbsp;
                        <button onClick={() => this.onDone()} className="btn btn-warning">Quay về</button>
                        </form>

                    </div>
                </div>
            );
        }
    }
}

export default addcategory;