import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';

class TableRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onView: false
        }
    }

    renderData = () =>
        this.props.keydata.map((value, key) => {
            var stt;
            if (value === "isDeleted") {

                if (this.props.data[value] === true) {
                    stt = "Không khả dụng";
                }
                else {
                    stt = "Khả dụng";
                }

                return (
                    <td key={key} > {stt}</td>
                )
            }
            if (value === "status") {
                if (this.props.data[value] === true) {
                    stt = "Đã xử lý";
                }
                else {
                    stt = "Chưa xử lý";
                }

                return (
                    <td key={key} > {stt}</td>
                )
            }
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
                    if (value === 'price') {
                        return (
                            <td key={key} ><NumberFormat value={this.props.data[value]} displayType={'text'} thousandSeparator={true} prefix={'đ'} /></td>

                        )
                    }
                    else {
                        return (
                            <td key={key} > { this.props.data[value]}</td>
                        )
                    }
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
                    <Link to={"/" + this.props.obj + "/" + this.props.data._id} className="btn btn-warning"><i className="fa fa-edit" />Xem</Link>
                </td>
            )
        }
    }

    render() {
        return (
            <tr>
                { this.renderData()}
                {this.renderAction()}
            </tr >
        );
    }
}

export default TableRow;