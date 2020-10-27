import React, { Component } from 'react';

class categories extends Component {
    render() {
        return (
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <a className="btn hvr-hover" href="/#">{this.props.data.name}</a>
            </div>
        );
    }
}

export default categories;