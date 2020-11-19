import React, { Component } from 'react';
import Filteritem from './filteritem';

class filtersection extends Component {

    renderData = () => this.props.data.map((value, key) => (
        <Filteritem data={value} key={key} getFilterData={(e) => this.props.getFilterData(e)} />
    ))

    handleOnClick = (e) => {
        e.preventDefault();
        this.props.getFilterData("All");
    }

    onChange = (e) => {
        var ketqua = [];
        if (this.props.news != null) {
            this.props.news.forEach((item) => {
                if (item["name"].toString().toLowerCase().indexOf(e.target.value) !== -1) {
                    ketqua.push(item);
                }

            })
        }
        this.props.getSearchData(ketqua)
    }

    render() {
        return (
            <div className="col-xl-3 col-lg-3 col-sm-12 col-xs-12 sidebar-shop-left">
                <div className="product-categori">
                    <div className="search-product">
                        <input onChange={(e) => this.onChange(e)} className="form-control" placeholder="Search here..." type="text" />
                        <button type="submit"> <i className="fa fa-search" /> </button>
                    </div>
                    <div className="filter-sidebar-left">
                        <div className="title-left">
                            <h3>Danh mục</h3>
                        </div>
                        <div className="list-group list-group-collapse list-group-sm list-group-tree" id="list-group-men" data-children=".sub-men">
                            {this.renderData()}

                            <a href="/#" onClick={(e) => this.handleOnClick(e)} className="list-group-item list-group-item-action"> Tất cả </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default filtersection;