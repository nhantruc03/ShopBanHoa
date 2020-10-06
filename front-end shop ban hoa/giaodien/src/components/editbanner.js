import Axios from 'axios';
import React, { Component } from 'react';
import Select from 'react-select';
import { Redirect } from 'react-router-dom'
import MultiImageInput from 'react-multiple-image-input';
import Image from './image'
const trangthai = [
    { value: true, label: 'Khả dụng' },
    { value: false, label: 'Không khả dụng' }
]

const crop = {
    unit: '%',
    aspect: 4 / 3,
    width: '100'
};

class editbanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldImage: '',
            Name: '',
            Link: '',
            Image: {},
            Status: true,
            isDone: false
        }
    }
    getData = () =>
        Axios.get('http://localhost:9000/banners/edit/' + this.props.match.params.id)
            .then((res) => {
                console.log(res.data[0])
                this.setState({
                    data: res.data[0]
                })
            })

    setImages = (imageUpdate) => {
        this.setState({ Image: imageUpdate })
    };

    onSelectStatus = (e) => {
        this.setState({
            Status: e.value
        })
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
        data.append("Link", this.state.MetaTitle);
        data.append('Status', this.state.Status);
        if (this.state.Image[0] !== null) {

            data.append("Image", this.state.Image[0]);
        }
        Axios.post('/banners/edit/' + this.props.match.params.id, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                console.log('a');
                this.onDone();
            })
            .catch(err => {
                console.log(err);
            })
    }
    RemoveOldImage = (e) => {
        this.setState({
            oldImage: null
        })
    }
    getImage = () => {
        if (this.state.oldImage) {
            return (
                <Image remove={(e) => this.RemoveOldImage(e)} src={this.state.oldImage} />
            )
        } else {
            return null;
        }

    }
    onDone = () => {
        this.setState({
            isDone: !this.state.isDone
        })
    }

    UNSAFE_componentWillMount() {
        let temp = null;
        if (this.props.match.params.id) {
            Axios.get('http://localhost:9000/banners/edit/' + this.props.match.params.id)
                .then((res) => {
                    temp = res.data[0];
                    this.setState({
                        Name: temp.Name,
                        Link: temp.Link,
                        oldImage: temp.Image,
                        Status: temp.Status

                    })
                })

        }
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
                    <h1 className="text-center">Trang sửa banner</h1>
                    <div className="container-fluid">
                        <form className="form-group" onSubmit={(e) => this.onSubmit(e)}>
                            <label htmlFor="Name"  >Tên banner</label>
                            <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="Name" placeholder="Tên danh mục" required={true} value={this.state.Name} />

                            <label htmlFor="Link"  >Đường dẫn</label>
                            <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="Link" placeholder="ten-danh-muc" value={this.state.Link} />

                            <label htmlFor="Image"  >Hình đại diện</label>
                            <MultiImageInput
                                max={1}
                                theme="light"
                                images={this.state.Image}
                                setImages={(e) => this.setImages(e)}
                                cropConfig={{ crop, ruleOfThirds: true }}
                            />
                            <div>
                                {this.getImage()}
                            </div>

                            <label htmlFor="Status"  >Trạng thái</label>
                            <Select
                                onChange={(e) => this.onSelectStatus(e)}
                                value={trangthai.filter(({ value }) => value === this.state.Status)}
                                options={trangthai}
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

export default editbanner;