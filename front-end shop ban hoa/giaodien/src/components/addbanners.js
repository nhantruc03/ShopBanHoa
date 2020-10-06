import Axios from 'axios';
import React, { Component } from 'react';
import Select from 'react-select';
import { Redirect } from 'react-router-dom'
import MultiImageInput from 'react-multiple-image-input';
const trangthai = [
    { value: 'true', label: 'Khả dụng' },
    { value: 'false', label: 'Không khả dụng' }
]

const crop = {
    unit: '%',
    aspect: 4 / 3,
    width: '100'
};

class addbanners extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            Link: '',
            Image: {},
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

    setImages = (imageUpdate) => {
        this.setState({ Image: imageUpdate })
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        var data = new FormData();

        data.append("Name", this.state.Name);
        data.append("Link", this.state.Link);
        data.append('Status', this.state.Status);
        if (this.state.Image[0] !== null) {

            data.append("Image", this.state.Image[0]);
        }
        Axios.post('/banners/add', data, {
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
    onDone = () => {
        this.setState({
            isDone: !this.state.isDone
        })
    }
    render() {
        if (this.state.isDone) {
            return (
                <Redirect to="/listbanners" />
            )
        }
        else {
            return (
                <div >
                    <h1 className="text-center">Trang thêm Banner</h1>
                    <div className="container-fluid">
                        <form className="form-group" onSubmit={(e) => this.onSubmit(e)}>
                            <label htmlFor="Name"  >Tên Banner</label>
                            <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="Name" placeholder="Tên Banner" required={true} />

                            <label htmlFor="Link"  >Đường dẫn</label>
                            <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="Link" placeholder="ten-banner" />

                            <label htmlFor="Image"  >Hình đại diện</label>
                            <MultiImageInput
                                max={1}
                                theme="light"
                                images={this.state.Image}
                                setImages={(e) => this.setImages(e)}
                                cropConfig={{ crop, ruleOfThirds: true }}
                            />

                            <label htmlFor="Status"  >Trạng thái</label>
                            <Select onChange={(e) => this.onSelectStatus(e)} name="Status" options={trangthai} />
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