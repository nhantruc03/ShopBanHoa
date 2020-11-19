import Axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { ChangeToSlug } from '../../../services/convertoslug'
import {AUTH} from '../../env'
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


        Axios.post('/newscategories', data, {
            headers: {
                'Authorization': { AUTH }.AUTH
            }
        })
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
                <Redirect to="/admin/listnewscategories" />
            )
        }
        else {
            return (
                <div >
                    <h1 className="text-center">Trang thêm danh mục tin tức</h1>
                    <div className="container-fluid">
                        <form className="form-group" onSubmit={(e) => this.onSubmit(e)}>
                            <label htmlFor="name"  >Tên danh mục tin tức</label>
                            <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="name" placeholder="Tên danh mục tin tức" required={true} />

                            <label htmlFor="metatitle"  >Meta Title</label>
                            <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="metatitle" placeholder="ten-danh-muc-tin-tuc" value={this.state.metatitle} required={true} />
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