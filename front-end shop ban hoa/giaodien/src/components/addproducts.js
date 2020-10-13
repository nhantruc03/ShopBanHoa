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
    { value: false, label: 'Khả dụng' },
    { value: true, label: 'Không khả dụng' }
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
            isLoad: false
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
        if (e.value === 'true') {
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

    setimages = (imageUpdate) => {
        this.setState({ image: imageUpdate })
    };

    setMoreimages = (imageUpdate) => {
        this.setState({ moreimages: imageUpdate })
        console.log(this.state.moreimages);
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
        if (this.state.categoryId !== null) {
            data.append('categoryId',this.state.categoryId.toString())
        }
        if (this.state.image[0] !== null) {

            data.append("image", this.state.image[0]);
        }
        var temp_list=[];
        if (this.state.moreimages != null) {
            for (const [key, value] of Object.entries(this.state.moreimages)) {
                console.log(key);
                temp_list.push(value);
            }
            data.append('moreimages',temp_list.toString());
        }

        Axios.post('/products', data, {
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



    componentDidMount() {
        this.setState({
            isLoad: true
        })
        let temp = null;

        var data = {
            isDeleted: false
        };
        Axios.post('/categories/getAll',data)
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
            })


    }

    onDone = () => {
        this.setState({
            isDone: !this.state.isDone
        })
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
                                    cropConfig={{ crop, ruleOfThirds: true }}
                                />

                                <label htmlFor="moreimages"  >Hình ảnh thêm</label>
                                <MultiImageInput
                                    max={10}
                                    theme="light"
                                    images={this.state.moreimages}
                                    setImages={(e) => this.setMoreimages(e)}
                                    cropConfig={{ crop, ruleOfThirds: true }}
                                />

                                <label htmlFor="detail"  >Chi tiết</label>
                                <textarea onChange={(e) => this.onChange(e)} type="text" className="form-control" name="detail" placeholder="Chi tiết" />

                                <label htmlFor="description"  >Mô tả</label>
                                <textarea onChange={(e) => this.onChange(e)} type="text" className="form-control" name="description" placeholder="Mô tả" />

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
                                <Select onChange={(e) => this.onSelectStatus(e)} name="isDeleted" options={trangthai} />
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
