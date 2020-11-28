import Axios from 'axios';
import React, { Component } from 'react';
import Breadcumsection from '../breadcumsection';
import { AUTH } from '../../env';
import { trackPromise } from 'react-promise-tracker';
const bc = [
    {
        name: "Liên hệ",
        link: "/contact"
    }
]
class contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            subject: '',
            message: ''
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        var data = {
            name: this.state.name,
            email: this.state.email,
            subject: this.state.subject,
            message: this.state.message
        }

        await trackPromise(Axios.post('/contacts', data, {
            headers: {
                'Authorization': { AUTH }.AUTH
            }
        })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err);
            }))

        var h = document.getElementById("beforeend");
        h.insertAdjacentHTML("beforeEnd", '<p className="textcolor" style="font-size: xxx-large;font-weight: bold;color:#b0b435;">Gửi yêu cầu thành công</p>');
        setTimeout(() => {
            h.querySelector(':last-child').remove();
        }, 2000);
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return (
            <div>
                {/* Start All Title Box */}
                <Breadcumsection data={bc} />
                {/* End All Title Box */}
                {/* Start Contact Us  */}
                <div className="contact-box-main">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-sm-12">
                                <div className="contact-form-right">
                                    <h2>Liên hệ</h2>
                                    <p>Nếu bạn có thắc mắc hay có yêu cầu gì hãy liên hệ với chúng tôi qua những thông tin dưới đây.</p>
                                    <form id="contactForm" onSubmit={(e) => this.onSubmit(e)}>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input onChange={(e) => this.onChange(e)} type="text" className="form-control" id="name" name="name" placeholder="Tên của bạn" required data-error="Vui lòng nhập tên" />
                                                    <div className="help-block with-errors" />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input onChange={(e) => this.onChange(e)} type="email" placeholder="Your Email" id="email" className="form-control" name="email" required data-error="Vui lòng nhập email" />
                                                    <div className="help-block with-errors" />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input onChange={(e) => this.onChange(e)} type="text" className="form-control" id="subject" name="subject" placeholder="Tiêu đề" required data-error="Vui lòng nhập tiê đề" />
                                                    <div className="help-block with-errors" />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <textarea onChange={(e) => this.onChange(e)} className="form-control" id="message" name="message" placeholder="Nội dung" rows={4} data-error="Vui lòng nhập nội dung" required defaultValue={""} />
                                                    <div className="help-block with-errors" />
                                                </div>
                                                <div className="submit-button text-center">
                                                    <button className="btn hvr-hover btn-success" id="submit" type="submit">Gửi</button>
                                                    <div id="msgSubmit" className="h3 text-center hidden" />
                                                    <div className="clearfix" />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="beforeend text-center" id="beforeend">
                               
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Cart */}
            </div>
        );
    }
}

export default contact;