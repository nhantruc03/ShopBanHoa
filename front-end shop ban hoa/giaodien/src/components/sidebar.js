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
                        <div className="sidebar-brand-text mx-3">Shop bán hoa</div>
                    </a>
                    {/* Divider */}
                    <hr className="sidebar-divider" />
                    {/* Heading */}
                    <div className="sidebar-heading">
                        Interface
                    </div>
                    {/* Nav Item - Pages Collapse Menu */}
                    <Navbar expand="false" style={{ width: "100%", color: "white" }}>
                        Người dùng
                        <Navbar.Toggle style={{ width: 60 }} aria-controls="nguoidung" > <i className="fas  fa-user-circle" /></Navbar.Toggle>
                        <Navbar.Collapse style={{ backgroundColor: "white", width: "100%", borderRadius: "6px", marginTop: "5px" }} id="nguoidung">
                            <Nav className="mr-auto">
                                <NavLink style={{ color: "#4e73df" }} className="link" to="/admin/listusers" >Danh sách người dùng</NavLink>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <hr className="sidebar-divider" />
                    <Navbar expand="false" style={{ width: "100%", color: "white" }}>
                        Quản lý sản phẩm
                        <Navbar.Toggle style={{ width: 60 }} aria-controls="sanpham" > <i className="fas  fa-briefcase" /></Navbar.Toggle>
                        <Navbar.Collapse style={{ backgroundColor: "white", width: "100%", borderRadius: "6px", marginTop: "5px" }} id="sanpham">
                            <Nav className="mr-auto">
                                <NavLink style={{ color: "#4e73df" }} className="link" to="/admin/listproducts" >Danh sách sản phẩm</NavLink>
                                <NavLink style={{ color: "#4e73df" }} className="link" to="/admin/listcategories" >Danh sách danh mục</NavLink>
                                <NavLink style={{ color: "#4e73df" }} className="link" to="/admin/listcategorycontents" >Danh sách loại danh mục</NavLink>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <hr className="sidebar-divider" />
                    <Navbar expand="false" style={{ width: "100%", color: "white" }}>
                        Quản lý hóa đơn
                        <Navbar.Toggle style={{ width: 60 }} aria-controls="hoadon" > <i className="fas  fa-briefcase" /></Navbar.Toggle>
                        <Navbar.Collapse style={{ backgroundColor: "white", width: "100%", borderRadius: "6px", marginTop: "5px" }} id="hoadon">
                            <Nav className="mr-auto">
                                <NavLink style={{ color: "#4e73df" }} className="link" to="/admin/listorders" >Danh sách hóa đơn</NavLink>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <hr className="sidebar-divider" />
                    <Navbar expand="false" style={{ width: "100%", color: "white" }}>
                        Quản lý tin tức
                        <Navbar.Toggle style={{ width: 60 }} aria-controls="tintuc" > <i className="fas  fa-newspaper" /></Navbar.Toggle>
                        <Navbar.Collapse style={{ backgroundColor: "white", width: "100%", borderRadius: "6px", marginTop: "5px" }} id="tintuc">
                            <Nav className="mr-auto">
                                <NavLink style={{ color: "#4e73df" }} className="link" to="/admin/listnews" >Danh sách tinh tức</NavLink>
                                <NavLink style={{ color: "#4e73df" }} className="link" to="/admin/listnewscategories" >Danh sách danh mục tin</NavLink>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <hr className="sidebar-divider" />
                    <Navbar expand="false" style={{ width: "100%", color: "white" }}>
                        Quản lý chung
                        <Navbar.Toggle style={{ width: 60 }} aria-controls="common" > <i className="fas  fa-bars" /></Navbar.Toggle>
                        <Navbar.Collapse style={{ backgroundColor: "white", width: "100%", borderRadius: "6px", marginTop: "5px" }} id="common">
                            <Nav className="mr-auto">
                                <NavLink style={{ color: "#4e73df" }} className="link" to="/admin/listbanners" >Xem danh sách banner</NavLink>
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