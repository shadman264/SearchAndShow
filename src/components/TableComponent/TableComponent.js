import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


export default class TableComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tableHeaders: [],
      tableRows: []
    }
  }
  render(){
    if(this.props.tableHeaders.length === 0) {
      return null;
    }
    const tableHeaders = (
      this.props.tableHeaders.map((header, id) => {
        return(
          <TableHeaderColumn key={id}>{header}</TableHeaderColumn>
        )
      })
    )
    const that = this;
    const tableRows = (
      this.props.tableRows.map((row, id) => {
        if(that.props.rowsToDisplay.length > 0 && that.props.rowsToDisplay.indexOf(id) === -1) {
          return null;
        }
        const tableRow = row.map((data, id) => {
          return(
            <TableRowColumn key={id}>{data}</TableRowColumn>
          )
        });
        return <TableRow key={id}>{tableRow}</TableRow>;
      })
    )
    return(
      <Table>
        <TableHeader>
          <TableRow>
            {tableHeaders}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableRows}
        </TableBody>
      </Table>
    )
  }
}
