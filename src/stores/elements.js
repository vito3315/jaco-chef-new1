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

import ruLocale from "date-fns/locale/ru";

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

import Typography from '@mui/material/Typography';

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

export class MyDaterange extends React.PureComponent {
  constructor(props) {
    super(props);
        
    this.state = {
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
          mask="____-__-__"
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
    };
  }
  
  render(){
    return (
      <Stack spacing={3}>
        <Autocomplete
          size="small"
          disableCloseOnSelect={true}
          //multiple={true}
          id={ this.props.id ?? null }
          options={this.props.data}
          getOptionLabel={(option) => option.name}
          value={this.props.value}
          onChange={this.props.func}
          filterSelectedOptions
          multiple={ this.props.multiple && this.props.multiple === true ? true : false }
          isOptionEqualToValue={(option, value) => parseInt(option.id) === parseInt(value.id) }
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
    };
  }
  
  render(){
    return (
      <FormControl fullWidth variant="outlined" size="small">
        <InputLabel>{this.props.label}</InputLabel>
        <Select
          value={this.props.value}
          label={this.props.label}
          disabled={ this.props.disabled || this.props.disabled === true ? true : false }
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
      type: 'text'
    };
  }
  
  render(){
    return (
      <TextField 
        label={this.props.label}
        value={this.props.value}
        onChange={this.props.func}
        onBlur={this.props.onBlur ? this.props.onBlur : null}
        disabled={ this.props.disabled || this.props.disabled === true ? true : false }
        variant="outlined" 
        size={'small'} 
        color='primary'
        multiline={this.props.multiline ? this.props.multiline : false}
        maxRows={this.props.maxRows ? this.props.maxRows : 1}
        type={ this.props.type ? this.props.type : this.state.type }
        style={{ width: '100%' }} 
      />
    )
  }
}

export class MyTimePicker extends React.PureComponent {
  constructor(props) {
    super(props);
        
    this.state = {
      thisVal: ''
    };
  }
  
  onChange(event){
    this.setState({
      thisVal: event.target.value
    })
  }

  onBlur(){
    this.setState({
      thisVal: ''
    })

    this.props.onBlur();
  }

  render(){
    return (
      <TextField
        variant="outlined"
        size="small"
        color="primary"
        label={this.props.label}
        type="time"
        id={ this.props.id ? this.props.id : null }
        value={ this.props.func ? this.props.value : this.state.thisVal }
        style={{ width: '100%' }}
        onChange={this.props.func ? this.props.func : this.onChange.bind(this)}
        onBlur={this.props.onBlur ? this.onBlur.bind(this) : null}
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
    };
  }
  
  render(){
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
        <DatePicker
          multiple={true}
          mask="____-__-__"
          inputFormat="yyyy-MM-dd"
          label={this.props.label}
          value={formatDate(this.props.value)}
          onChange={this.props.func}
          renderInput={(params) => <TextField variant="outlined" size={'small'} color='primary' style={{ width: '100%' }} {...params} />}
        />
      </LocalizationProvider>
    )
  }
}

export class MyCheckBox extends React.PureComponent {
  constructor(props) {
    super(props);
        
    this.state = {
    };
  }
  
  render(){
    return (
      <FormGroup row style={ this.props.style ? this.props.style : {} }>
        <FormControlLabel
          control={
            <Checkbox
              disabled={ this.props.disabled || this.props.disabled === true ? true : false }
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

export class TextEditor extends React.PureComponent {
  constructor(props) {
    super(props);
        
    this.state = {
    };
  }
  
  render(){
    return (
      <tinymce-editor
        apiKey="r0ihgs4ukfpmudzw7aexxgb88tnx5jw26h1xx9x6409ji3gx"
        id={this.props.id}
        menubar={true}
        plugins="advlist autolink lists link image charmap print preview anchor
        searchreplace visualblocks code fullscreen
        insertdatetime media table paste code help wordcount"
        toolbar="undo redo | formatselect | bold italic backcolor |
        alignleft aligncenter alignright alignjustify |
        bullist numlist outdent indent | removeformat | help"
        content_style="body
        {
          font-family:Helvetica,Arial,sans-serif;
          font-size:14px
        }"
        >

        {this.props.text}

      </tinymce-editor>
    )
  }
}