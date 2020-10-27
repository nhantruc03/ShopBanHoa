import React, { Component } from 'react';
import Product from '../product';

class productsection extends Component {

    renderData = () => this.props.data.map((value,key)=>(
        <Product data={value} key={key}/>
    ))

    render() {
        return (
            <div className="col-xl-9 col-lg-9 col-sm-12 col-xs-12 shop-content-right">
                <div className="right-product-box">
                    <div className="product-categorie-box">
                        <div className="tab-content">
                            <div role="tabpanel" className="tab-pane fade show active" id="grid-view">
                                <div className="row">
                                    {this.renderData()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default productsection;