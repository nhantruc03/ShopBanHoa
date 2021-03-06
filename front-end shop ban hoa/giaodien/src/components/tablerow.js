import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import { AUTH } from './env';
import NumberFormat from 'react-number-format';
class TableDataRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onEdit: false,
            onView: false
        }
    }

    editClick = () => {
        this.setState({
            onEdit: !this.state.onEdit
        })
    }

    deleteClick = () => {
        Axios.delete('/' + this.props.obj + '/' + this.props.data._id, {
            headers: {
                'Authorization': { AUTH }.AUTH
            }
        })
            .then((res) => {
                console.log(res.data);
            })
        this.props.onDelete(this.props.data._id);
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
                    if (this.props.data[value].includes("image")) {
                        return (
                            <td key={key} ><img style={{ width: 150 }} src={`/anh/${this.props.data[value]}`} alt="Logo" /> </td>
                        )
                    }
                    else {
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
                }
                else {
                    if (value === 'price') {
                        return (
                            <td key={key} > <NumberFormat value={this.props.data[value]} displayType={'text'} thousandSeparator={true} /> </td>
                        )
                    } else {
                        return (
                            <td key={key} > { this.props.data[value]} </td>
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

    updateClick = () => {
        var data = {
            _id: this.props.data._id,
            status: this.props.data.status
        }
        this.props.onUpdate(data)
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
        else {
            if (this.props.review) {
                if (this.props.update) {
                    return (
                        <td>
                            <div className="btn-group">
                                <div onClick={() => this.updateClick()} className="btn btn-success"><i className="fa fa-edit" />Cập nhật</div>
                                <div onClick={() => this.viewClick()} className="btn btn-warning"><i className="fa fa-edit" />Xem</div>
                                <div onClick={() => this.deleteClick()} className="btn btn-danger xoa"> <i className="fa fa-minus" />Xóa</div>
                            </div>
                        </td>
                    )
                }
                else {
                    return (
                        <td>
                            <div className="btn-group">
                                <div onClick={() => this.viewClick()} className="btn btn-warning"><i className="fa fa-edit" />Xem</div>
                                <div onClick={() => this.deleteClick()} className="btn btn-danger xoa"> <i className="fa fa-minus" />Xóa</div>
                            </div>
                        </td>
                    )
                }
            } else {
                return (
                    <td>
                        <div className="btn-group">
                            <div onClick={() => this.editClick()} className="btn btn-warning"><i className="fa fa-edit" />Sửa</div>
                            <div onClick={() => this.deleteClick()} className="btn btn-danger xoa"> <i className="fa fa-minus" />Xóa</div>
                        </div>
                    </td>
                )
            }
        }
    }

    render() {
        if (this.state.onEdit) {
            return (
                <Redirect to={"/admin/edit" + this.props.obj + "/" + this.props.data._id} />
            )
        }
        else if (this.state.onView) {
            return (
                <Redirect to={"/admin/" + this.props.obj + "/" + this.props.data._id} />
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

export default TableDataRow;