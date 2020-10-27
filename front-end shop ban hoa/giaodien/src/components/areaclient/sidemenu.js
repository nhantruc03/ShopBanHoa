import React, { Component } from 'react';

class sidemenu extends Component {
    render() {
        return (
            <div className="side">
                <a href="/#" className="close-side"><i className="fa fa-times" /></a>
                <li className="cart-box">
                    <ul className="cart-list">
                        <li>
                            <a href="/#" className="photo"><img src="images/img-pro-01.jpg" className="cart-thumb" alt="" /></a>
                            <h6><a href="/#">Delica omtantur </a></h6>
                            <p>1x - <span className="price">$80.00</span></p>
                        </li>
                        <li>
                            <a href="/#" className="photo"><img src="images/img-pro-02.jpg" className="cart-thumb" alt="" /></a>
                            <h6><a href="/#">Omnes ocurreret</a></h6>
                            <p>1x - <span className="price">$60.00</span></p>
                        </li>
                        <li>
                            <a href="/#" className="photo"><img src="images/img-pro-03.jpg" className="cart-thumb" alt="" /></a>
                            <h6><a href="/#">Agam facilisis</a></h6>
                            <p>1x - <span className="price">$40.00</span></p>
                        </li>
                        <li className="total">
                            <a href="/#" className="btn btn-default hvr-hover btn-cart">VIEW CART</a>
                            <span className="float-right"><strong>Total</strong>: $180.00</span>
                        </li>
                    </ul>
                </li>
            </div>
        );
    }
}

export default sidemenu;