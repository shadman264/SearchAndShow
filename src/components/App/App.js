import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import UploadIcon from 'material-ui/svg-icons/file/cloud-upload';
import SearchIcon from 'material-ui/svg-icons/action/search';
import DoneIcon from 'material-ui/svg-icons/action/done';
import SearchMenu from '../SearchMenu/SearchMenu';
import TableComponent from '../TableComponent/TableComponent';
import DateComponent from '../DateComponent/DateComponent';
import {Card} from 'material-ui/Card';
import moment from 'moment'
import CircularProgress from 'material-ui/CircularProgress';

const styles = {
  button: {
    margin: 12,
    cursor: 'pointer',
    marginBottom: '2%'
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0
  },
};

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      originalData: [],
      filterData: [],
      filterIndex: 0,
      filterName: '',
      filterDate: '',
      searchInput: '',
      rowsToDisplay: [],
      isLoading: false,
      hasLoaded: false
    }
  }

  handleItemSelected(item){
    this.setState({
      searchInput: item
    }
      , this.handleRowsToDisplay(item));
  }

  handleDate(date){
    this.setState({filterDate: date});
    const arr = this.state.data[this.state.filterIndex];
    for(let i=0;i<arr.length;i++){
      arr[i] = moment(arr[i]).format('LL');
    }

    let indexes = [], i = -1;
    while ((i = arr.indexOf(date, i+1)) !== -1){
        indexes.push(i);
    }
    this.setState({rowsToDisplay: indexes});
  }

  handleRowsToDisplay(val){
    if(this.state.data.length === 0) {
      return
    }
    const arr = this.state.data[this.state.filterIndex];
    let indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) !== -1){
        indexes.push(i);
    }
    this.setState({rowsToDisplay: indexes});
  }

  setLoading(event){
    this.setState({isLoading: true, hasLoaded: false},
      this.uploadFileAndStore(event)
    );
  }

  uploadFileAndStore(event) {
      let file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const rows = e.target.result.split(/\r?\n|\r/);
          let data = rows.map( row => {
            return row.split(',');
          });
          const filterData = data[0];

          let transposedData = this.transpose(data);
          for(let i=0;i<transposedData.length;i++){
            transposedData[i].shift();
          }

          data.splice(0,1);

          this.setState({
            data: transposedData,
            originalData: data,
            filterData,
            isLoading: false,
            hasLoaded: true
          });

        }
        reader.readAsText(file);
      }
  }

  transpose(a) {
    // Calculate the width and height of the Array
    let w = a.length || 0;
    let h = a[0] instanceof Array ? a[0].length : 0;
    // In case it is a zero matrix, no transpose routine needed.
    if(h === 0 || w === 0) { return []; }
    /**
     * @var {Number} i Counter
     * @var {Number} j Counter
     * @var {Array} t Transposed data is stored in this array.
     */
    let i, j, t = [];
    // Loop through every item in the outer array (height)
    for(i=0; i<h; i++) {
      // Insert a new row (array)
      t[i] = [];
      // Loop through every item per item in outer array (width)
      for(j=0; j<w; j++) {
        // Save transposed data.
        t[i][j] = a[j][i];
      }
    }
    return t;
  }

  setFilter(filterName, filterIndex){
    this.setState({
      filterIndex,
      filterName,
      searchInput: '',
      filterDate: ''
    })
  }

  handleUpdateInput(e){
    // this.setState({searchValue: e})
  }

  handleKeyPress(event){
    if (event.keyCode === 13 || event.which === 13){
      this.handleItemSelected(event.target.value);
    }
  }

  render() {
    let dataSource = [];
    let uploadButton = (
      <RaisedButton
        label="Upload"
        labelPosition="after"
        style={styles.button}
        containerElement="label"
        icon={<UploadIcon />}
        secondary
        buttonStyle={{backgroundColor: "forestgreen"}}
      >
        <input type="file"
          onChange={this.setLoading.bind(this)}
          style={styles.exampleImageInput} />
      </RaisedButton>
    );
    if (this.state.data.length > 0) {
      dataSource = Array.from(new Set(this.state.data[this.state.filterIndex]));;
    }

    let searchField = (
      <AutoComplete
        hintText="Type anything"
        dataSource={dataSource}
        floatingLabelText={<SearchIcon />}
        filter={AutoComplete.caseInsensitiveFilter}
        onNewRequest={this.handleItemSelected.bind(this)}
        onUpdateInput={this.handleUpdateInput.bind(this)}
        maxSearchResults={10}
        onKeyPress={this.handleKeyPress.bind(this)}
      />
    );
    if(this.state.filterName === 'Time'){
      searchField = (
        <DateComponent handleDate={this.handleDate.bind(this)}/>
      )
    }

    let displayAll = false;
    if(this.state.searchInput === '' && this.state.filterDate === ''){
      displayAll = true;
    }
    let loadingSpinner = null;
    if (this.state.isLoading){
      loadingSpinner = (
        <div style={{position: 'absolute', top: '45%', left: '45%'}}>
          <CircularProgress size={60} thickness={3} />
        </div>
      )
    }

    return (
      <MuiThemeProvider>
        {loadingSpinner}
        <Card style={{margin: '3%', padding: '2%'}}>
          {searchField}
          <SearchMenu list={this.state.filterData} setFilter={this.setFilter.bind(this)} hasLoaded={this.state.hasLoaded}/>
          {uploadButton}
          <TableComponent displayAll={displayAll} tableHeaders={this.state.filterData} tableRows={this.state.originalData} rowsToDisplay={this.state.rowsToDisplay}/>
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default App;
