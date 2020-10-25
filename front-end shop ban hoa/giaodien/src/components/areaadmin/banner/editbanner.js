import Axios from 'axios';
import React, { Component } from 'react';
// import Select from 'react-select';
import { Redirect } from 'react-router-dom'
import MultiImageInput from 'react-multiple-image-input';
import Image from '../../image'
// const trangthai = [
//     { value: false, label: 'Khả dụng' },
//     { value: true, label: 'Không khả dụng' }
// ]

const crop = {
    unit: '%',
    aspect: 4 / 3,
    width: '100'
};

class editbanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldimage: '',
            name: '',
            link: '',
            image: {},
            // isDeleted: true,
            isDone: false
        }
    }
    getData = () =>
        Axios.get('/banners/' + this.props.match.params.id)
            .then((res) => {
                this.setState({
                    data: res.data[0]
                })
            })

    setImages = (imageUpdate) => {
        this.setState({ image: imageUpdate })
    };

    // onSelectStatus = (e) => {
    //     this.setState({
    //         isDeleted: e.value
    //     })
    // }
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
        if (this.state.Image[0] != null) {

            data.append("Image", this.state.Image[0]);
        }
        Axios.put('/banners/' + this.props.match.params.id, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
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
        if (this.state.oldimage) {
            return (
                <Image remove={(e) => this.RemoveOldImage(e)} src={this.state.oldimage} />
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
            Axios.get('/banners/' + this.props.match.params.id)
                .then((res) => {
                    temp = res.data.data;
                    this.setState({
                        name: temp.name,
                        link: temp.link,
                        oldimage: temp.image,
                        isDeleted: temp.isDeleted

                    })
                })

        }
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
                    <h1 className="text-center">Trang sửa banner</h1>
                    <div className="container-fluid">
                        <form className="form-group" onSubmit={(e) => this.onSubmit(e)}>
                            <label htmlFor="name"  >Tên banner</label>
                            <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="name" placeholder="Tên danh mục" required={true} value={this.state.name} />

                            <label htmlFor="link"  >Đường dẫn</label>
                            <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="link" placeholder="ten-danh-muc" value={this.state.link} />

                            <label htmlFor="image"  >Hình đại diện</label>
                            <MultiImageInput
                                max={1}
                                theme="light"
                                images={this.state.image}
                                setImages={(e) => this.setImages(e)}
                                cropConfig={{ crop, ruleOfThirds: true }}
                            />
                            <div>
                                {this.getImage()}
                            </div>
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