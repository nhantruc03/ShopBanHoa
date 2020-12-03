import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import CartContainer from '../../container/CartContainer';

class maintop extends Component {
    handleClick = (e) => {
        e.preventDefault();
        this.props.handleSideBar()
    }

    renderCount = (cart) => {
        var count = 0;
        if (cart.length > 0) {
            cart.forEach(value => {
                count += value.quantity
            })
        }
        return count;
    }
    render() {
        return (
            <header className="main-header">
                {/* Start Navigation */}
                <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-default bootsnav">
                    <div className="container">
                        {/* Start Header Navigation */}
                        <div className="navbar-header">
                            <button onClick={()=>{this.props.handleMenu()}} className="navbar-toggler" type="button" data-toggle="collapse" data-target="/navbar-menu" aria-controls="navbars-rs-food" aria-expanded="false" aria-label="Toggle navigation">
                                <i className="fa fa-bars" />
                            </button>
                            <a className="navbar-brand" href="/"><img src="images/logo-flower-shop.png" className="logo" alt="" /></a>
                        </div>
                        {/* End Header Navigation */}
                        {/* Collect the nav links, forms, and other content for toggling */}
                        <div  className={`collapse navbar-collapse ${this.props.Menu}`} id="navbar-menu">
                            <ul className="nav navbar-nav ml-auto" data-in="fadeInDown" data-out="fadeOutUp">
                                <li className="nav-item active"><NavLink className="nav-link link" to="/" >Trang chủ</NavLink></li>
                                <li className="nav-item"><NavLink className="nav-link arrow link" to="/documents.about-us.5fafa9bd577b6b3c50af73c6" >About us</NavLink></li>
                                <li className="nav-item"><NavLink className="nav-link arrow link" to="/shop" >Cửa hàng</NavLink></li>
                                <li className="nav-item"><NavLink className="nav-link arrow link" to="/Cart" >Giỏ hàng</NavLink></li>
                                <li className="nav-item"><NavLink className="nav-link arrow link" to="/news" >Tin tức</NavLink></li>
                                <li className="nav-item"><NavLink className="nav-link link" to="/contact" >Liên hệ</NavLink></li>
                            </ul>
                        </div>
                        {/* /.navbar-collapse */}
                        {/* Start Atribute Navigation */}
                        <div className="attr-nav">
                            <ul>
                                <li className="search"><a href="/#"><i className="fa fa-search" /></a></li>
                                <li className="side-menu">
                                    <a onClick={(e) => this.handleClick(e)} href="/#">
                                        <i className="fa fa-shopping-bag" />
                                        <span className="badge">{this.renderCount(this.props.cart)}</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {/* End Atribute Navigation */}
                    </div>
                    {/* Start Side Menu */}
                    <CartContainer sideBar={this.props.sideBar} handleSideBar={() => this.props.handleSideBar()} />
                    {/* End Side Menu */}
                </nav>
                {/* End Navigation */}
            </header>
        );
    }
}



const mapStateToProps = state => {
    return {
        cart: state.cart
    }
}

export default connect(mapStateToProps, null)(maintop);