import Axios from 'axios';
import React, { Component } from 'react';
import Categoriessection from './categoriessection';
import Newssection from './newssection';

import Productsection from './productsection';
import Slider from './slider';

class home extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            news: [],
            contents: [],
            products: []
        }
    }

    async componentDidMount() {
        this._isMounted = true;
        const [news, contents, products] = await Promise.all([
            Axios.post('/news/getAll?page=1&limit=3')
                .then((res) => {
                    return (
                        res.data.data
                    )
                }),
            Axios.post('/categorycontents/getAll')
                .then((res) => {
                    return (
                        res.data.data
                    )
                }),
            Axios.post('/products/getAll?page=1&limit=10')
                .then((res) => {
                    return (
                        res.data.data
                    )
                })
        ]);
        if (news !== null && contents !== null && products !== null) {
            if (this._isMounted) {
                this.setState({
                    news: news,
                    contents: contents,
                    products: products
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
                <Slider />
                <Categoriessection data={this.state.contents} />
                <Productsection data={this.state.products} />
                <Newssection data={this.state.news} />
            </div>
        );
    }
}

export default home;