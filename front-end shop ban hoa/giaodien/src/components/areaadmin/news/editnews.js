import Axios from 'axios';
import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Redirect } from 'react-router-dom'
import MultiImageInput from 'react-multiple-image-input';
import Image from '../../image'
import { ChangeToSlug } from '../../../services/convertoslug'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-react';
import {AUTH} from '../../env'
const animatedComponents = makeAnimated();

var CategoryID = [];

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
            name: '',
            metatitle: '',
            image: {},
            content: '',
            description: '',
            newscategoryId: [],
            isDeleted: true,
            isDone: false,
            isLoad: true
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
            newscategoryId: list
        })
    }


    setImages = (imageUpdate) => {
        this.setState({ image: imageUpdate })
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

    onSubmit = (e) => {
        e.preventDefault();
        var data = new FormData();

        data.append("name", this.state.name);
        data.append("metatitle", this.state.metatitle);
        data.append('content', this.state.content);
        data.append('description', this.state.description);

        if (this.state.newscategoryId != null) {
            data.append('newscategoryId', this.state.newscategoryId.toString());
        }

        // 1 image
        if (this.state.image[0] != null) {
            data.append("image", this.state.image[0]);
        }
        if (this.state.oldimage != null) {
            data.append("oldimage", this.state.oldimage)
        }

        Axios.put('/news/' + this.props.match.params.id, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': {AUTH}.AUTH
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

    getImage = () => {
        if (this.state.oldimage) {
            return (
                <Image remove={(e) => this.RemoveOldImage(e)} src={this.state.oldimage} />
            )
        } else {
            return null;
        }

    }

    componentDidMount() {
        this.setState({
            isLoad: true
        })
        let temp = null;
        if (this.props.match.params.id) {
            Axios.get('/news/' + this.props.match.params.id)
                .then((res) => {
                    temp = res.data.data;
                    this.setState({
                        name: temp.name,
                        metatitle: temp.metatitle,
                        content: temp.content,
                        oldimage: temp.image,
                        isDeleted: temp.isDeleted,
                        newscategoryId: temp.newscategoryId,
                        description: temp.description

                    })
                })

            var temp2 = null;

            var data = {
                isDeleted: false
            }

            Axios.post('/newscategories/getAll', data)
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
    handleCkeditorState = (event, editor) => {
        const data = editor.getData();
        this.setState({
            content: data
        })
    }
    render() {
        if (this.state.isLoad) {
            return <p>Loading...</p>
        }
        else {
            if (this.state.isDone) {
                return (
                    <Redirect to="/admin/listnews" />
                )
            }
            else {
                return (
                    <div >
                        <h1 className="text-center">Trang sửa tin tức</h1>
                        <div className="container-fluid">
                            <form className="form-group" onSubmit={(e) => this.onSubmit(e)}>
                                <label htmlFor="name"  >Tên tin tức</label>
                                <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="name" placeholder="Tên tin tức" required={true} value={this.state.name} />

                                <label htmlFor="metaTitle"  >Meta Title</label>
                                <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="metatitle" placeholder="ten-tin-tuc" value={this.state.metatitle} />

                                <label htmlFor="description"  >Mô tả</label>
                                <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="description" placeholder="ten-tin-tuc" value={this.state.description} />

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

                                <label htmlFor="content"  >Nội dung</label>
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
                                    data={this.state.content}
                                    onChange={this.handleCkeditorState}
                                />

                                <label htmlFor="newscategoryId">Danh mục</label>
                                <Select
                                    name="newscategoryId"
                                    onChange={(e) => this.onSelectMulti(e)}
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    value={CategoryID.filter(({ value, label }) => this.state.newscategoryId.includes(value))}
                                    isMulti
                                    options={CategoryID}
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