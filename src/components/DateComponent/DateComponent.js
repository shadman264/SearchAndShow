import React, { Component } from 'react';
import DatePicker from 'material-ui/DatePicker';
import DateIcon from 'material-ui/svg-icons/action/date-range';
import moment from 'moment'

export default class DateComponent extends Component{
  render(){
    return(
      <DatePicker hintText={<DateIcon/>} autoOk={true}
      formatDate={() => moment().format('LL')}
       container="inline" style={{display: 'inline-block', paddingTop: 24}}
       />
    )
  }
}
