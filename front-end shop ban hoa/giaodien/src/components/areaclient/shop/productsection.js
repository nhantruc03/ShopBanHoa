import React, { Component } from 'react';
// import Product from '../product';
// import { connect } from 'react-redux';
class productsection extends Component {

    // renderData = (data) => data.map((value, key) => (
    //     <Product data={value} key={key} />
    // ))

    render() {
        return (
            <div className="col-xl-9 col-lg-9 col-sm-12 col-xs-12 shop-content-right">
                <div className="right-product-box">
                    <div className="product-categorie-box">
                        <div className="tab-content">
                            <div role="tabpanel" className="tab-pane fade show active" id="grid-view">
                                <div className="row">
                                    {this.props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default productsection