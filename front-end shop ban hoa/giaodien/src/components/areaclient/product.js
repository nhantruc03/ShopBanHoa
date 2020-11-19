import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
class product extends Component {
    renderType = () => {
        if (this.props.data.promotionprice !== null) {
            return (
                <p className="sale">Giảm giá</p>
            )
        } else {
            return (
                <p className="new">Mới</p>
            )
        }
    }

    renderPrice = () => {
        if (this.props.data.promotionprice !== null) {
            return (
                <div>
                    <NumberFormat style={{ textDecoration: 'line-through' }} value={this.props.data.price} displayType={'text'} thousandSeparator={true} prefix={'đ'} />
                    &nbsp;
                    &nbsp;
                    <NumberFormat value={this.props.data.promotionprice} displayType={'text'} thousandSeparator={true} prefix={'đ'} />
                </div>
            )
        }
        else {
            return (
                <NumberFormat value={this.props.data.price} displayType={'text'} thousandSeparator={true} prefix={'đ'} />
            )
        }
    }

    onAddToCart = (e) => {
        e.preventDefault();
        this.props.onAddToCart(this.props.data);
    }

    render() {
        return (
            <div className={`col-lg-3 col-md-6 special-grid best-seller ${this.props.type}`}>
                <div className="products-single fix">
                    <div className="box-img-hover">
                        <div className="type-lb">
                            {this.renderType()}
                        </div>
                        <img src={`/anh/${this.props.data.image}`} className="img-fluid" alt="asdf" />
                        <div className="mask-icon">
                            <Link className="nav-link link" to={`/product-details.${this.props.data.metatitle}.${this.props.data._id}`} ><i className="fas fa-eye" /></Link>
                            <a onClick={(e) => this.onAddToCart(e)} className="cart" href="/#">Thêm vào giỏ hàng</a>
                        </div>
                    </div>
                    <div className="why-text">
                        <h4>{this.props.data.name}</h4>
                        {this.renderPrice()}
                    </div>
                </div>
            </div>
        );
    }
}

export default product;