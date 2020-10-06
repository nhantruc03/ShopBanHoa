import Axios from 'axios';
import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Redirect } from 'react-router-dom'
import MultiImageInput from 'react-multiple-image-input';
import Image from './image'
const animatedComponents = makeAnimated();
// const CategoryID = [
//     { value: '1231232123', label: 'Hoa' },
//     { value: '343445', label: 'Bình' },
//     { value: '221212', label: 'blablabla' }
// ]
var CategoryID = [];
const trangthai = [
    { value: true, label: 'Khả dụng' },
    { value: false, label: 'Không khả dụng' }
]

const crop = {
    unit: '%',
    aspect: 4 / 3,
    width: '100'
};
class editproduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldImage: '',
            oldMoreImages: [],
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
            isDone: false,
            isLoad: true
        }
    }

    ChangeToSlug = (title) => {
        var slug;

        //Lấy text từ thẻ input title 

        //Đổi chữ hoa thành chữ thường
        slug = title.toLowerCase();

        //Đổi ký tự có dấu thành không dấu
        slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');//eslint-disable-line
        slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');//eslint-disable-line
        slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');//eslint-disable-line
        slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');//eslint-disable-line
        slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');//eslint-disable-line
        slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');//eslint-disable-line
        slug = slug.replace(/đ/gi, 'd');//eslint-disable-line
        //Xóa các ký tự đặt biệt
        slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');//eslint-disable-line
        //Đổi khoảng trắng thành ký tự gạch ngang
        slug = slug.replace(/ /gi, "-");
        //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
        //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
        slug = slug.replace(/\-\-\-\-\-/gi, '-');//eslint-disable-line
        slug = slug.replace(/\-\-\-\-/gi, '-');//eslint-disable-line
        slug = slug.replace(/\-\-\-/gi, '-'); //eslint-disable-line
        slug = slug.replace(/\-\-/gi, '-');//eslint-disable-line
        //Xóa các ký tự gạch ngang ở đầu và cuối
        slug = '@' + slug + '@';
        slug = slug.replace(/\@\-|\-\@|\@/gi, '');//eslint-disable-line
        //In slug ra textbox có id “slug”
        this.setState({
            MetaTitle: slug
        })
        //return slug;
    }

    getData = () =>
        Axios.get('http://localhost:9000/products/edit/' + this.props.match.params.id)
            .then((res) => {
                console.log(res.data[0])
                this.setState({
                    data: res.data[0]
                })
            })
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
        if (e.value) {
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
        if (e.target.name === 'Name') {
            this.ChangeToSlug(e.target.value);
        }
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
        if (this.state.oldImage !== null) {
            data.append("OldImage", this.state.oldImage)
        }
        if (this.state.oldMoreImages != null) {
            this.state.oldMoreImages.forEach((value) => {
                console.log(value);
                data.append('OldMoreImages', value);
            })
        }
        console.log(data);
        Axios.post('/products/edit/' + this.props.match.params.id, data, {
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


    RemoveOldImage = (e) => {
        this.setState({
            oldImage: null
        })
    }

    RemoveOldMoreImages = (e) => {
        this.setState({
            oldMoreImages: this.state.oldMoreImages.filter(im => im !== e)
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



    getoldMoreImages = () => {
        return (
            this.state.oldMoreImages.map((value, key) => (
                <Image key={key} src={value} remove={(e) => this.RemoveOldMoreImages(e)} />
            ))
        )
    }



    componentDidMount() {
        this.setState({
            isLoad: true
        })
        let temp = null;
        if (this.props.match.params.id) {
            Axios.get('http://localhost:9000/products/edit/' + this.props.match.params.id)
                .then((res) => {
                    temp = res.data[0];

                    this.setState({
                        Name: temp.Name,
                        MetaTitle: temp.MetaTitle,
                        Detail: temp.Detail,
                        Description: temp.Description,
                        oldImage: temp.Image,
                        oldMoreImages: temp.MoreImages,
                        Price: temp.Price,
                        Quantity: temp.Quantity,
                        Status: temp.Status,
                        CategoryId: temp.CategoryId

                    })
                })
                .then(() => {
                    if (temp.PromotionPrice === null) {
                        this.setState({
                            PromotionPrice: ''
                        })
                    } else {
                        this.setState({
                            PromotionPrice: temp.PromotionPrice
                        })
                    }
                })

            var temp2 = null;
            Axios.get('http://localhost:9000/categories/listavail')
                .then((res) => {
                    temp2 = res.data;
                    CategoryID = [];
                    temp2.forEach(o => {
                        var object = {
                            value: o._id,
                            label: o.Name
                        }
                        CategoryID.push(object);
                    })
                    console.log(CategoryID);
                    this.setState({
                        isLoad: false
                    })
                })

        }
    }
    render() {
        if (this.state.isLoad) {
            return <p>Loading...</p>
        }
        else {
            if (this.state.isDone) {
                return (
                    <Redirect to="/listproducts" />
                )
            }
            else {
                return (
                    <div >
                        <h1 className="text-center">Trang sửa sản phẩm</h1>
                        <div className="container-fluid">
                            <form className="form-group" onSubmit={(e) => this.onSubmit(e)}>
                                <label htmlFor="Name"  >Tên sản phẩm</label>
                                <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="Name" placeholder="Tên sản phẩm" required={true} value={this.state.Name} />

                                <label htmlFor="MetaTitle"  >Meta Title</label>
                                <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="MetaTitle" placeholder="ten-san-pham" value={this.state.MetaTitle} />

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

                                <label htmlFor="MoreImages"  >Hình ảnh thêm</label>
                                <MultiImageInput
                                    max={10}
                                    theme="light"
                                    images={this.state.MoreImages}
                                    setImages={(e) => this.setMoreImages(e)}
                                    cropConfig={{ crop, ruleOfThirds: true }}
                                />

                                <div>
                                    {this.getoldMoreImages()}
                                </div>

                                <label htmlFor="Detail"  >Chi tiết</label>
                                <textarea onChange={(e) => this.onChange(e)} type="text" className="form-control" name="Detail" placeholder="Chi tiết" value={this.state.Detail} />

                                <label htmlFor="Description"  >Mô tả</label>
                                <textarea onChange={(e) => this.onChange(e)} type="text" className="form-control" name="Description" placeholder="Mô tả" value={this.state.Description} />

                                <label htmlFor="Price"  >Giá</label>
                                <input onChange={(e) => this.onChange(e)} type="number" className="form-control" name="Price" placeholder="100000" required={true} value={this.state.Price} />

                                <label htmlFor="PromotionPrice"  >Giá khuyến mãi</label>
                                <input onChange={(e) => this.onChange(e)} type="number" className="form-control" name="PromotionPrice" placeholder="50000" value={this.state.PromotionPrice} />

                                <label htmlFor="Quantity"  >Số lượng</label>
                                <input onChange={(e) => this.onChange(e)} type="number" className="form-control" name="Quantity" placeholder="100" required={true} value={this.state.Quantity} />

                                <label htmlFor="CategoryID"  >Danh mục</label>
                                <Select
                                    name="CategoryID"
                                    onChange={(e) => this.onSelectMulti(e)}
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    value={CategoryID.filter(({ value, label }) => this.state.CategoryId.includes(value))}
                                    isMulti
                                    options={CategoryID}
                                />

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
}

export default editproduct;