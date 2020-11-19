import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';

class sidecartresult extends Component {

    renderTotal = (cart) => {
        var total = 0;
        if (cart.length > 0) {
            cart.forEach((value) => {
                if (value.product.promotionprice === null) {
                    total += value.quantity * value.product.price;
                } else {
                    total += value.quantity * value.product.promotionprice;
                }

            })
        }
        return <NumberFormat className="result" value={total} displayType={'text'} thousandSeparator={true} prefix={'đ'} />;
    }
    render() {
        var { cart } = this.props
        return (
            <li className="total">
                <Link className="link" to={`/cart`} >
                    <button className="btn btn-default hvr-hover btn-cart">Đến giỏ hàng</button>
                </Link>
                <span className="float-right"><strong>Total: {this.renderTotal(cart)}</strong></span>
            </li>
        );
    }
}

export default sidecartresult;