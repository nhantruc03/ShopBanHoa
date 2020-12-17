import Axios from 'axios';
import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Redirect } from 'react-router-dom'
import MultiImageInput from 'react-multiple-image-input';
import { ChangeToSlug } from '../../../services/convertoslug'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-react';
import { AUTH } from '../../env'
import { trackPromise } from 'react-promise-tracker';
const animatedComponents = makeAnimated();

var CategoryID = [];

const crop = {
    unit: '%',
    aspect: 4 / 3,
    width: '100'
};

class addproduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            metatitle: '',
            image: {},
            moreimages: {},
            detail: '',
            description: '',
            price: '',
            promotionprice: '',
            quantity: '',
            categoryId: [],
            isDone: false,
            isLoad: false
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
            categoryId: list
        })
    }

    setimages = (imageUpdate) => {
        this.setState({ image: imageUpdate })
    };

    setMoreimages = (imageUpdate) => {
        this.setState({ moreimages: imageUpdate })
    };

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
        var data = new FormData();

        data.append("name", this.state.name);
        data.append("metatitle", this.state.metatitle);
        data.append('detail', this.state.detail);
        data.append('description', this.state.description);
        data.append('price', this.state.price);
        data.append('promotionprice', this.state.promotionprice);
        data.append('quantity', this.state.quantity);
        if (this.state.categoryId !== null) {
            data.append('categoryId', this.state.categoryId.toString())
        }
        if (this.state.image[0] !== null) {

            data.append("image", this.state.image[0]);
        }
        var temp_list = [];
        if (this.state.moreimages != null) {
            for (const [key, value] of Object.entries(this.state.moreimages)) {
                console.log(key);
                temp_list.push(value);
            }
            data.append('moreimages', temp_list.toString());
        }

        await trackPromise(Axios.post('/products', data, {
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
            }))
    }
    async componentDidMount() {
        this.setState({
            isLoad: true
        })
        let temp = null;

        var data = {
            isDeleted: false
        };
        await trackPromise(Axios.post('/categories/getAll', data, {
            headers: {
                'Authorization': { AUTH }.AUTH
            }
        })
            .then((res) => {
                temp = res.data.data;
                CategoryID = [];
                temp.forEach(o => {
                    var object = {
                        value: o._id,
                        label: o.name
                    }
                    CategoryID.push(object);
                })
                this.setState({
                    isLoad: false
                })
            }))
    }

    onDone = () => {
        this.setState({
            isDone: !this.state.isDone
        })
    }

    handleCkeditorState = (event, editor) => {
        const data = editor.getData();
        this.setState({
            description: data
        })
    }

    render() {
        if (this.state.isLoad) {
            return <p>Loading...</p>
        }
        else {
            if (this.state.isDone) {
                return (
                    <Redirect to="/admin/listproducts" />
                )
            }
            else {
                return (
                    <div >
                        <h1 className="text-center">Trang thêm sản phẩm</h1>
                        <div className="container-fluid">
                            <form className="form-group" onSubmit={(e) => this.onSubmit(e)}>
                                <label htmlFor="name"  >Tên sản phẩm</label>
                                <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="name" placeholder="Tên sản phẩm" required={true} />

                                <label htmlFor="metatitle"  >Meta Title</label>
                                <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="metatitle" placeholder="ten-danh-muc-san-pham" value={this.state.metatitle} required={true} />

                                <label htmlFor="image"  >Hình đại diện</label>
                                <MultiImageInput
                                    max={1}
                                    theme="light"
                                    images={this.state.image}
                                    setImages={(e) => this.setimages(e)}
                                    allowCrop={false}
                                    cropConfig={{ crop, ruleOfThirds: true }}
                                />

                                <label htmlFor="moreimages"  >Hình ảnh thêm</label>
                                <MultiImageInput
                                    max={10}
                                    theme="light"
                                    images={this.state.moreimages}
                                    setImages={(e) => this.setMoreimages(e)}
                                    allowCrop={false}
                                    cropConfig={{ crop, ruleOfThirds: true }}
                                />

                                <label htmlFor="detail"  >Chi tiết</label>
                                <textarea onChange={(e) => this.onChange(e)} type="text" className="form-control" name="detail" placeholder="Chi tiết" required={true} />

                                <label htmlFor="description"  >Mô tả</label>
                                {/* <textarea onChange={(e) => this.onChange(e)} type="text" className="form-control" name="description" placeholder="Mô tả" /> */}
                                <CKEditor
                                    editor={ClassicEditor}
                                    onInit={editor => {
                                        // You can store the "editor" and use when it is needed.
                                        console.log('Editor is ready to use!', editor);
                                    }}
                                    config={
                                        {
                                            ckfinder: {
                                                uploadUrl: '/uploads'
                                            }
                                        }
                                    }
                                    onChange={this.handleCkeditorState}

                                />
                                <label htmlFor="price"  >Giá</label>
                                <input onChange={(e) => this.onChange(e)} type="number" className="form-control" name="price" placeholder="100000" required={true} />

                                <label htmlFor="promotionprice"  >Giá khuyến mãi</label>
                                <input onChange={(e) => this.onChange(e)} type="number" className="form-control" name="promotionprice" placeholder="50000" />

                                <label htmlFor="quantity"  >Số lượng</label>
                                <input onChange={(e) => this.onChange(e)} type="number" className="form-control" name="quantity" placeholder="100" required={true} />

                                <label htmlFor="categoryId"  >Danh mục</label>
                                <Select
                                    name="categoryId"
                                    onChange={(e) => this.onSelectMulti(e)}
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    //defaultValue = { [options[4], options[5]]}
                                    isMulti
                                    options={CategoryID}
                                />

                                <label htmlFor="isDeleted"  >Trạng thái</label>
                                {/* <Select onChange={(e) => this.onSelectStatus(e)} name="isDeleted" options={trangthai} /> */}
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
}

export default addproduct;
