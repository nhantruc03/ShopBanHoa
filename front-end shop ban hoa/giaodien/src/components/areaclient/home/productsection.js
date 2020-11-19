import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actAddToCart } from '../../../actions';
import Product from '../product';
class productsection extends Component {
    rennderData = () => this.props.data.map((value, key) =>
        <Product
            key={key}
            data={value}
            onAddToCart={(product)=>this.props.onAddToCart(product)}
        />
    )

    render() {
        return (
            <div className="products-box">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="title-all text-center">
                                <h1>Sản phẩm nổi bật</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row special-list">
                        {this.rennderData()}
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddToCart: (product) => {
            dispatch(actAddToCart(product, 1))
        }
    }
}

export default connect(null, mapDispatchToProps)(productsection);
