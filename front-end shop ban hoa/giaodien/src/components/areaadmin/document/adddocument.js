import Axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-react';
import {AUTH} from '../../env'
import { trackPromise } from 'react-promise-tracker';
class adddocument extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            link: '',
            content: '',
            isDone: false,
            isLoad: false
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = async (e) => {
        e.preventDefault();
        var data = new FormData();

        data.append("name", this.state.name);
        data.append("link", this.state.link);
        data.append('content', this.state.content);

        await trackPromise(Axios.post('/documents', data, {
            headers: {
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

    onDone = () => {
        this.setState({
            isDone: !this.state.isDone
        })
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
                        <h1 className="text-center">Trang thêm tài liệu</h1>
                        <div className="container-fluid">
                            <form className="form-group" onSubmit={(e) => this.onSubmit(e)}>
                                <label htmlFor="name"  >Tên tài liệu</label>
                                <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="name" placeholder="Tên tài liệu" required={true} />

                                <label htmlFor="link"  >Đường dẫn</label>
                                <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="link" placeholder="duong dan" required={true} />

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
                                    onChange={this.handleCkeditorState}

                                />

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

export default adddocument;