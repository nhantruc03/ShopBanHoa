import React, { Component } from 'react';
import Product from '../components/areaclient/product';
import { connect } from 'react-redux';
import Productsection from '../components/areaclient/shop/productsection';
import { actAddToCart } from './../actions/index';
class productscontainer extends Component {

    renderData = (data) => data.map((value, key) => (
        <Product
            data={value}
            key={key}
            onAddToCart={(product)=>this.props.onAddToCart(product)}
        />
    ))

    render() {
        // var { products } = this.props
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

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddToCart: (product) => {
            dispatch(actAddToCart(product, 1))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(productscontainer);