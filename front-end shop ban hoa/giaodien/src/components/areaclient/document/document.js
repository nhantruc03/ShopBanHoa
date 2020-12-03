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

    async componentWillReceiveProps_UNSAFE(newprop) {
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

                        <div className="row">
                            <div className="col-lg-6">
                                <div className="banner-frame"> 
                                <img className="img-fluid" src="images/about-img-1.jpg" alt="" />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <h2 className="noo-sh-title-top">We are <span>Freshshop</span></h2>
                                <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
                                voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
                                sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
                        Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                <a className="btn hvr-hover" href="#">Read More</a>
                            </div>
                        </div>
                        <div className="row my-5">
                            <div className="col-sm-6 col-lg-4">
                                <div className="service-block-inner">
                                    <h3>We are Trusted</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-4">
                                <div className="service-block-inner">
                                    <h3>We are Professional</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-4">
                                <div className="service-block-inner">
                                    <h3>We are Expert</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                                </div>
                            </div>
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