import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'

class sidebar extends Component {
    render() {
        return (
            <div>
                <div className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                    {/* Sidebar - Brand */}
                    <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                        <div className="sidebar-brand-icon rotate-n-15">
                            <i className="fas fa-laugh-wink" />
                        </div>
                        <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
                    </a>
                    {/* Divider */}
                    <hr className="sidebar-divider" />
                    {/* Heading */}
                    <div className="sidebar-heading">
                        Interface
                    </div>
                    {/* Nav Item - Pages Collapse Menu */}

                    <Navbar expand="false" style={{ width: "100%", color: "white" }}>
                        Quản lý sản phẩm
                        <Navbar.Toggle style={{ width: 60 }} aria-controls="sanpham" > <i className="fas  fa-briefcase" /></Navbar.Toggle>
                        <Navbar.Collapse style={{ backgroundColor: "white", width: "100%", borderRadius: "6px", marginTop: "5px" }} id="sanpham">
                            <Nav className="mr-auto">
                                <NavLink style={{ color: "#4e73df" }} className="link" to="/listproducts" >Xem danh sách sản phẩm</NavLink>
                                <NavLink style={{ color: "#4e73df" }} className="link" to="/listcategories" >Xem danh sách danh mục</NavLink>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>

                    <hr className="sidebar-divider" />





                </div>

            </div>
        );
    }
}
export default sidebar;