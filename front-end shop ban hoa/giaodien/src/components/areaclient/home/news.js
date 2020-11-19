import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class news extends Component {
    render() {
        return (
            <div className="col-md-6 col-lg-4 col-xl-4">
                <div className="blog-box">
                    <div className="blog-img">
                        <img className="img-fluid" src={`/anh/${this.props.data.image}`} alt="" style={{ width: '100%' }} />
                        {/* <div
                            dangerouslySetInnerHTML={{
                                __html: this.props.data.description
                            }}>
                        </div> */}
                    </div>
                    <div className="blog-content">
                        <div className="title-blog">
                            <h3>{this.props.data.name}</h3>
                        </div>
                        <ul className="option-blog">
                            <li><Link className="nav-link link" to={`/news-details.${this.props.data.metatitle}.${this.props.data._id}`} ><i className="fas fa-eye" /></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default news;