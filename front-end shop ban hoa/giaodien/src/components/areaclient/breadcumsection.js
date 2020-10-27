import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
class breadcumsection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    }
    rederData = () => this.props.data.map((value, i, arr) => {
        if (arr.length - 1 === i) {
            return (
                <li key={i} className="breadcrumb-item active"><NavLink style={{ color: "black" }} className="link" to={value.link} >{value.name}</NavLink></li>
            )
        } else {
            return (
                <li key={i} className="breadcrumb-item"><NavLink className="link" to={value.link} >{value.name}</NavLink></li>
            )
        }
   
    })

    render() {
        return (
            <div className="all-title-box">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2>{this.props.data[this.props.data.length-1].name}</h2>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><NavLink className="link" to="/" >Trang chủ</NavLink></li>
                                {this.rederData()}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default breadcumsection;