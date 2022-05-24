import React from 'react';
import { useHistory } from "react-router-dom";

import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import Paper from '@mui/material/Paper';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { MySelect, MyDatePickerNew, MyTextInput, MyAutocomplite } from '../../stores/elements';
import Typography from '@mui/material/Typography';

const queryString = require('query-string');

const theme = createTheme({
  palette: {
    primary: {
      main: '#c03',
    }
  },
});

const useStyles = makeStyles({
  formControl: {
    //margin: theme.spacing(1),
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  tableCel: {
    textAlign: 'center',
    borderRight: '1px solid #e5e5e5',
    padding: 15,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: "#e5e5e5",
    },
  },
  tableCelHead: {
    textAlign: 'center',
    padding: 15
  },
  customCel: {
    backgroundColor: "#bababa",
    textAlign: 'center',
    borderRight: '1px solid #e5e5e5',
    padding: 15,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: "#e5e5e5",
    },
  },
  timePicker: {
    width: '100%'
  }
});

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

class PromoItemsStat_ extends React.Component {
  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
      history: this.props.history,
      module: 'promo_items_stat',
      module_name: '',
      is_load: false,
      
      date_start: formatDate(new Date()),
      date_end: formatDate(new Date()),
      point_list: [],
      choosePoint: [],

      stats: [],

      chooseItem: null,
      items_list: [],
      promoName: ''
    };
  }
  
  async componentDidMount(){
    let data = await this.getData('get_all');
    
    this.setState({
      module_name: data.module_info.name,
      point_list: data.points,
      stats: data.stats,
      items_list: data.items
    })
    
    document.title = data.module_info.name;
  }
  
  getData = (method, data = {}) => {
    
    this.setState({
      is_load: true
    })
    
    return fetch('https://jacochef.ru/api/index_new.php', {
      method: 'POST',
      headers: {
        'Content-Type':'application/x-www-form-urlencoded'},
      body: queryString.stringify({
        method: method, 
        module: this.state.module,
        version: 2,
        login: localStorage.getItem('token'),
        data: JSON.stringify( data )
      })
    }).then(res => res.json()).then(json => {
      
      if( json.st === false && json.type == 'redir' ){
        this.state.history.push("/");
        return;
      }
      
      if( json.st === false && json.type == 'auth' ){
        window.location.pathname = '/auth';
        return;
      }
      
      setTimeout( () => {
        this.setState({
          is_load: false
        })
      }, 300 )
      
      return json;
    })
    .catch(err => { 
      console.log( err )
      this.setState({
        is_load: false
      })
    });
  }
   
  async getStat() {
      console.log('choosePoint=', this.state.choosePoint)
    let data = {
      choosePoint      : this.state.choosePoint,
      date_start    : this.state.date_start,
      date_end      : this.state.date_end,
      promoName     : this.state.promoName,
      chooseItem    : this.state.chooseItem,
    };
    
    let res = await this.getData('get_all', data);

    console.log( res )

    this.setState({
        stats: res.stats
    })

    //setTimeout( () => {
    //  this.filterNumber();
    //}, 300 )
  }

  choosePoint(event, data){
    this.setState({
      choosePoint: data
    })
  }

  chooseData(data, val, val2){
    this.setState({
      [data]: data != 'promoName' && data != 'chooseItem' ? formatDate(val) : data == 'chooseItem' ? val2 : val
    })
  }

  chooseDataNew(data, val, val2){

    if( data == 'promoName' ){
      this.setState({
        [data]: val.target.value,
        chooseItem: val.target.value.length > 0 ? null : this.state.chooseItem
      })
    }

    if( data == 'chooseItem' ){
      this.setState({
        [data]: val2,
        promoName: val2 ? '' : this.state.promoName
      })
    }
  }

  render(){
    return (
      <>
        <Backdrop className={this.state.classes.backdrop} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>
          
          <Grid item xs={12} sm={2}>
            <MyAutocomplite classes={this.state.classes} data={this.state.point_list} value={this.state.choosePoint} func={ this.choosePoint.bind(this) } multiple={true} label='Точка' />
          </Grid>

          <Grid item xs={12} sm={2}>
            <MyDatePickerNew label={'Дата от'} value={this.state.date_start} func={ this.chooseData.bind(this, 'date_start') } />
          </Grid>
          <Grid item xs={12} sm={2}>
            <MyDatePickerNew label={'Дата до'} value={this.state.date_end} func={ this.chooseData.bind(this, 'date_end') } />
          </Grid>

          <Grid item xs={12} sm={3}>
            <MyTextInput value={this.state.promoName} func={ this.chooseDataNew.bind(this, 'promoName') } label='Промокод' />
          </Grid>
          <Grid item xs={12} sm={3}>
            <MyAutocomplite classes={this.state.classes} data={this.state.items_list} value={this.state.chooseItem} func={ this.chooseDataNew.bind(this, 'chooseItem') } multiple={false} label='Товар' />
          </Grid>
          
          
          
          <Grid item xs={12} sm={3}>
            <Button variant="contained" onClick={this.getStat.bind(this)}>Обновить</Button>
          </Grid>
          
          

           <Grid item xs={12} sm={6}>
            
            <Table size={'small'}>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Название</TableCell>
                  <TableCell>Кол-во</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {!this.state.stats ? null :
                    this.state.stats.map((item, key) =>
                        <TableRow key={key}  >
                            <TableCell style={{ textAlign: 'center' }}>{key + 1} </TableCell>
                            <TableCell style={{ textAlign: 'left' }}>{item.name} </TableCell>
                            <TableCell style={{ textAlign: 'left' }}>{item.count} </TableCell>
                        </TableRow>
                    )}
                
              
              </TableBody>
            
            </Table>
            
          </Grid>
          
        </Grid>
      </>
    )
  }
}

export function PromoItemsStat () {
  const classes = useStyles();
  let history = useHistory();
  
  return (
    <PromoItemsStat_ classes={classes} history={history} />
  );
}