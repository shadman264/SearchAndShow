import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AutoComplete from 'material-ui/AutoComplete';
import { Container, Row, Col } from 'reactstrap';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import UploadIcon from 'material-ui/svg-icons/file/cloud-upload';
import SearchIcon from 'material-ui/svg-icons/action/search';
import DoneIcon from 'material-ui/svg-icons/action/done';
import SearchMenu from '../SearchMenu/SearchMenu';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

const styles = {
  button: {
    margin: 12,
    cursor: 'pointer'
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

class App extends Component {

  constructor(props) {
    super(props)
    this.uploadFileAndStore = this.uploadFileAndStore.bind(this);
    this.state = {
      data: [],
      filterData: []
    }
  }

  handleUpdateInput = (value) => {
    // this.setState({
    //   dataSource: [
    //     value,
    //     value + value,
    //     value + value + value,
    //   ],
    // });
  };

  uploadFileAndStore(event) {
      let file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const rows = e.target.result.split(/\r?\n|\r/);
          const data = rows.map( row => {
            return row.split(',');
          });
          const filterData = data[0];
          const transposedData = this.transpose(data);

          this.setState({
            data: transposedData,
            filterData
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

  render() {
    console.log(this.state.data);
    let dataSource = [];
    let uploadButton = (
      <RaisedButton
        label="Upload"
        labelPosition="after"
        style={styles.button}
        containerElement="label"
        backgroundColor="#8BC34A"
        icon={<UploadIcon />}
      >
        <input type="file"
          onChange={this.uploadFileAndStore}
          style={styles.exampleImageInput} />
      </RaisedButton>
    );
    if (this.state.data.length > 0) {
      dataSource = this.state.data[1];
      uploadButton = (
        <RaisedButton
          label="Uploaded"
          labelPosition="after"
          style={styles.button}
          containerElement="label"
          backgroundColor="#4CAF50"
          icon={<DoneIcon />}
        >
          <input type="file"
            onChange={this.uploadFileAndStore}
            style={styles.exampleImageInput} />
        </RaisedButton>
      );
    }

    return (
      <MuiThemeProvider>
        <Card style={{margin: '3%', padding: '2%', height: '520px'}}>
          <Card style={{margin: '3%', padding: '2%'}}>
          <AutoComplete
            hintText="Type anything"
            dataSource={dataSource}
            onUpdateInput={this.handleUpdateInput}
            floatingLabelText={<SearchIcon />}
            filter={AutoComplete.caseInsensitiveFilter}
          />
          <SearchMenu list={this.state.filterData}/>
          {uploadButton}
          </Card>
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default App;
