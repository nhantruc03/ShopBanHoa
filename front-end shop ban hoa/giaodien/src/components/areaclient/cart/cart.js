import Axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
// import { actAddToCart } from '../../../actions';
import { actClearCart, actDeleteFromCart } from '../../../actions';
import { actUpdateFromCart } from '../../../actions';
import * as types from './../../../constants/Message';
import Cartitem from './cartitem';
import Breadcumsection from '../breadcumsection';
import { trackPromise } from 'react-promise-tracker';
import { AUTH } from '../../env';
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
        else {
            result = (<tr>
                <td rowSpan="6">
                    {result}
                </td>
            </tr>)
        }
        return result
    }

    async componentDidMount() {
        const login = localStorage.getItem('login');
        const obj = JSON.parse(login);

        this._isMounted = true;
        const [user] = await trackPromise(Promise.all([
            Axios.get('/users/' + obj.id, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) =>
                    res.data.data
                )
        ]));


        if (user !== null) {
            if (this._isMounted) {
                this.setState({
                    shipname: user.name,
                    shipaddress: user.address,
                    shipmobile: user.phoneNumber
                })
            }
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
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
        let list_temp = [];
        this.props.cart.forEach((value) => {
            if (value.product.promotionprice === null) {
                data = {
                    productId: value.product._id,
                    productName: value.product.name,
                    orderId: curOrder,
                    quantity: value.quantity,
                    price: Number(value.product.price)
                }
            } else {
                data = {
                    productId: value.product._id,
                    productName: value.product.name,
                    orderId: curOrder,
                    quantity: value.quantity,
                    price: Number(value.product.promotionprice)
                }
            }
            list_temp.push(data);

        })

        var data_for_email = {
            shipname: this.state.shipname,
            shipmobile: this.state.shipmobile,
            shipaddress: this.state.shipaddress,
            shipemail: this.state.shipemail,
            cart: list_temp
        }

        const [sendemail, createorder] = await trackPromise(Promise.all([
            Axios.post('/orders/sendEmail', data_for_email, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then(res => {
                    console.log(res.data)
                    return res.data.success
                })
                .catch(err => {
                    console.log(err);
                    return false;
                }),
            Axios.post('/order-details', list_temp, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then(res => {
                    console.log(res.data)
                    return res.data.success
                })
                .catch(err => {
                    console.log(err);
                    return false;
                })
        ]));
        var h = document.getElementById("beforeend");
        if (sendemail === createorder === true) {

            h.insertAdjacentHTML("beforeEnd", '<p className="textcolor" style="font-size: xxx-large;font-weight: bold;color:#b0b435;">Mua hàng thành công</p>');
            setTimeout(() => {
                h.querySelector(':last-child').remove();
                this.props.onClearCart();
                this.setState({
                    done: true
                })
            }, 2000);
        }
        else {
            h.insertAdjacentHTML("beforeEnd", '<p className="textcolor" style="font-size: xxx-large;font-weight: bold;color:#b0b435;">Mua hàng thất bại</p>');
            setTimeout(() => {
                h.querySelector(':last-child').remove();
            }, 2000);
        }
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
                                        <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="shipname" value={this.state.shipname} placeholder="Eg. ADSV..." required />
                                        <label htmlFor="shipmobile"  >Số điện thoại người nhận</label>
                                        <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="shipmobile" value={this.state.shipmobile} placeholder="Eg. 0904434.." required />
                                        <label htmlFor="shipaddress"  >Địa chỉ người nhận</label>
                                        <input onChange={(e) => this.onChange(e)} type="text" className="form-control" name="shipaddress" value={this.state.shipaddress} placeholder="Eg. 34/ABC" required />
                                        <label htmlFor="shipemail"  >Email người nhận</label>
                                        <input onChange={(e) => this.onChange(e)} type="email" className="form-control" name="shipemail" value={this.state.shipemail} placeholder="Eg. abc@gmail.com" required />

                                        <div className="update-box pt-2">
                                            <input defaultValue="Update Cart" type="submit" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="beforeend text-center" id="beforeend">

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
        },
        onClearCart: () => {
            dispatch(actClearCart())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(cart);