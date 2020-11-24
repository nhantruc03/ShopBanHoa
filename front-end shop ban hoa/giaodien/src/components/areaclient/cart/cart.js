import Axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
// import { actAddToCart } from '../../../actions';
import { actDeleteFromCart } from '../../../actions';
import { actUpdateFromCart } from '../../../actions';
import * as types from './../../../constants/Message';
import Cartitem from './cartitem';
import Breadcumsection from '../breadcumsection';
import {AUTH} from '../../env';
const bc = [
    {
        name: "Giỏ hàng",
        link: "/"
    }
]
class cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shipname: '',
            shipmobile: '',
            shipemail: '',
            shipaddress: '',
            done: false
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    renderData = (cart) => {
        var result = types.MSG_CART_EMPTY;
        if (cart.length > 0) {
            console.log(cart)
            result = cart.map((value, key) => {
                return (
                    <Cartitem
                        key={key}
                        data={value}
                        onDelete={this.props.onDeleteProduct}
                        onUpdateProduct={this.props.onUpdateProduct}
                    />
                )
            })
        }
        return result;
    }


    onSubmit = async (e) => {
        e.preventDefault();
        const login = localStorage.getItem('login');
        const obj = JSON.parse(login);
        var data = {
            customerId: obj.id,
            shipname: this.state.shipname,
            shipmobile: this.state.shipmobile,
            shipaddress: this.state.shipaddress,
            shipemail: this.state.shipemail
        }

        console.log(data)

        var curOrder = await Axios.post('/orders', data, {
            headers: {
                'Authorization': { AUTH }.AUTH
            }
        })
            .then(res => {
                return (
                    res.data.data._id
                )
            })
            .catch(err => {
                console.log(err);
            })


        this.props.cart.forEach(async (value) => {
            if (value.product.promotionprice === null) {
                data = {
                    productId: value.product._id,
                    orderId: curOrder,
                    quantity: value.quantity,
                    price: Number(value.product.price)
                }
            } else {
                data = {
                    productId: value.product._id,
                    orderId: curOrder,
                    quantity: value.quantity,
                    price: Number(value.product.promotionprice)
                }
            }
            console.log(data)
            await Axios.post('/order-details', data,{
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then(res => {
                    console.log(res.data.data);
                })
                .catch(err => {
                    console.log(err);
                })
        })
        this.setState({
            done: true
        })
    }

    render() {
        if (this.state.done) {
            return (
                <Redirect to="/" />
            )
        } else {
            return (
                <div>
                    <Breadcumsection data={bc} />
                    <div className="cart-box-main">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="table-main table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Images</th>
                                                    <th>Product Name</th>
                                                    <th>Price</th>
                                                    <th>Quantity</th>
                                                    <th>Total</th>
                                                    <th>Remove</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.renderData(this.props.cart)}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="row my-5">
                                <div className="col-lg-12 col-sm-12">
                                    <form className="form-group" onSubmit={(e) => this.onSubmit(e)}>
                                        <label htmlFor="shipname"  >Tên người nhận</label>
                                        <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="shipname" placeholder="Eg. ADSV..." required />
                                        <label htmlFor="shipmobile"  >Số điện thoại người nhận</label>
                                        <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="shipmobile" placeholder="Eg. 0904434.." required />
                                        <label htmlFor="shipaddress"  >Địa chỉ người nhận</label>
                                        <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="shipaddress" placeholder="Eg. 34/ABC" required />
                                        <label htmlFor="shipemail"  >Email người nhận</label>
                                        <input onChange={(e) => this.onChange(e)} type="email" className="form-control" name="shipemail" placeholder="Eg. abc@gmail.com" required />
                                        <div className="update-box pt-2">
                                            <input defaultValue="Update Cart" type="submit" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onDeleteProduct: (product) => {
            dispatch(actDeleteFromCart(product))
        },
        onUpdateProduct: (product, quantity) => {
            dispatch(actUpdateFromCart(product, quantity))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(cart);