import Axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-react';
class editdocument extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            link: '',
            content: '',
            isDeleted: true,
            isDone: false,
            isLoad: true
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        var data = new FormData();

        data.append("name", this.state.name);
        data.append("link", this.state.link);
        data.append('content', this.state.content);

        Axios.put('/documents/' + this.props.match.params.id, data)
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

    componentDidMount() {
        this.setState({
            isLoad: true
        })
        let temp = null;
        if (this.props.match.params.id) {
            Axios.get('/documents/' + this.props.match.params.id)
                .then((res) => {
                    temp = res.data.data;
                    this.setState({
                        name: temp.name,
                        link: temp.link,
                        content: temp.content,
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
                    <Redirect to="/admin/listdocuments" />
                )
            }
            else {
                return (
                    <div >
                        <h1 className="text-center">Trang sửa tài liệu</h1>
                        <div className="container-fluid">
                            <form className="form-group" onSubmit={(e) => this.onSubmit(e)}>
                                <label htmlFor="name"  >Tên tài liệu</label>
                                <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="name" placeholder="Tên tài liệu" required={true} value={this.state.name} />

                                <label htmlFor="link"  >Đường dẫn</label>
                                <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="link" placeholder="đường dẫn" value={this.state.link} />

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

export default editdocument;