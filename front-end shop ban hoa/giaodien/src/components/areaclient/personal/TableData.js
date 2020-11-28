
import React, { Component } from 'react';
import TableDataRow from './TableRow';

class TableData extends Component {
    mappingDataUser = () => this.props.data.map((value, key) => (
        <TableDataRow
            obj={this.props.obj}
            key={key}
            keydata={this.props.keydata}
            data={value}
            watchonly={true}
            noaction={this.props.noaction}
        />
    ))

    printRow = () =>
        this.props.dataRow.map((value, key) => (
            <th key={key}>{value}</th>
        ))

    render() {
        return (
            <div className="col mt-2">
                <div className="table-main table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                {this.printRow()}
                            </tr>
                        </thead>
                        <tbody>
                            {this.mappingDataUser()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default TableData;