import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

class cartitem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
            done: false
        }
    }

    onChange = (e) => {
        if (e.target.value > 0) {
            this.setState({
                [e.target.name]: e.target.value
            });
            
            this.props.onUpdateProduct(this.props.data.product, Number(e.target.value))
        }
    }

    componentDidMount() {
        this.setState({
            quantity: this.props.data.quantity
        })
    }

    renderPrice = (data) => {
        if (data.product.promotionprice !== null) {
            return (
                <p>
                    <NumberFormat style={{ textDecoration: 'line-through' }} value={data.product.price} displayType={'text'} thousandSeparator={true} prefix={'đ'} />
                    &nbsp;
                    &nbsp;
                    <NumberFormat value={data.product.promotionprice} displayType={'text'} thousandSeparator={true} prefix={'đ'} />
                </p>
            )
        }
        else {
            return (
                <p>
                    <NumberFormat value={data.product.price} displayType={'text'} thousandSeparator={true} prefix={'đ'} />
                </p>
            )
        }
    }

    renderTotal = (data) => {
        var total = 0;
        if (data.product.promotionprice === null) {
            total = data.quantity * data.product.price;
        } else {
            total = data.quantity * data.product.promotionprice;
        }

        return <NumberFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'đ'} />;
    }

    onDelete = (e) => {
        e.preventDefault();
        this.props.onDelete(this.props.data.product);
        // console.log(this.props.data.product)
    }

    render() {
        var { data } = this.props
        return (
            <tr>
                <td className="thumbnail-img">
                    <a href="/#">
                        <img className="img-fluid" src={`anh/${data.product.image}`} alt="" />
                    </a>
                </td>
                <td className="name-pr">
                    <a href="/#">
                        {data.product.name}
                    </a>
                </td>
                <td className="price-pr">
                    {this.renderPrice(data)}
                </td>
                <td className="quantity-box"><input type="number" name='quantity' onChange={(e) => this.onChange(e)} size={4} min={0} step={1} className="c-input-text qty text" value={this.state.quantity} /></td>
                <td className="total-pr">
                    <p>{this.renderTotal(data)}</p>
                </td>
                <td className="remove-pr">
                    <a onClick={(e) => this.onDelete(e)} href="/#">
                        <i className="fas fa-times" />
                    </a>
                </td>
            </tr>
        );
    }
}

export default cartitem;