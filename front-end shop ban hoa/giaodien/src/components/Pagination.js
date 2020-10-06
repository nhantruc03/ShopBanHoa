import React, { Component } from 'react';

class Pagination extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         pageNumbers: []
    //     }
    //     for (let i = 1; i <= Math.ceil(this.props.totalPosts / this.props.postsPerPage); i++) {
    //         this.state.pageNumbers.push(i);
    //     }
    // }



    renderRow = () => {
        return (
            this.props.totalPosts.map(number => (
                <li key={number} className='page-item'>
                    <button onClick={() => this.props.paginate(number)} className='page-link'>
                        {number}
                    </button>
                </li>
            ))

        )
    }
    render() {
        return (
            <nav>
                <ul className='pagination'>
                    {this.renderRow()}
                </ul>
            </nav >
        );
    }
}

export default Pagination;