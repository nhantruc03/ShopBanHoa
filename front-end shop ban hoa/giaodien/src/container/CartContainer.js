import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidecartresult from '../components/areaclient/sidecart/sidecartresult';
import Sidecart from '../components/areaclient/sidecart/sidecart';
import Sidecartitem from '../components/areaclient/sidecart/sidecartitem';
import * as Message from './../constants/Message';
class cartcontainer extends Component {

    renderData = (cart) => {
        var result = Message.MSG_CART_EMPTY;
        if (cart.length > 0) {
            result = cart.map((item, index) => {
                return (
                    <Sidecartitem
                        key={index}
                        data={item}
                        index={index}
                    />
                )
            })
        }
        return result;
    }

    renderTotal = (cart) => {
        var result = null;
        if(cart.length >0){
            result= <Sidecartresult cart={cart}/>
        }
        return result;
    }

    render() {
        var { cart } = this.props
        return (
            <Sidecart sideBar={this.props.sideBar} handleSideBar={() => this.props.handleSideBar()}>
                {this.renderData(cart)}
                {this.renderTotal(cart)}
            </Sidecart>
        );
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart
    }
}

export default connect(mapStateToProps, null)(cartcontainer);