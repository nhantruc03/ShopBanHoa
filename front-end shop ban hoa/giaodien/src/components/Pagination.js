import React, { Component } from 'react';

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNumbers: []
        }
        for (let i = 1; i <= Math.ceil(this.props.totalPosts / this.props.postsPerPage); i++) {
            this.state.pageNumbers.push(i);
        }
    }
    renderRow = (numer) => {
        return (
            <ul className='pagination'>
                {this.state.pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <button onClick={() => this.props.paginate(number)} className='page-link'>
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        )
    }
    render() {
        return (
            <nav>
                {this.renderRow()}
            </nav>
        );
    }
}

export default Pagination;