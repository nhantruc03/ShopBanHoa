import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
class TableRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onView: false
        }
    }

    renderData = () =>
        this.props.keydata.map((value, key) => {
            if (value.includes('Id')) {
                return <td key={key}>{this.props.data[value].name}</td>
            }
            if (this.props.data[value]) {
                if (isNaN(this.props.data[value])) {
                    if (this.isdate(this.props.data[value])) {
                        var temp = new Date(this.props.data[value]);
                        return (
                            <td key={key} > { temp.toLocaleDateString()}</td>
                        )
                    } else {
                        return (
                            <td key={key} > { this.props.data[value]}</td>
                        )
                    }
                }
                else {
                    return (
                        <td key={key} > { this.props.data[value]}</td>
                    )
                }
            }
            else {
                return <td key={key}>null</td>;
            }
        })

    isdate = (val) => {
        try {
            val = val.replaceAll(" ", "");
            var d = new Date(val);
            return !isNaN(d.valueOf());
        } catch {
            return false
        }
    }

    viewClick = () => {
        this.setState({
            onView: true
        })
    }
    renderAction = () => {
        if (this.props.noaction) {

        }
        else if (this.props.watchonly) {
            return (
                <td>
                    <div className="btn-group">
                        <div onClick={() => this.viewClick()} className="btn btn-warning"><i className="fa fa-edit" />Xem</div>
                    </div>
                </td>
            )
        }
    }

    render() {
        if (this.state.onView) {
            return (
                <Redirect to={"/" + this.props.obj + "/" + this.props.data._id} />
            )
        }
        else {
            return (

                <tr>
                    { this.renderData()}

                    {this.renderAction()}

                </tr >
            );
        }
    }
}

export default TableRow;