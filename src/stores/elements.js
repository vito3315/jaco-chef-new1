import React from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


import TextField from '@mui/material/TextField';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';

//import Grid from '@mui/material/Grid';
import ruLocale from "date-fns/locale/ru";

/*import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';*/

import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
//import DatePicker from '@mui/lab/DatePicker';
import Typography from '@mui/material/Typography';

import DatePicker from '@mui/lab/DatePicker';

export class MyDaterange extends React.PureComponent {
  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
    };
  }
  
  render(){
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale} size="small">
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
          size="small"
          disableCloseOnSelect={true}
          multiple={true}
          id={ this.props.id ?? null }
          options={this.props.data}
          getOptionLabel={(option) => option.name}
          value={this.props.value}
          onChange={this.props.func}
          filterSelectedOptions
          multiple={ this.props.multiple && this.props.multiple === true ? true : false }
          isOptionEqualToValue={(option, value) => option.id === value.id}
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
      <FormControl fullWidth variant="outlined" size="small">
        <InputLabel>{this.props.label}</InputLabel>
        <Select
          value={this.props.value}
          label={this.props.label}
          onChange={ this.props.func }
          multiple={ this.props.multiple && this.props.multiple === true ? true : false }
        >
          <MenuItem value=""><em>None</em></MenuItem>
          { this.props.data.map( (item, key) =>
            <MenuItem key={key} value={item.id}>{item.name}</MenuItem>
          ) }
        </Select>
      </FormControl>
    )
  }
}

export class MyTextInput extends React.PureComponent {
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
        value={this.props.value}
        onChange={this.props.func}
        disabled={ this.props.disabled || this.props.disabled === true ? true : false }
        type={ this.props.type ? this.props.type : 'text' }
        variant="outlined" 
        size={'small'} 
        color='primary'
        style={{ width: '100%' }} 
      />
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
        step={600}
        inputProps={{
          step: 600, // 5 min
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
      <>
        <Typography>{this.props.label}</Typography>
        <DatePicker
          format="YYYY-MM-DD"
          
          multiple
          sort
          
          //mask="____/__/__"
          //multiple={ this.props.multiple && this.props.multiple === true ? true : false }
          //disableCloseOnSelect={true}
          //inputFormat="yyyy-MM-dd"
          style={{ width: '100%' }}
          label={this.props.label}
          value={this.props.value}
          onChange={this.props.func}
        />
      </>
    )
  }
}

export class MyDatePickerNew extends React.PureComponent {
  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
    };
  }
  
  render(){
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
        <DatePicker
          multiple={true}
          inputFormat="yyyy-MM-dd"
          label={this.props.label}
          value={this.props.value}
          onChange={this.props.func}
          renderInput={(params) => <TextField variant="outlined" size={'small'} color='primary' style={{ width: '100%' }} {...params} />}
        />
      </LocalizationProvider>
    )
  }
}

export class MyDatePickerTest extends React.PureComponent {
  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
    };
  }
  
  render(){
    return (
      <DatePicker 
        multiple
        value={this.props.value}
        onChange={this.props.func}
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