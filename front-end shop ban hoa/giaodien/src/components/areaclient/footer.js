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
                                        <h3>Business Time</h3>
                                        <ul className="list-time">
                                            <li>Monday - Friday: 08.00am to 05.00pm</li> <li>Saturday: 10.00am to 08.00pm</li> <li>Sunday: <span>Closed</span></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-12 col-sm-12">
                                    <div className="footer-top-box">
                                        <h3>Newsletter</h3>
                                        <form className="newsletter-box">
                                            <div className="form-group">
                                                <input type="email" name="Email" placeholder="Email Address*" />
                                                <i className="fa fa-envelope" />
                                            </div>
                                            <button className="btn hvr-hover" type="submit">Submit</button>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-12 col-sm-12">
                                    <div className="footer-top-box">
                                        <h3>Social Media</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                        <ul>
                                            <li><a href="/#"><i className="fab fa-facebook" aria-hidden="true" /> </a></li>
                                            <li><a href="/#"><i className="fab fa-twitter" aria-hidden="true" /> </a></li>
                                            <li><a href="/#"><i className="fab fa-linkedin" aria-hidden="true" /> </a></li>
                                            <li><a href="/#"><i className="fab fa-google-plus" aria-hidden="true" /> </a></li>
                                            <li><a href="/#"><i className="fa fa-rss" aria-hidden="true" /> </a></li>
                                            <li><a href="/#"><i className="fab fa-pinterest-p" aria-hidden="true" /> </a></li>
                                            <li><a href="/#"><i className="fab fa-whatsapp" aria-hidden="true" /> </a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-lg-4 col-md-12 col-sm-12">
                                    <div className="footer-widget">
                                        <h4>About Freshshop</h4>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-12 col-sm-12">
                                    <div className="footer-link">
                                        <h4>Information</h4>
                                        <ul>
                                            {this.renderDocument()}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-12 col-sm-12">
                                    <div className="footer-link-contact">
                                        <h4>Contact Us</h4>
                                        <ul>
                                            <li>
                                                <p><i className="fas fa-map-marker-alt" />Address: Michael I. Days 3756 <br />Preston Street Wichita,<br /> KS 67213 </p>
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
                </footer>

                <div className="footer-copyright">
                    <p className="footer-company">All Rights Reserved. © 2020 <a href="/#">FlowerShop</a>
                    <a href="https://html.design/"> </a></p>
                </div>
            </div>
        );
    }
}

export default footer;