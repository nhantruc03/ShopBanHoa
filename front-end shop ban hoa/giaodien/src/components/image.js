import React, { Component } from 'react';

class image extends Component {
    render() {
        return (
            <div style={{display: "inline-block"}}>
                <img style={{ width: 150 }} src={`http://localhost:9000/anh/${this.props.src}`} alt="ảnh đại diện" />
                <div onClick={()=>this.props.remove(this.props.src)} className="btn btn-danger xoa"> <i className="fa fa-minus" /></div>
            </div>
        );
    }
}

export default image;