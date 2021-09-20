import React from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import TextField from '@material-ui/core/TextField';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

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
        variant="outlined"
        size="small"
        color="primary"
        label={this.props.label}
        type="time"
        value={ this.props.value }
        className={this.state.classes.timePicker}
        onChange={this.props.func}
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

export class MyDatePicker extends React.PureComponent {
  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
    };
  }
  
  render(){
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justifyContent="space-around">
          <KeyboardDatePicker
            margin="normal"
            variant="outlined"
            size="small"
            color="primary"
            label={this.props.label}
            //format="yyyy-MM-dd"
            value={ this.props.value }
            onChange={this.props.func}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
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