import Axios from 'axios';
import React, { Component } from 'react';
import Breadcumsection from '../breadcumsection';
const bc = [
    {
        name: "Tài liệu",
        link: "/"
    }
]
class document extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }
    async componentDidMount() {
        console.log(this.props.match.params.id)
        this._isMounted = true;
        const [data] = await Promise.all([
            Axios.get('/documents/' + this.props.match.params.id)
                .then((res) => {
                    return (
                        res.data.data
                    )
                })
        ]);
        if (data !== null) {
            if (this._isMounted) {
                this.setState({
                    data: data
                })
            }
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    async componentWillReceiveProps(newprop){
        this._isMounted = true;
        const [data] = await Promise.all([
            Axios.get('/documents/' + newprop.match.params.id)
                .then((res) => {
                    return (
                        res.data.data
                    )
                })
        ]);
        if (data !== null) {
            if (this._isMounted) {
                this.setState({
                    data: data
                })
            }
        }
    }

    render() {
        return (
            <div>
                <Breadcumsection data={bc} />
                <div className="shop-detail-box-main">
                    <div className="container">
                        <div className="row" >
                            <h1 style={{ fontWeight: "bold" }}>{this.state.data.name}</h1>
                        </div>
                        <div className="row my-5">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: this.state.data.content
                                }}>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default document;