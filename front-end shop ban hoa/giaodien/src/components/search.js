import React, { Component } from 'react';

class Search extends Component {
    onChange = (e) => {
        var ketqua = [];
        if (this.props.data != null) {
            this.props.data.forEach((item) => {
                if (this.props.targetParent == null) {
                    if (item[this.props.target].toString().toLowerCase().indexOf(e.target.value) !== -1) {
                        ketqua.push(item);
                    }
                }
                else
                {
                    if (item[this.props.targetParent][this.props.target].toString().toLowerCase().indexOf(e.target.value) !== -1) {
                        ketqua.push(item);
                    }
                }
            })
        }
        this.props.getSearchData(ketqua)
    }
    render() {
        return (
            <div>
                <input onChange={(e) => this.onChange(e)} name="search" id="search" style={{ textAlign: "center" }} className="form-control" type="text" placeholder="Tìm kiếm" />
            </div>
        );
    }
}

export default Search;