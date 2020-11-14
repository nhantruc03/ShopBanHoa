import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class document_item extends Component {
    render() {
        return (
            <li><Link to={`${this.props.data.link}.${this.props.data._id}`}>{this.props.data.name}</Link></li>
        );
    }
}

export default document_item;