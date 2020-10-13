import Axios from 'axios';
import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Redirect } from 'react-router-dom'
import MultiImageInput from 'react-multiple-image-input';
import Image from './image'
const animatedComponents = makeAnimated();

var CategoryID = [];
const trangthai = [
    { value: false, label: 'Khả dụng' },
    { value: true, label: 'Không khả dụng' }
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
            oldimage: '',
            oldmoreimages: [],
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
            isDeleted: true,
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
            metatitle: slug
        })
        //return slug;
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

    onSelectStatus = (e) => {
        if (e.value) {
            this.setState({
                isDeleted: true
            })
        }
        else {
            this.setState({
                isDeleted: false
            })
        }
    }

    setImages = (imageUpdate) => {
        this.setState({ image: imageUpdate })
    };

    setMoreImages = (imageUpdate) => {
        this.setState({ moreimages: imageUpdate })
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        if (e.target.name === 'name') {
            this.ChangeToSlug(e.target.value);
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        var data = new FormData();

        data.append("name", this.state.name);
        data.append("metatitle", this.state.metatitle);
        data.append('detail', this.state.detail);
        data.append('description', this.state.description);
        data.append('price', this.state.price);
        data.append('promotionprice', this.state.promotionprice);
        data.append('quantity', this.state.quantity);
        data.append('isDeleted', this.state.isDeleted);

        if (this.state.categoryId != null) {
            data.append('categoryId', this.state.categoryId.toString());
        }

        // 1 image
        if (this.state.image[0] != null) {
            data.append("image", this.state.image[0]);
        }
        if (this.state.oldimage != null) {
            data.append("oldimage", this.state.oldimage)
        }

        // multiple images
        var temp_list = []
        if (this.state.moreimages != null) {
            for (const [key, value] of Object.entries(this.state.moreimages)) {
                console.log(key);
                temp_list.push(value)
            }
            data.append('moreimages', temp_list.toString());
        }

        if (this.state.oldmoreimages != null) {
            console.log(this.state.oldmoreimages)
            data.append('oldmoreimages', this.state.oldmoreimages.toString());
        }

        Axios.put('/products/' + this.props.match.params.id, data, {
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

    onDone = () => {
        this.setState({
            isDone: !this.state.isDone
        })
    }


    RemoveOldImage = (e) => {
        this.setState({
            oldimage: null
        })
    }

    RemoveOldMoreImages = (e) => {
        this.setState({
            oldmoreimages: this.state.oldmoreimages.filter(im => im !== e)
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



    getoldMoreImages = () => {
        return (
            this.state.oldmoreimages.map((value, key) => (
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
            Axios.get('/products/' + this.props.match.params.id)
                .then((res) => {
                    temp = res.data.data;
                    this.setState({
                        name: temp.name,
                        metatitle: temp.metatitle,
                        detail: temp.detail,
                        description: temp.description,
                        oldimage: temp.image,
                        oldmoreimages: temp.moreimages,
                        price: temp.price,
                        quantity: temp.quantity,
                        isDeleted: temp.isDeleted,
                        categoryId: temp.categoryId

                    })
                })
                .then(() => {
                    if (temp.promotionprice === null) {
                        this.setState({
                            promotionprice: ''
                        })
                    } else {
                        this.setState({
                            promotionprice: temp.promotionprice
                        })
                    }
                })

            var temp2 = null;

            var data = {
                isDeleted: false
            }

            Axios.post('/categories/getAll', data)
                .then((res) => {
                    temp2 = res.data.data;
                    CategoryID = [];
                    temp2.forEach(o => {
                        var object = {
                            value: o._id,
                            label: o.name
                        }
                        CategoryID.push(object);
                    })
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
                                <label htmlFor="name"  >Tên sản phẩm</label>
                                <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="name" placeholder="Tên sản phẩm" required={true} value={this.state.name} />

                                <label htmlFor="metaTitle"  >Meta Title</label>
                                <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="metatitle" placeholder="ten-san-pham" value={this.state.metatitle} />

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

                                <label htmlFor="moreimages"  >Hình ảnh thêm</label>
                                <MultiImageInput
                                    max={10}
                                    theme="light"
                                    images={this.state.moreimages}
                                    setImages={(e) => this.setMoreImages(e)}
                                    cropConfig={{ crop, ruleOfThirds: true }}
                                />

                                <div>
                                    {this.getoldMoreImages()}
                                </div>

                                <label htmlFor="detail"  >Chi tiết</label>
                                <textarea onChange={(e) => this.onChange(e)} type="text" className="form-control" name="detail" placeholder="Chi tiết" value={this.state.detail} />

                                <label htmlFor="description"  >Mô tả</label>
                                <textarea onChange={(e) => this.onChange(e)} type="text" className="form-control" name="description" placeholder="Mô tả" value={this.state.description} />

                                <label htmlFor="price"  >Giá</label>
                                <input onChange={(e) => this.onChange(e)} type="number" className="form-control" name="price" placeholder="100000" required={true} value={this.state.price} />

                                <label htmlFor="promotionprice"  >Giá khuyến mãi</label>
                                <input onChange={(e) => this.onChange(e)} type="number" className="form-control" name="promotionprice" placeholder="50000" value={this.state.promotionprice} />

                                <label htmlFor="quantity"  >Số lượng</label>
                                <input onChange={(e) => this.onChange(e)} type="number" className="form-control" name="quantity" placeholder="100" required={true} value={this.state.quantity} />

                                <label htmlFor="categoryID"  >Danh mục</label>
                                <Select
                                    name="categoryID"
                                    onChange={(e) => this.onSelectMulti(e)}
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    value={CategoryID.filter(({ value, label }) => this.state.categoryId.includes(value))}
                                    isMulti
                                    options={CategoryID}
                                />

                                <label htmlFor="isDeleted"  >Trạng thái</label>
                                <Select
                                    onChange={(e) => this.onSelectStatus(e)}
                                    value={trangthai.filter(({ value }) => value === this.state.isDeleted)}
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