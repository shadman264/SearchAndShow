import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FilterIcon from 'material-ui/svg-icons/content/filter-list';


export default class SearchMenu extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      filter: 'Filter',
      hasLoaded: this.props.hasLoaded
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.hasLoaded != this.props.hasLoaded){
      this.setState({hasLoaded: nextProps.hasLoaded})
    }
  }

  handleClick = (event) => {
    // This prevents ghost click.
    event.preventDefault();
    if (this.state.hasLoaded) {
      this.setState({
        open: true,
        anchorEl: event.currentTarget,
      });
    }
  };

  handleItemClick(item, id){
    this.setState({
      filter: item,
      open: false
    });
    this.props.setFilter(item, id);
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    let menu = null;
    if(this.props.list.length > 0){
      const that = this;
      const listItems = this.props.list.map((item,id) => {
        return <MenuItem key={id} primaryText={item} onClick={that.handleItemClick.bind(this, item, id)}/>
      });
      menu = (
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
          animation={PopoverAnimationVertical}
        >
          <Menu>
            {listItems}
          </Menu>
        </Popover>
      );
    }

    return (
      <span style={{paddingLeft: '1%'}}>
        <RaisedButton
          onClick={this.handleClick}
          label={this.state.filter}
          icon={<FilterIcon />}
          primary
        />
          {menu}
      </span>
    );
  }
}
