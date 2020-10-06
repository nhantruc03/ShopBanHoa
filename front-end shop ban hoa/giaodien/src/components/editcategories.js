import Axios from 'axios';
import React, { Component } from 'react';
import Select from 'react-select';
import { Redirect } from 'react-router-dom'

const trangthai = [
    { value: true, label: 'Khả dụng' },
    { value: false, label: 'Không khả dụng' }
]

class editproduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            MetaTitle: '',
            Status: true,
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
            MetaTitle: slug
        })
        //return slug;
    }
    getData = () =>
        Axios.get('http://localhost:9000/categories/edit/' + this.props.match.params.id)
            .then((res) => {
                console.log(res.data[0])
                this.setState({
                    data: res.data[0]
                })
            })

    onSelectStatus = (e) => {
        this.setState({
            Status: e.value
        })
    }
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
        console.log(this.state.Status);
        data.append('Status', this.state.Status);

        console.log(data);
        Axios.post('/categories/edit/' + this.props.match.params.id, data, {
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

    onDone = () => {
        this.setState({
            isDone: !this.state.isDone
        })
    }

    UNSAFE_componentWillMount() {
        let temp = null;
        if (this.props.match.params.id) {
            Axios.get('http://localhost:9000/categories/edit/' + this.props.match.params.id)
                .then((res) => {
                    temp = res.data[0];
                    this.setState({
                        Name: temp.Name,
                        MetaTitle: temp.MetaTitle,
                        Status: temp.Status

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
                            <label htmlFor="Name"  >Tên danh mục</label>
                            <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="Name" placeholder="Tên danh mục" required={true} value={this.state.Name} />

                            <label htmlFor="MetaTitle"  >Meta Title</label>
                            <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="MetaTitle" placeholder="ten-danh-muc" value={this.state.MetaTitle} />

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

export default editproduct;