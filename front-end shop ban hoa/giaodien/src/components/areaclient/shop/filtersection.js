import React, { Component } from 'react';
import Select from 'react-select';
import Filteritem from './filteritem';
import makeAnimated from 'react-select/animated';
import { Slider } from 'antd';
const animatedComponents = makeAnimated();
var option = [
    {
        value: 1,
        label: 'Sắp xếp'
    },
    {
        value: 2,
        label: 'Giá thấp đến cao'
    },
    {
        value: 3,
        label: 'Giá cao đến thấp'
    }
];
class filtersection extends Component {

    renderData = () => this.props.data.map((value, key) => (
        <Filteritem data={value} key={key} getFilterData={(e) => this.props.getFilterData(e)} />
    ))

    handleOnClick = (e) => {
        e.preventDefault();
        this.props.getFilterData("All");
    }
    onSelect = (e) => {
        var list = this.props.curProducts;
        if (e !== null) {
            if (e.value !== 1) {
                let sort = ""
                if (e.value === 2) {
                    sort = "lowest"
                }
                console.log(e.value)
                var a = list.sort((a, b) =>
                    sort === "lowest"
                        ? a.price > b.price
                            ? 1
                            : -1
                        : a.price < b.price
                            ? 1
                            : -1
                );
                this.props.getSearchData(a);
            }
        }
    }

    onChange = (e) => {
        var ketqua = [];
        if (this.props.products != null) {
            this.props.products.forEach((item) => {
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
                        <br />
                        <Select
                            name="option"
                            onChange={(e) => this.onSelect(e)}
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            defaultValue={option[0]}
                            options={option}
                        />
                        <Slider
                            max={5000000}
                            range
                            step={100000}
                            defaultValue={[0, 5000000]}
                            onChange={this.props.onChangeRange}
                            onAfterChange={this.props.onChangeRange}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default filtersection;