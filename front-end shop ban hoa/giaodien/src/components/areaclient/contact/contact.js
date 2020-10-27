import React, { Component } from 'react';
import Breadcumsection from '../breadcumsection';
const bc=[
    {
        name:"Liên hệ",
        link:"/contact"
    }
]
class contact extends Component {
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
                            <div className="col-lg-8 col-sm-12">
                                <div className="contact-form-right">
                                    <h2>Liên hệ</h2>
                                    <p>Nếu bạn có thắc mắc hay có yêu cầu gì hãy liên hệ với chúng tôi qua những thông tin dưới đây.</p>
                                    <form id="contactForm">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" id="name" name="name" placeholder="Tên của bạn" required data-error="Vui lòng nhập tên" />
                                                    <div className="help-block with-errors" />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input type="text" placeholder="Your Email" id="email" className="form-control" name="email" required data-error="Vui lòng nhập email" />
                                                    <div className="help-block with-errors" />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" id="subject" name="subject" placeholder="Tiêu đề" required data-error="Vui lòng nhập tiê đề" />
                                                    <div className="help-block with-errors" />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <textarea className="form-control" id="message" placeholder="Nội dung" rows={4} data-error="Vui lòng nhập nội dung" required defaultValue={""} />
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
                            </div>
                            <div className="col-lg-4 col-sm-12">
                                <div className="contact-info-left">
                                    <h2>CONTACT INFO</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent urna diam, maximus ut ullamcorper quis, placerat id eros. Duis semper justo sed condimentum rutrum. Nunc tristique purus turpis. Maecenas vulputate. </p>
                                    <ul>
                                        <li>
                                            <p><i className="fas fa-map-marker-alt" />Address: Michael I. Days 9000 <br />Preston Street Wichita,<br /> KS 87213 </p>
                                        </li>
                                        <li>
                                            <p><i className="fas fa-phone-square" />Phone: <a href="tel:+1-888705770">+1-888 705 770</a></p>
                                        </li>
                                        <li>
                                            <p><i className="fas fa-envelope" />Email: <a href="mailto:contactinfo@gmail.com">contactinfo@gmail.com</a></p>
                                        </li>
                                    </ul>
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