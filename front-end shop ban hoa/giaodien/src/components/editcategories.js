import Axios from 'axios';
import React, { Component } from 'react';
import Select from 'react-select';
import { Redirect } from 'react-router-dom'

const trangthai = [
    { value: false, label: 'Khả dụng' },
    { value: true, label: 'Không khả dụng' }
]

class editproduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            metatitle: '',
            isDeleted: true,
            isDone: false
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
    onSelectStatus = (e) => {
        this.setState({
            isDeleted: e.value
        })
    }
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
        var data= {
            name: this.state.name,
            metatitle: this.state.metatitle,
            isDeleted: this.state.isDeleted
        }

        console.log(data);
        Axios.put('/categories/' + this.props.match.params.id, data)
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

    UNSAFE_componentWillMount() {
        let temp = null;
        if (this.props.match.params.id) {
            Axios.get('/categories/' + this.props.match.params.id)
                .then((res) => {
                    temp = res.data.data;
                    this.setState({
                        name: temp.name,
                        metatitle: temp.metatitle,
                        isDeleted: temp.isDeleted

                    })
                })

        }
    }
    render() {
        if (this.state.isDone) {
            return (
                <Redirect to="/listcategories" />
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

export default editproduct;