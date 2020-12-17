import React, { Component } from 'react';
import Product from '../components/areaclient/product';
import { connect } from 'react-redux';
import Productsection from '../components/areaclient/shop/productsection';
import { actAddToCart } from './../actions/index';
class productscontainer extends Component {

    renderData = (data) => data.map((value, key) => (value.price > this.props.range[0] && value.price < this.props.range[1])?( 
        <Product
            data={value}
            key={key}
            onAddToCart={(product)=>this.props.onAddToCart(product)}
        />
    ):null)

    render() {
        return (
            <Productsection>
                {this.renderData(this.props.data)}
            </Productsection>
        );
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddToCart: (product) => {
            dispatch(actAddToCart(product, 1))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(productscontainer);