import Axios from 'axios';
import React, { Component } from 'react';
// import Select from 'react-select';
import { Redirect } from 'react-router-dom'
import MultiImageInput from 'react-multiple-image-input';
import {AUTH} from './../../env';
// const trangthai = [
//     { value: false, label: 'Khả dụng' },
//     { value: true, label: 'Không khả dụng' }
// ]

const crop = {
    unit: '%',
    aspect: 4 / 3,
    width: '100'
};

class addbanners extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            link: '',
            image: {},
            isDone: false
        }
    }
    setImages = (imageUpdate) => {
        this.setState({ image: imageUpdate })
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        var data = new FormData();

        data.append("name", this.state.name);
        data.append("link", this.state.link);
        if (this.state.image[0] !== null) {

            data.append("image", this.state.image[0]);
        }
        Axios.post('/banners/', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
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
                <Redirect to="/admin/listbanners" />
            )
        }
        else {
            return (
                <div >
                    <h1 className="text-center">Trang thêm Banner</h1>
                    <div className="container-fluid">
                        <form className="form-group" onSubmit={(e) => this.onSubmit(e)}>
                            <label htmlFor="name"  >Tên Banner</label>
                            <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="name" placeholder="Tên Banner" required={true} />

                            <label htmlFor="link"  >Đường dẫn</label>
                            <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="link" placeholder="ten-banner" />

                            <label htmlFor="image"  >Hình đại diện</label>
                            <MultiImageInput
                                max={1}
                                theme="light"
                                images={this.state.image}
                                setImages={(e) => this.setImages(e)}
                                cropConfig={{ crop, ruleOfThirds: true }}
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

export default addbanners;