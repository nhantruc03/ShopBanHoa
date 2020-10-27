import React, { Component } from 'react';
import Product from '../product';
class productsection extends Component {
    rennderData = () => this.props.data.map((value, key) =>
        <Product key={key} data={value} />
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
                    {/* <div className="row">
                        <div className="col-lg-12">
                            <div className="special-menu text-center">
                                <div className="button-group filter-button-group">
                                    <button className="active" data-filter="*">Tất cả</button>
                                    <button data-filter=".top-featured">Được xem nhiều nhất</button>
                                    <button data-filter=".best-seller">Được mua nhiều nhất</button>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div className="row special-list">
                        {this.rennderData()}
                        {/* <Product type="best-seller" /> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default productsection;