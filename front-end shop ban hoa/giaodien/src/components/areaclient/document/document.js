import Axios from 'axios';
import React, { Component } from 'react';
import Breadcumsection from '../breadcumsection';
import { trackPromise } from 'react-promise-tracker';
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
        const [data] = await trackPromise(Promise.all([
            Axios.get('/documents/' + this.props.match.params.id)
                .then((res) => {
                    return (
                        res.data.data
                    )
                })
        ]));
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


    async UNSAFE_componentWillReceiveProps(newprop) {
        this._isMounted = true;
        const [data] = await trackPromise(Promise.all([
            Axios.get('/documents/' + newprop.match.params.id)
                .then((res) => {
                    return (
                        res.data.data
                    )
                })
        ]));
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
                        <div className="row" style={{marginLeft:'5px'}}>
                            <h2 style={{ fontWeight: "bold" }}>{this.state.data.name}</h2>
                        </div>

                        <div className="row" style={{marginBottom: '20px'}}>
                            <div className="col-lg-6">
                                <div className="banner-frame">
                                    <img className="img-fluid" src="images/about-img-1.jpg" alt="" />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <h4 className="noo-sh-title-top">Giới thiệu về <span className="document-brand">Freshshop</span></h4>
                                <p className="about-content">Flower Shop là website phân phối sản phẩm về các loại hoa diệp lễ, hóa cưới, … hàng đầu Việt Nam.

Flower Shop được sinh ra với mong muốn mang cung cấp cho người Việt Nam những bó hoa chất lượng nhất trên thế giới với một phương thức thanh toán đơn giản nhất, giá tốt nhất cùng với đó là dịch vụ chăm sóc khách hàng tuyệt vời. Chúng tôi mong muốn trở thành những người đồng hành và tư vấn cho bạn trong mọi vấn đề liên quan đến Hoa, giúp cho cuộc sống của mọi người giàu màu sắc và mơ mộng. Chúng tôi tin rằng giải trí đúng cách sẽ mang lại những giá trị tốt đẹp cho cuộc sống.</p>

                                {/* <a className="btn hvr-hover" href="/#">Read More</a> */}
                            </div>
                        </div>
 <hr />

                        <div className="row my-5">
<<<<<<< Updated upstream
                            <div className="document-content" style={{ fontSize: '20px' }}
=======
                            <div className="abc" style={{fontSize:'20px'}}
>>>>>>> Stashed changes
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