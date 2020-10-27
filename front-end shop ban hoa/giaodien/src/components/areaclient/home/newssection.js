import React, { Component } from 'react';
import News from './news';

class newssection extends Component {
    rennderData = () => this.props.data.map((value, key) => (
        <News key={key} data={value} />
    ))

    render() {
        return (
            <div className="latest-blog">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="title-all text-center">
                                <h1>Tin tức mới nhất</h1>
                                <p>Danh sách tin tức</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {this.rennderData()}
                    </div>
                </div>
            </div>
        );
    }
}

export default newssection;