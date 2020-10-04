import Axios from 'axios';
import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Redirect } from 'react-router-dom'
import MultiImageInput from 'react-multiple-image-input';
const animatedComponents = makeAnimated();

// const CategoryID = [
//     { value: '1231232123', label: 'Hoa' },
//     { value: '343445', label: 'Bình' },
//     { value: '221212', label: 'blablabla' }
// ]

var CategoryID = [];

const trangthai = [
    { value: 'true', label: 'Khả dụng' },
    { value: 'false', label: 'Không khả dụng' }
]

const crop = {
    unit: '%',
    aspect: 4 / 3,
    width: '100'
};

class addproduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            MetaTitle: '',
            Image: {},
            MoreImages: {},
            Detail: '',
            Description: '',
            Price: '',
            PromotionPrice: '',
            Quantity: '',
            CategoryId: [],
            Status: true,
            isDone: false
        }
    }

    onSelectMulti = (e) => {
        var list = [];
        if (e != null) {
            e.map(object =>
                list.push(object.value)
            )
        }
        this.setState({
            CategoryId: list
        })
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

    setMoreImages = (imageUpdate) => {
        this.setState({ MoreImages: imageUpdate })
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
        data.append("MetaTitle", this.state.MetaTitle);
        data.append('Detail', this.state.Detail);
        data.append('Description', this.state.Description);
        data.append('Price', this.state.Price);
        data.append('PromotionPrice', this.state.PromotionPrice);
        data.append('Quantity', this.state.Quantity);
        data.append('Status', this.state.Status);
        if (this.state.CategoryId !== null) {
            for (const [key, value] of Object.entries(this.state.CategoryId)) {
                console.log(key);
                data.append('CategoryId', value);
            }
        }
        if (this.state.Image[0] !== null) {

            data.append("Image", this.state.Image[0]);
        }
        if (this.state.MoreImages != null) {
            for (const [key, value] of Object.entries(this.state.MoreImages)) {
                console.log(key);
                data.append('MoreImages', value);
            }
        }

        Axios.post('/products/add', data, {
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



    UNSAFE_componentWillMount() {
        let temp = null;
        Axios.get('http://localhost:9000/categories/list')
            .then((res) => {
                temp = res.data;
                temp.forEach(o=>{
                    var object ={
                        value:o._id,
                        label:o.Name
                    }
                    CategoryID.push(object);
                })
                console.log(CategoryID);
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
                <Redirect to="/listproducts" />
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

                            <label htmlFor="Image"  >Hình đại diện</label>
                            <MultiImageInput
                                max={1}
                                theme="light"
                                images={this.state.Image}
                                setImages={(e) => this.setImages(e)}
                                cropConfig={{ crop, ruleOfThirds: true }}
                            />

                            <label htmlFor="MoreImages"  >Hình ảnh thêm</label>
                            <MultiImageInput
                                max={10}
                                theme="light"
                                images={this.state.MoreImages}
                                setImages={(e) => this.setMoreImages(e)}
                                cropConfig={{ crop, ruleOfThirds: true }}
                            />

                            <label htmlFor="Detail"  >Chi tiết</label>
                            <textarea onChange={(e) => this.onChange(e)} type="text" className="form-control" name="Detail" placeholder="Chi tiết" />

                            <label htmlFor="Description"  >Mô tả</label>
                            <textarea onChange={(e) => this.onChange(e)} type="text" className="form-control" name="Description" placeholder="Mô tả" />

                            <label htmlFor="Price"  >Giá</label>
                            <input onChange={(e) => this.onChange(e)} type="number" className="form-control" name="Price" placeholder="100000" required={true} />

                            <label htmlFor="Promotionprice"  >Giá khuyến mãi</label>
                            <input onChange={(e) => this.onChange(e)} type="number" className="form-control" name="Promotionprice" placeholder="50000" />

                            <label htmlFor="Quantity"  >Số lượng</label>
                            <input onChange={(e) => this.onChange(e)} type="number" className="form-control" name="Quantity" placeholder="100" required={true} />

                            <label htmlFor="CategoryID"  >Danh mục</label>
                            <Select
                                name="CategoryID"
                                onChange={(e) => this.onSelectMulti(e)}
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                //defaultValue = { [options[4], options[5]]}
                                isMulti
                                options={CategoryID}
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

export default addproduct;
