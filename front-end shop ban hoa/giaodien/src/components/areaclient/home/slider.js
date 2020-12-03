import React, { Component } from 'react';

class slider extends Component {
    render() {
        return (
            <div id="slides-shop" className="cover-slides">
                <div className="slides-control" style={{ height: '100%' }}>
                    <ul className="slides-container" style={{position: 'relative', height: '100%' }}>
                        <li className="text-center" style={{  height: '100%'}}>
                            <img src="images/banner-02.jpg" alt="" style={{position: 'absolute', left: '0', height: '100%', width: '100%' }} />
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h1 className="m-b-20 wow bounceInUp"><strong>Chào mừng bạn đến với <br /> <span className="brand" >Flower Shop</span></strong></h1>
                                        {/* <p className="m-b-40">See how your users experience your website in realtime or view <br /> trends to see any changes in performance over time.</p>
                                        <p><a className="btn hvr-hover" href="/#">Shop New</a></p> */}
                                    </div>
                                </div>
                            </div>
                            <div className="overlay-background" />
                        </li>

                        
                    </ul>
                </div>
            </div>
        );
    }
}

export default slider;