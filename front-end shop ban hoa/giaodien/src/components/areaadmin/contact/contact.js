import Axios from 'axios';
import React, { Component } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { Redirect } from 'react-router-dom';
import { AUTH } from '../../env'
class contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            subject: '',
            message: '',
            isDone: false
        }
    }

    async componentDidMount() {
        let temp = null;
        if (this.props.match.params.id) {
            await trackPromise(Axios.get('/contacts/' + this.props.match.params.id, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) => {
                    temp = res.data.data;
                    this.setState({
                        name: temp.name,
                        email: temp.email,
                        subject: temp.subject,
                        message: temp.message
                    })
                }))
        }
    }
    onDone = () => {
        this.setState({
            onDone: true
        })
    }
    render() {
        if (this.state.isDone) {
            return (
                <Redirect to="/admin/listcontacts" />
            )
        }
        else {
            return (
                <div >
                    <h1 className="text-center">Chi tiết yêu cầu</h1>
                    <div className="container-fluid">
                        <form className="form-group" onSubmit={(e) => this.onSubmit(e)}>
                            <label htmlFor="name"  >Tên danh mục</label>
                            <input type="text" className="form-control" name="name" placeholder="Tên danh mục" required={true} value={this.state.name} readOnly />

                            <label htmlFor="email"  >Email</label>
                            <input type="text" className="form-control" name="email" placeholder="email" value={this.state.email} readOnly />

                            <label htmlFor="subject"  >Tiêu đề</label>
                            <input type="text" className="form-control" name="subject" placeholder="tiêu đề" value={this.state.subject} readOnly />

                            <label htmlFor="message"  >Nội dung</label>
                            <input type="text" className="form-control" name="message" placeholder="nội dụng" value={this.state.message} readOnly />

                            <br />
                            <button onClick={() => this.onDone()} className="btn btn-warning">Quay về</button>
                        </form>
                    </div>
                </div>
            );
        }
    }
}

export default contact;