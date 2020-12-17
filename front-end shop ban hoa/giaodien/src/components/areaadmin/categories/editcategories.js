import Axios from 'axios';
import React, { Component } from 'react';
import Select from 'react-select';
import { Redirect } from 'react-router-dom'
import { ChangeToSlug } from '../../../services/convertoslug'
import { AUTH } from '../../env'
import { trackPromise } from 'react-promise-tracker';
var CategorycontentsID = [];
class editcategory extends Component {
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

    onSubmit = async (e) => {
        e.preventDefault();
        var data = {
            name: this.state.name,
            metatitle: this.state.metatitle,
            categorycontentsId: this.state.categorycontentsId
        }

        await trackPromise(Axios.put('/categories/' + this.props.match.params.id, data, {
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
        )
    }

    onDone = () => {
        this.setState({
            isDone: !this.state.isDone
        })
    }

    async componentDidMount() {
        let temp = null;
        if (this.props.match.params.id) {
            await trackPromise(Axios.get('/categories/' + this.props.match.params.id, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) => {
                    temp = res.data.data;
                    this.setState({
                        name: temp.name,
                        metatitle: temp.metatitle,
                        categorycontentsId: temp.categorycontentsId
                    })
                })
            )

            var temp2 = null;

            var data = {
                isDeleted: false
            }

            await trackPromise(Axios.post('/categorycontents/getAll', data, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) => {
                    temp2 = res.data.data;
                    CategorycontentsID = [];
                    temp2.forEach(o => {
                        var object = {
                            value: o._id,
                            label: o.name
                        }
                        CategorycontentsID.push(object);
                    })
                    this.setState({
                        isLoad: false
                    })
                }))
        }
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
                    <h1 className="text-center">Trang sửa danh mục</h1>
                    <div className="container-fluid">
                        <form className="form-group" onSubmit={(e) => this.onSubmit(e)}>
                            <label htmlFor="name"  >Tên danh mục</label>
                            <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="name" placeholder="Tên danh mục" required={true} value={this.state.name} />

                            <label htmlFor="metatitle"  >Meta Title</label>
                            <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="metatitle" placeholder="ten-danh-muc" value={this.state.metatitle} />

                            <label htmlFor="categorycontentsId"  >Loại danh mục</label>
                            <Select
                                name="categorycontentsId"
                                onChange={(e) => this.onSelect(e)}
                                value={CategorycontentsID.filter(({ value, label }) => this.state.categorycontentsId.includes(value))}
                                options={CategorycontentsID}
                            />
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

export default editcategory;