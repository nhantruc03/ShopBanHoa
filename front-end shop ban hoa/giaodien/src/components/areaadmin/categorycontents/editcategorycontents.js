import Axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { ChangeToSlug } from '../../../services/convertoslug'
import {AUTH} from '../../env'
class editcategorycontent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            metatitle: '',
            // isDeleted: true,
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
        var data= {
            name: this.state.name,
            metatitle: this.state.metatitle,
            isDeleted: this.state.isDeleted
        }
        Axios.put('/categorycontents/' + this.props.match.params.id, data, {
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

    componentDidMount() {
        let temp = null;
        if (this.props.match.params.id) {
            Axios.get('/categorycontents/' + this.props.match.params.id, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) => {
                    temp = res.data.data;
                    this.setState({
                        name: temp.name,
                        metatitle: temp.metatitle,
                        isDeleted: temp.isDeleted

                    })
                })

        }
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
                    <h1 className="text-center">Trang sửa loại danh mục</h1>
                    <div className="container-fluid">
                        <form className="form-group" onSubmit={(e) => this.onSubmit(e)}>
                            <label htmlFor="name"  >Tên danh mục</label>
                            <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="name" placeholder="Tên danh mục" required={true} value={this.state.name} />

                            <label htmlFor="metatitle"  >Meta Title</label>
                            <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="metatitle" placeholder="ten-danh-muc" value={this.state.metatitle} />

                            <br />
                            <button type="submit" className="btn btn-success">Sửa</button>
                        &nbsp;
                        <button onClick={() => this.onDone()} className="btn btn-warning">Quay về</button>
                        </form>
                    </div>
                </div>
            );
        }
    }
}

export default editcategorycontent;