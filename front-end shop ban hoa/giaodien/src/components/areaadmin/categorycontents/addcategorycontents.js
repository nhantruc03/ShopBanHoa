import Axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { ChangeToSlug } from '../../../services/convertoslug'

class addcategorycontent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            metatitle: '',
            isDone: false
        }
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
            metatitle: this.state.metatitle
        };


        Axios.post('/categorycontents', data)
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

    render() {
        if (this.state.isDone) {
            return (
                <Redirect to="/admin/listcategorycontents" />
            )
        }
        else {
            return (
                <div >
                    <h1 className="text-center">Trang thêm loại danh mục sản phẩm</h1>
                    <div className="container-fluid">
                        <form className="form-group" onSubmit={(e) => this.onSubmit(e)}>
                            <label htmlFor="name"  >Tên loại danh mục sản phẩm</label>
                            <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="name" placeholder="Tên sản phẩm" required={true} />

                            <label htmlFor="metatitle"  >Meta Title</label>
                            <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="metatitle" placeholder="ten-san-pham" value={this.state.metatitle} required={true} />
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

export default addcategorycontent;