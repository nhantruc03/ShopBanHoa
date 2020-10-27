import Axios from 'axios';
import React, { Component } from 'react';
import Pagination from '../../Pagination';
import Filtersection from './filtersection';
import Productsection from './productsection';
import Breadcumsection from '../breadcumsection';
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
            filter: ''
        }
    }

    async componentDidMount() {
        this._isMounted = true;
        const [products, contents] = await Promise.all([
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
        ]);
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

    getFilterData = (data) => {
        var temp = [];
        if (data === "All") {
            temp = this.state.products;
        } else {
            this.state.products.forEach((value) => {
                if (value.categoryId.includes(data)) {
                    temp.push(value)
                }
            })
        }
        this.setState({
            filterproducts: temp
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
                            <Productsection data={this.getCurData(this.state.filterproducts)} />
                            <Filtersection data={this.state.contents} getFilterData={(e) => this.getFilterData(e)} />
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