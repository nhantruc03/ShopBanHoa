import Axios from 'axios';
import React, { Component } from 'react';
import Pagination from '../../Pagination';
import Filtersection from './filtersection';
import Breadcumsection from '../breadcumsection';
import { trackPromise } from 'react-promise-tracker';
import ProductsContainer from '../../../container/ProductsContainer';


const bc = [
    {
        name: "Cửa hàng",
        link: "/shop"
    }
]
class shop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            filterproducts: [],
            contents: [],
            currentPage: 1,
            postsPerPage: 10,
            listPage: [],
            filter: '',
            range: [0, 5000000]
        }
    }


    async componentDidMount() {
        this._isMounted = true;
        const [products, contents] = await trackPromise(Promise.all([
            Axios.post('/products/getAll')
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
                })
        ]));
        if (products !== null && contents !== null) {
            if (this._isMounted) {
                this.setState({
                    products: products,
                    filterproducts: products,
                    contents: contents
                })
            }
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getlistpage = (data) => {
        var listpage = [];
        for (let i = 1; i <= Math.ceil(data.length / this.state.postsPerPage); i++) {
            listpage.push(i);
        }
        return listpage;
    }

    getCurData = (data) => {
        var indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        var indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        return data.slice(indexOfFirstPost, indexOfLastPost);

    }

    paginate = (pageNumber) => {
        this.setState(
            {
                currentPage: pageNumber
            });
    }

    getFilterData = (id) => {
        var temp = [];
        if (id === "All") {
            temp = this.state.products;
        } else {
            this.state.products.forEach((value) => {
                if (value.categoryId.includes(id)) {
                    temp.push(value)
                }
            })
        }
        this.setState({
            filterproducts: temp
        })
    }

    getSearchData = (data) => {
        this.setState({
            filterproducts: data
        })
    }

    onChangeRange = (data) => {
        this.setState({
            range: data
        })
    }


    render() {
        return (
            <div>
                {/* Start Shop Page  */}
                <Breadcumsection data={bc} />
                <div className="shop-box-inner">
                    <div className="container">
                        <div className="row">
                            {/* <Productsection data={this.getCurData(this.state.filterproducts)} /> */}
                            <ProductsContainer range={this.state.range} data={this.getCurData(this.state.filterproducts)} />
                            <Filtersection onChangeRange={(e) => this.onChangeRange(e)} curProducts={this.state.filterproducts} getSearchData={(e) => this.getSearchData(e)} products={this.state.products} data={this.state.contents} getFilterData={(e) => this.getFilterData(e)} />
                        </div>
                        <Pagination postsPerPage={this.state.postsPerPage} totalPosts={this.getlistpage(this.state.filterproducts)} paginate={(e) => this.paginate(e)} />
                    </div>
                </div>
                {/* End Shop Page */}
            </div>
        );
    }
}

export default shop;