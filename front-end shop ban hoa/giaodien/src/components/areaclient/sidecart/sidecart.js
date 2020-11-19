import React, { Component } from 'react';

class sidecart extends Component {
    handleClick = (e) => {
        e.preventDefault();
        this.props.handleSideBar();
    }
    render() {
        var { children } = this.props
        return (
            <div className={`side ${this.props.sideBar}`}>
                <a href="/#" onClick={(e) => this.handleClick(e)} className="close-side"><i className="fa fa-times" /></a>
                <li className="cart-box">
                    <ul className="cart-list">
                        {children}
                    </ul>
                </li>
            </div>
        );
    }
}

export default sidecart;