import React, { Component } from 'react';
import DatePicker from 'material-ui/DatePicker';
import DateIcon from 'material-ui/svg-icons/action/date-range';
import moment from 'moment'

export default class DateComponent extends Component{

  handleChange(e, date){
    this.props.handleDate(moment(date).format('LL'));
  }

  render(){
    return(
      <DatePicker hintText={<DateIcon/>} autoOk={true}
      formatDate={(date) => moment(date).format('LL')}
      onChange={this.handleChange.bind(this)}
       container="inline" style={{display: 'inline-block', paddingTop: 24}}
       />
    )
  }
}
