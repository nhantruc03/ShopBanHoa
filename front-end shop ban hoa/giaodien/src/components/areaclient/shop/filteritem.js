import Axios from 'axios';
import React, { Component } from 'react';

class filteritem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    async componentDidMount() {
        this._isMounted = true;
        var data = {
            categorycontentsId: this.props.data._id
        }
        const [categories] = await Promise.all([
            Axios.post('/categories/getAll', data)
                .then((res) => {
                    return (
                        res.data.data
                    )
                })
        ]);
        if (categories !== null) {
            if (this._isMounted) {
                this.setState({
                    data: categories
                })
            }
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleOnclick = (e,id) => {
        e.preventDefault();
        this.props.getFilterData(id);
    }

    renderData = () => this.state.data.map((value, key) => (
        <a href="/#" key={key} onClick={(e)=>this.handleOnclick(e,value._id)} className="list-group-item list-group-item-action">{value.name}  </a>
    ))

    render() {
        return (
            <div className="list-group-collapse sub-men">
                <a className="list-group-item list-group-item-action" href={`#${this.props.data._id}`} data-toggle="collapse" aria-expanded="true" aria-controls={this.props.data._id}>{this.props.data.name}</a>
                <div className="collapse" id={this.props.data._id} data-parent="#list-group-men">
                    <div className="list-group">
                        {this.renderData()}
                    </div>
                </div>
            </div>
        );
    }
}

export default filteritem;