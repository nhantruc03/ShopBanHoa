import Axios from 'axios';
import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import { trackPromise } from 'react-promise-tracker';
import { connect } from 'react-redux';
import { actAddToCart } from '../../../actions';
import Breadcumsection from '../breadcumsection';
const bc = [
    {
        name: "Cửa hàng",
        link: "/shop"
    },
    {
        name: "sản phẩm",
        link: "/shop"
    }
]
class productdetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            quantity: 0,
            loading: true
        }
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    async componentDidMount() {

        this._isMounted = true;
        const [data] = await trackPromise(Promise.all([
            Axios.get('/products/' + this.props.match.params.id)
                .then((res) => {
                    return (
                        res.data.data
                    )
                })
        ]));
        if (data !== null) {
            if (this._isMounted) {
                this.setState({
                    data: data,
                    loading: false
                })
            }
        }
    }
    handleImageLoaded() {
        this.setState({ imageStatus: "loaded" });
    }

    handleImageErrored() {
        this.setState({ imageStatus: "failed to load" });
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    renderPrice = () => {
        if (this.state.data.promotionprice !== null) {
            return <h5><del><NumberFormat value={this.state.data.price} displayType={'text'} thousandSeparator={true} prefix={'đ'} /></del> <NumberFormat value={this.state.data.promotionprice} displayType={'text'} thousandSeparator={true} prefix={'đ'} /></h5>
        }
        else {
            return <h5><NumberFormat value={this.state.data.price} displayType={'text'} thousandSeparator={true} prefix={'đ'} /></h5>
        }
    }

    renderImage = () => {
        if (this.state.data.moreimages) {
            return this.state.data.moreimages.map((value, key) =>
                <div key={key} className="carousel-item"> <img className="d-block w-100" src={`/anh/${value}`} onLoad={this.handleImageLoaded.bind(this)} onError={this.handleImageErrored.bind(this)} alt={key} key={key} /> </div>
            )
        }
    }

    onAddToCart = (e) => {
        e.preventDefault();
        this.props.onAddToCart(this.state.data, Number(this.state.quantity));
    }
    render() {
        if (this.state.loading !== true) {
            return (
                <div>
                    {/* Start All Title Box */}
                    <Breadcumsection data={bc} />
                    {/* End All Title Box */}
                    {/* Start Shop Detail  */}
                    <div className="shop-detail-box-main">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-5 col-lg-5 col-md-6">
                                    <div id="carousel-example-1" className="single-product-slider carousel slide" data-ride="carousel">
                                        <div className="carousel-inner" role="listbox">
                                            <div className="carousel-item active"> <img className="d-block w-100" src={`/anh/${this.state.data.image}`} alt="First slide" /> </div>
                                            {this.renderImage()}
                                        </div>
                                        <a className="carousel-control-prev" href="#carousel-example-1" role="button" data-slide="prev">
                                            <i className="fa fa-angle-left" aria-hidden="true"></i>
                                            <span className="sr-only">Previous</span>
                                        </a>
                                        <a className="carousel-control-next" href="#carousel-example-1" role="button" data-slide="next">
                                            <i className="fa fa-angle-right" aria-hidden="true"></i>
                                            <span className="sr-only">Next</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="col-xl-7 col-lg-7 col-md-6">
                                    <div className="single-product-details">
                                        <h2>{this.state.data.name}</h2>
                                        {this.renderPrice()}
                                        <p className="available-stock"><span> {this.state.data.quantity} sản phẩm có sẵn </span></p><p>
                                        </p><h4>Chi tiết:</h4>
                                        <p>{this.state.data.detail}</p>
                                        <ul>
                                            <li>
                                                <div className="form-group quantity-box">
                                                    <label htmlFor="quantity" className="control-label">Số lượng</label>
                                                    <input onChange={(e) => this.onChange(e)} className="form-control" name="quantity" defaultValue={0} min={0} max={20} type="number" />
                                                </div>
                                            </li>
                                        </ul>
                                        <div className="price-box-bar">
                                            <div className="cart-and-bay-btn">
                                                {/* <a className="btn hvr-hover btn-success" data-fancybox-close href="/#">Mua ngay</a> */}
                                                <a onClick={(e) => this.onAddToCart(e)} className="btn hvr-hover btn-success" data-fancybox-close href="/#">Thêm vào giỏ hàng</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row my-5">
                                <div className="card card-outline-secondary my-4">
                                    <div className="card-header">
                                        <h2>Mô tả sản phẩm</h2>
                                    </div>
                                    <div className="card-body">
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: this.state.data.description
                                            }}>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End Cart */}
                </div>
            );
        }
        else {
            return (
                <div>
                    {/* Start All Title Box */}
                    <Breadcumsection data={bc} />
                    {/* End All Title Box */}
                    {/* Start Shop Detail  */}
                    <div className="shop-detail-box-main">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-5 col-lg-5 col-md-6">
                                    <div id="carousel-example-1" className="single-product-slider carousel slide" data-ride="carousel">
                                        
                                    </div>
                                </div>
                                <div className="col-xl-7 col-lg-7 col-md-6">
                                    <div className="single-product-details">
                                       
                                    </div>
                                </div>
                            </div>
                            <div className="row my-5">
                                <div className="card card-outline-secondary my-4">
                                    <div className="card-header">
                                        <h2>Mô tả sản phẩm</h2>
                                    </div>
                                    <div className="card-body">
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End Cart */}
                </div>
            );
        }

    }
}


const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddToCart: (product, quantity) => {
            if (quantity > 0) {
                dispatch(actAddToCart(product, quantity))
            }
        }
    }
}

export default connect(null, mapDispatchToProps)(productdetails);