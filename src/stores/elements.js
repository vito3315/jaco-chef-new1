import React from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import TextField from '@material-ui/core/TextField';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';

import Grid from '@material-ui/core/Grid';
import ruLocale from "date-fns/locale/ru";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { alpha } from '@material-ui/core/styles'

import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';

export class MyDaterange extends React.PureComponent {
  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
    };
  }
  
  render(){
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
        <DateRangePicker
          allowSameDateSelection={true}
          showTodayButton={true}
          startText={this.props.startText}
          endText={this.props.endText}
          value={this.props.value}
          inputFormat="yyyy-MM-dd"
          //mask="____-__-__"
          onChange={this.props.func}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField style={{ width: '100%' }} {...startProps} />
              <TextField style={{ width: '100%' }} {...endProps} />
            </React.Fragment>
          )}
        />
      </LocalizationProvider>
    )
  }
}

export class MyAutocomplite extends React.PureComponent {
  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
    };
  }
  
  render(){
    return (
      <Stack spacing={3}>
        <Autocomplete
          disableCloseOnSelect={true}
          multiple={true}
          id={ this.props.id ?? null }
          options={this.props.data}
          getOptionLabel={(option) => option.name}
          value={this.props.value}
          onChange={this.props.func}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              label={this.props.label}
              placeholder={this.props.placeholder}
            />
          )}
        />
      </Stack>
    )
  }
}

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
          multiple={ this.props.multiple && this.props.multiple === true ? true : false }
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
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
        <Grid container justifyContent="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            size="small"
            color="primary"
            format="yyyy-MM-dd"
            style={{ width: '100%' }}
            //margin="normal"
            //id="date-picker-inline"
            label={this.props.label}
            value={this.props.value}
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