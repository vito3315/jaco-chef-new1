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

//import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';

import Typography from '@mui/material/Typography';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { Editor } from '@tinymce/tinymce-react';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function formatDate(date) {
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

/*export class MyDaterange extends React.PureComponent {
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
}*/

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
          // freeSolo
          // multiple={true}
          id={ this.props.id ?? null }
          options={this.props.data}
          getOptionLabel={(option) => option.name || ''}
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

export class MyAutocomplite2 extends React.PureComponent {
  constructor(props) {
    super(props);
        
    this.state = {
    };
  }
  
  render(){
    if( this.props.id && this.props.id == 'promoName' ){
      return (
        <Stack spacing={3}>
          <Autocomplete
            freeSolo={ this.props.freeSolo ? this.props.freeSolo : false }
            size="small"
            disableCloseOnSelect={true}
            onBlur={this.props.onBlur ? this.props.onBlur : null}
            id={ this.props.id ?? null }
            options={this.props.data}
            getOptionLabel={(option) => option.name}
            value={this.props.value}
            onChange={this.props.func}
            //filterSelectedOptions
            multiple={ this.props.multiple && this.props.multiple === true ? true : false }
            //isOptionEqualToValue={(option, value) => option.id === value.id}
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

    // для Управление точкой управляющего
    if( this.props.id && this.props.id == 'cafe_upr_edit' ){
      return (
        <Stack spacing={3}>
          <Autocomplete
            freeSolo={ this.props.freeSolo ? this.props.freeSolo : false }
            size="small"
            //disableCloseOnSelect={true}
            onBlur={this.props.onBlur ? this.props.onBlur : null}
            id={ this.props.id ?? null }
            
            options={this.props.data.map((option) => option.name)}
  
            value={this.props.value}
            onChange={this.props.func}
            filterSelectedOptions
            multiple={ this.props.multiple && this.props.multiple === true ? true : false }
       
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


    return (
      <Stack spacing={3}>
        <Autocomplete
          freeSolo={ this.props.freeSolo ? this.props.freeSolo : false }
          size="small"
          //disableCloseOnSelect={true}
          onBlur={this.props.onBlur ? this.props.onBlur : null}
          id={ this.props.id ?? null }
          
          options={this.props.data.map((option) => option.name)}

          value={this.props.value}
          onChange={this.props.func}
          //filterSelectedOptions
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
          {this.props.is_none === false ? null : 
            <MenuItem value=""><em>None</em></MenuItem>
          }
          
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
        id={ this.props.id ? this.props.id : null }
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

const inputProps = {
  step: 600,
};

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
        inputProps={inputProps}
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
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
        <DatePicker
          multiple={true}
          mask="____-__-__"
          inputFormat="yyyy-MM-dd"
          label={this.props.label}
          value={formatDate(this.props.value)}
          onChange={this.props.func}
          onBlur={this.props.onBlur ? this.props.onBlur : null}
          renderInput={(params) => <TextField variant="outlined" size={'small'} color='primary' style={{ width: '100%' }} {...params} />}
        />
      </LocalizationProvider>
    )
  }
}

export class MyDatePickerGraph extends React.PureComponent {
  constructor(props) {
    super(props);
        
    let data = this.props.year;
    data = data.split('-')

    this.state = {
      activeValue: formatDate(this.props.year+'-01'),
      minDate: new Date(data[0], parseInt(data[1])-1, 1),
      maxDate: new Date(data[0], parseInt(data[1]), 0),
      arr: []
    };
  }
  
  renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
    pickersDayProps['selected'] = false;
    pickersDayProps['aria-selected'] = false;

    let arr = this.state.arr;
    let res = arr.find( (item) => formatDate(item.date) == formatDate(date) );

    if( res ){
      return <PickersDay {...pickersDayProps} style={{ backgroundColor: 'yellow', color: 'red' }} onClick={ this.chooseDay.bind(this, date) } />;
    }
    
    return <PickersDay {...pickersDayProps} onClick={ this.chooseDay.bind(this, date) }  />;
  };

  chooseDay(newValue, event){
    let arr = this.state.arr;

    let res = arr.find( (item) => formatDate(item.date) == formatDate(newValue) );

    console.log( 'res', res )

    if( !res ){
      arr.push({
        date: formatDate(newValue),
        type: 1
      })

      this.setState({
        arr: arr
      })
    }else{
      let newArr = arr.filter( (item) => formatDate(item.date) != formatDate(newValue) );

      this.setState({
        arr: newArr
      })
    }
  }

  render(){
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
        <StaticDatePicker
          multiple={true}
          minDate={formatDate(this.state.minDate)}
          maxDate={formatDate(this.state.maxDate)}
          displayStaticWrapperAs="desktop"
          label="Week picker"
          
          renderDay={this.props.renderWeekPickerDay}
          renderInput={(params) => <TextField {...params} />}
          inputFormat="yyyy-MM-dd"
          
          value={this.state.activeValue}
          onChange={ () => {} }
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
  render(){
    return (
      <Editor
        apiKey='qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc'
        value={this.props.value}
        onEditorChange={this.props.func}
        init={{
          height: 500,
          //menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | link image | code | fullscreen | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
    )
  }
}

export class MyAlert extends React.Component {
  render(){
    return (
      <Snackbar 
        open={this.props.isOpen} 
        autoHideDuration={30000}
        anchorOrigin={{  
          vertical: 'top',
          horizontal: 'center', 
        }}
        onClose={this.props.onClose}
      >
        <Alert 
          onClose={this.props.onClose} 
          severity={ this.props.status ? "success" : "error" } 
          sx={{ width: '100%' }}
        >
          { this.props.status ? 'Данные успешно сохранены!' : this.props.text }
        </Alert>
      </Snackbar>
    )
  }
}
