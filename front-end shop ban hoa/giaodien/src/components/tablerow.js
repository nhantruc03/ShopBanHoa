import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
class TableDataRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onEdit: false
        }
    }

    editClick = () => {
        this.setState({
            onEdit: !this.state.onEdit
        })
    }

    deleteClick = () => {
        Axios.get('http://localhost:9000/' + this.props.obj + '/delete/' + this.props.data._id)
            .then((res) => {
                console.log('a');
                console.log(res.data);
            })
        this.props.onDelete(this.props.data._id);
    }

    renderData = () =>
        this.props.keydata.map((value, key) => {
            if (value === "Status") {
                var stt;
                if (this.props.data[value] === true) {
                    stt = "Khả dụng";
                }
                else {
                    stt = "Không khả dụng";
                }

                return (
                    <td key={key} > {stt}</td>
                )
            }
            if (this.props.data[value]) {
                if (this.props.data[value].includes("image")) {
                    return (
                        <td key={key} ><img style={{ width: 150 }} src={`http://localhost:9000/anh/${this.props.data[value]}`} alt="Logo" /> </td>
                    )
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

    render() {
        if (this.state.onEdit) {
            return (
                <Redirect to={"/edit" + this.props.obj + "/" + this.props.data._id} />
            )
        }
        else {
            return (

                <tr>
                    { this.renderData()}
                    < td >
                        <div className="btn-group">
                            <div onClick={() => this.editClick()} className="btn btn-warning"><i className="fa fa-edit" />Sửa</div>
                            <div onClick={() => this.deleteClick()} className="btn btn-danger xoa"> <i className="fa fa-minus" />Xóa</div>
                        </div>
                    </td >
                </tr >
            );
        }
    }
}

export default TableDataRow;