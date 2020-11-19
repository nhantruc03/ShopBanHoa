import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

class sidecartitem extends Component {
    renderPrice = (data) => {
        if (data.product.promotionprice !== null) {
            return (
                <NumberFormat value={data.product.promotionprice} displayType={'text'} thousandSeparator={true} prefix={'đ'} />
            )
        }
        else {
            return (
                <NumberFormat value={data.product.price} displayType={'text'} thousandSeparator={true} prefix={'đ'} />
            )
        }
    }
    render() {
        var { data } = this.props
        return (
            <li>
                <a href="/#" className="photo"><img src={`/anh/${data.product.image}`} className="img-fluid" alt="asdf" /></a>
                <h6><a href="/#">{data.product.name} </a></h6>
                <p>{data.quantity}x - <span className="price">{this.renderPrice(data)}</span></p>
            </li>
        );
    }
}

export default sidecartitem;