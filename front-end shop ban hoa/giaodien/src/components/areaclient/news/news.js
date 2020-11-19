import Axios from 'axios';
import React, { Component } from 'react';
import Pagination from '../../Pagination';
import Filtersection from './filtersection';
import Breadcumsection from '../breadcumsection';
import News from './news_row';
const bc = [
    {
        name: "Danh sách tin tức",
        link: "/"
    }
]
class news extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            filternews: [],
            newscategories: [],
            currentPage: 1,
            postsPerPage: 10,
            listPage: [],
            filter: ''
        }
    }

    async componentDidMount() {
        this._isMounted = true;
        const [data, newscategories] = await Promise.all([
            Axios.post('/news/getAll')
                .then((res) => {
                    return (
                        res.data.data
                    )
                }),
            Axios.post('/newscategories/getAll')
                .then((res) => {
                    return (
                        res.data.data
                    )
                })
        ]);
        if (data !== null && newscategories !== null) {
            if (this._isMounted) {
                this.setState({
                    data: data,
                    filternews: data,
                    newscategories: newscategories
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
        console.log(id)
        var temp = [];
        if (id === "All") {
            temp = this.state.data;
        } else {
            this.state.data.forEach((value) => {
                if (value.newscategoryId.includes(id)) {
                    temp.push(value)
                }
            })
        }
        this.setState({
            filternews: temp
        })
    }


    getSearchData = (data) =>{
        this.setState({
            filternews: data
        })
    }
    renderData = () => this.state.filternews.map((value, key) => (
        <News data={value} key={key} />
    ))
    render() {
        return (
            <div>
                {/* Start Shop Page  */}
                <Breadcumsection data={bc} />
                <div className="shop-box-inner">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-9 col-lg-9 col-sm-12 col-xs-12 shop-content-right">
                                <div className="right-product-box">
                                    <div className="product-categorie-box">
                                        <div className="tab-content">
                                            <div role="tabpanel" className="tab-pane fade show active" id="grid-view">
                                                <div className="row">
                                                    {this.renderData()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Filtersection getSearchData={(e)=> this.getSearchData(e)} news={this.state.data} data={this.state.newscategories} getFilterData={(e) => this.getFilterData(e)} />
                        </div>
                        <Pagination postsPerPage={this.state.postsPerPage} totalPosts={this.getlistpage(this.state.filternews)} paginate={(e) => this.paginate(e)} />
                    </div>
                </div>
                {/* End Shop Page */}
            </div>
        );
    }
}

export default news;