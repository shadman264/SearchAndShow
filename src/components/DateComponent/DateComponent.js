import React, { Component } from 'react';
import DatePicker from 'material-ui/DatePicker';

export default class DateComponent extends Component{
  render(){
    return(
      <DatePicker hintText="Select Date" container="inline" style={{display: 'inline-block'}}/>
    )
  }
}
