import Axios from 'axios';
import React, { Component } from 'react';
import Breadcumsection from '../breadcumsection';
const bc = [
    {
        name: "Danh sách tin tức",
        link: "/news"
    },
    {
        name: "Tin tức",
        link: "/shop"
    }
]
class newsdetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }
    async componentDidMount() {

        this._isMounted = true;
        const [data] = await Promise.all([
            Axios.get('/news/' + this.props.match.params.id)
                .then((res) => {
                    return (
                        res.data.data
                    )
                })
        ]);
        console.log(data)
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

    render() {
        return (
            <div>
                {/* Start All Title Box */}
                <Breadcumsection data={bc} />
                {/* End All Title Box */}
                {/* Start Shop Detail  */}
                <div className="shop-detail-box-main">
                    <div className="container">
                        <div className="row" >
                            <h1 style={{ fontWeight: "bold" }}>{this.state.data.name}</h1>
                            <img className="d-block" style={{ width: '100%' }} src={`/anh/${this.state.data.image}`} alt="anh" />
                        </div>
                        <div className="row my-5">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: this.state.data.description
                                }}>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Cart */}
            </div>
        );

    }
}

export default newsdetails;