import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class news_row extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-sm-6 col-md-6 col-lg-4 col-xl-4">
                    <div className="products-single fix">
                        <div className="box-img-hover">
                            <img src={`anh/${this.props.data.image}`} className="img-fluid" alt="anh" />
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-8 col-xl-8">
                    <div className="why-text full-width">
                        <h4>{this.props.data.name}</h4>
                        <div>
                            {this.props.data.description}
                        </div>
                        <Link className="btn mt-2" style={{ color: "black" }} to={`/news-details/${this.props.data.metatitle}.${this.props.data._id}`}>{`<<Xem tin tức>>`}</Link>
                    </div>.
                </div>
            </div>

        );
    }
}

export default news_row;