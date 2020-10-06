import Axios from 'axios';
import React, { Component } from 'react';
import Select from 'react-select';
import { Redirect } from 'react-router-dom'
const trangthai = [
    { value: 'true', label: 'Khả dụng' },
    { value: 'false', label: 'Không khả dụng' }
]

class addproduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            MetaTitle: '',
            Status: true,
            isDone: false
        }
    }
    ChangeToSlug= (title) =>
    {
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
            MetaTitle:slug
        })
        //return slug;
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

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        if(e.target.name=== 'Name'){
            this.ChangeToSlug(e.target.value);
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        var data = new FormData();

        data.append("Name", this.state.Name);
        data.append("MetaTitle",this.state.MetaTitle);
        data.append('Status',this.state.Status);
       
        Axios.post('/categories/add', data, {
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

    onDone= () =>{
        this.setState({
            isDone: ! this.state.isDone
        })
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
                    <h1 className="text-center">Trang thêm sản phẩm</h1>
                    <div className="container-fluid">
                        <form className="form-group" onSubmit={(e) => this.onSubmit(e)}>
                            <label htmlFor="Name"  >Tên sản phẩm</label>
                            <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="Name" placeholder="Tên sản phẩm" required={true} />

                            <label htmlFor="MetaTitle"  >Meta Title</label>
                            <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="MetaTitle" placeholder="ten-san-pham" />

                            <label htmlFor="Status"  >Trạng thái</label>
                            <Select onChange={(e) => this.onSelectStatus(e)} name="Status" options={trangthai} />
                            <br />
                            <button type="submit" className="btn btn-success">Thêm</button>
                        &nbsp;
                        <button onClick={()=>this.onDone()} className="btn btn-warning">Quay về</button>
                        </form>

                    </div>
                </div>
            );
        }
    }
}

export default addproduct;
