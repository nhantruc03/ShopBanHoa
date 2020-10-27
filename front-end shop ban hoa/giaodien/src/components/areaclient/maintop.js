import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import SideMenu from './sidemenu';

class maintop extends Component {
    render() {
        return (
            <header className="main-header">
                {/* Start Navigation */}
                <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-default bootsnav">
                    <div className="container">
                        {/* Start Header Navigation */}
                        <div className="navbar-header">
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="/navbar-menu" aria-controls="navbars-rs-food" aria-expanded="false" aria-label="Toggle navigation">
                                <i className="fa fa-bars" />
                            </button>
                            <a className="navbar-brand" href="/"><img src="images/logo.png" className="logo" alt="" /></a>
                        </div>
                        {/* End Header Navigation */}
                        {/* Collect the nav links, forms, and other content for toggling */}
                        <div className="collapse navbar-collapse" id="navbar-menu">
                            <ul className="nav navbar-nav ml-auto" data-in="fadeInDown" data-out="fadeOutUp">
                                <li className="nav-item active"><NavLink className="nav-link link" to="/" >Trang chủ</NavLink></li>
                                <li className="nav-item"><a className="nav-link" href="about.html">About Us</a></li>
                                <li className="dropdown">
                                    <NavLink className="nav-link arrow link" to="/shop" >Cửa hàng <i className="fa fa-arrow-down" /></NavLink>
                                    <ul className="dropdown-menu">
                                        <li><a href="shop.html">Sidebar Shop</a></li>
                                        <li><a href="shop-detail.html">Shop Detail</a></li>
                                        <li><a href="cart.html">Cart</a></li>
                                        <li><a href="checkout.html">Checkout</a></li>
                                        <li><a href="my-account.html">My Account</a></li>
                                        <li><a href="wishlist.html">Wishlist</a></li>
                                    </ul>
                                </li>
                                <li className="nav-item"><NavLink className="nav-link link" to="/contact" >Liên hệ</NavLink></li>
                            </ul>
                        </div>
                        {/* /.navbar-collapse */}
                        {/* Start Atribute Navigation */}
                        <div className="attr-nav">
                            <ul>
                                <li className="search"><a href="/#"><i className="fa fa-search" /></a></li>
                                <li className="side-menu">
                                    <a href="/#">
                                        <i className="fa fa-shopping-bag" />
                                        <span className="badge">3</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {/* End Atribute Navigation */}
                    </div>
                    {/* Start Side Menu */}
                    <SideMenu />
                    {/* End Side Menu */}
                </nav>
                {/* End Navigation */}
            </header>
        );
    }
}

export default maintop;