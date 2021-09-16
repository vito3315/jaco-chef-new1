import React from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export class MySelect extends React.PureComponent {
  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
    };
  }
  
  render(){
    return (
      <FormControl size="small" variant="outlined" className={this.state.classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">{this.props.label}</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={this.props.value}
          onChange={ this.props.func }
          label={this.props.label}
          size="small"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          { this.props.data.map( (item, key) =>
            <MenuItem key={key} value={item.id}>{item.name}</MenuItem>
          ) }
        </Select>
      </FormControl>
    )
  }
}
  
export class MyTimePicker extends React.PureComponent {
  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
    };
  }
  
  render(){
    return (
      <TextField
        label={this.props.label}
        type="time"
        defaultValue="10:00"
        className={this.state.classes.timePicker}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
      />
    )
  }
}

export class MyCheckBox extends React.PureComponent {
  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
    };
  }
  
  render(){
    return (
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={this.props.value}
              onChange={this.props.func}
              color="primary"
            />
          }
          label={this.props.label}
        />
      </FormGroup>
    )
  }
}