import React, { Component } from 'react';
import Categories from './categories';
class categoriessection extends Component {
    rennderData = () => this.props.data.map((value, key) => (
        <Categories key={key} data={value} />
    ))
    render() {
        return (
            <div className="categories-shop">
                <div className="container">
                    <div className="row" style={{textAlign:"center"}}>
                        {this.rennderData()}
                    </div>
                </div>
            </div>
        );
    }
}

export default categoriessection;