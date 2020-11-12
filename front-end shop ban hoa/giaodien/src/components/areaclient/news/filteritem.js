import React, { Component } from 'react';

class filteritem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    handleOnclick = (e) => {
        e.preventDefault();
        this.props.getFilterData(this.props.data._id);
    }


    render() {
        return (
            <div className="list-group-collapse sub-men">
                <a className="list-group-item list-group-item-action" onClick={(e)=>this.handleOnclick(e)} href={`#${this.props.data._id}`} data-toggle="collapse" aria-expanded="true" aria-controls={this.props.data._id}>{this.props.data.name}</a>
            </div>
        );
    }
}

export default filteritem;