import React, { Component } from 'react';
import Axios from 'axios';
import Document from './document_item';
class footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    async componentDidMount() {


        this._isMounted = true;
        const [data] = await Promise.all([
            Axios.post('/documents/getAll')
                .then((res) => {
                    return (
                        res.data.data
                    )
                })
        ]);
        if (data !== null) {
            if (this._isMounted) {
                this.setState({
                    data: data
                })
            }
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    renderDocument = () => this.state.data.map((value, key) => (
        <Document
            key={key}
            data={value}
        />
    ))



    render() {
        return (
            <div>
                <footer>
                    <div className="footer-main">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-4 col-md-12 col-sm-12">
                                    <div className="footer-top-box">
                                        <h3>Giờ làm việc</h3>
                                        <ul className="list-time">
                                            <li>T2 - T6: 08 giờ sáng - 05 giờ chiều</li> <li>Thứ bảy: 10 giờ sáng - 08 giờ tối</li> <li>Chủ nhật: <span>Đóng cửa</span></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="col-lg-4 col-md-12 col-sm-12">
                                    <div className="footer-link">
                                        <h4>Thông tin</h4>
                                        <ul>
                                            {this.renderDocument()}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-12 col-sm-12">
                                    <div className="footer-link-contact">
                                        <h4>Liên lạc</h4>
                                        <ul>
                                            <li>
                                                <p><i className="fas fa-map-marker-alt" />Địa chỉ: Khu phố 6, P.Linh Trung, Q.Thủ Đức <br /> TP.Hồ Chí Minh </p>
                                            </li>
                                            <li>
                                                <p><i className="fas fa-phone-square" />Điện thoại: <a href="tel:+84-919385172">+84-919 385 172</a></p>
                                            </li>
                                            <li>
                                                <p><i className="fas fa-envelope" />Email: <a href="mailto:17520122@gm.uit.edu.vn">17520122@gm.uit.edu.vn</a></p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>

                <div className="footer-copyright">
                    <p className="footer-company">All Rights Reserved. © 2021 <a href="/#">FlowerShop</a>
                        <a href="https://html.design/"> </a></p>
                </div>
            </div>
        );
    }
}

export default footer;