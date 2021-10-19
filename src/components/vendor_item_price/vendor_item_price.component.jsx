import React from 'react';
import { useHistory } from "react-router-dom";

import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { MySelect, MyCheckBox, MyTextInput } from '../../stores/elements';

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

class VendorItemPrice_ extends React.Component {
  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
      history: this.props.history,
      module: 'vendor_item_price',
      module_name: '',
      is_load: false,
      
      modalDialog: false,
      
      vendors: [],
      vendor: 0,
      
      items: [],
      
      cities: [],
      city: -1,
      allCity: false,
      isPrioriti: false
    };
  }
  
  async componentDidMount(){
    
    let data = await this.getData('get_all');
    
    this.setState({
      module_name: data.module_info.name,
      cities: data.cities
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
      setTimeout( () => {
        this.setState({
          is_load: false
        })
      }, 300 )
      console.log( err )
    });
  }
   
  async changeCity(event){
    let data = {
      city: event.target.value
    }
    
    let res = await this.getData('get_vendors', data);
    
    this.setState({
      vendors: res,
      city: event.target.value,
      vendor: 0,
      items: []
    })
  }
  
  async changeVendor(event){
    let data = {
      city: this.state.city,
      vendor_id: event.target.value,
    }
    
    let res = await this.getData('get_vendor_items', data);
    
    this.setState({
      items: res,
      vendor: event.target.value,
    })
  }
  
  update(item_id, data, event){
    let this_items = this.state.items;
    
    
    
    this_items.map( (item, key) => {
      if( parseInt(item.item_id) == parseInt(item_id) ){
        this_items[key][data] = event.target.value;
        
        this_items[key]['price'] = (parseFloat(this_items[key]['full_price']) / parseFloat(this_items[key]['rec_pq'])).toFixed(2);
      }
    } )
    
    this.setState({
      items: this_items
    })
  }
  
  async save(){
    let data = {
      vendor_id: this.state.vendor,
      items: this.state.items,
      city_id: this.state.city,
      all_city: this.state.allCity === true ? 1 : 0,
      is_prioriti: this.state.isPrioriti === true ? 1 : 0,
    }
    
    if( data.all_city == 1 ){
      if( confirm("Точно сохранить на все города поставщика ?") ){
        let res = await this.getData('save_price', data);
      }
    }else{
      let res = await this.getData('save_price', data);
    }
  }
  
  render(){
    return (
      <>
        <Backdrop className={this.state.classes.backdrop} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>
        
        <Dialog
          open={this.state.modalDialog}
          onClose={ () => { this.setState({ modalDialog: false }) } }
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title"></DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              
              
              
              
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary">Сохранить</Button>
          </DialogActions>
        </Dialog>
        
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>
          
          <Grid item xs={12} sm={3}>
            <MySelect classes={this.state.classes} data={this.state.cities} value={this.state.city} func={ this.changeCity.bind(this) } label='Город' />
          </Grid>
          <Grid item xs={12} sm={3}>
            <MySelect classes={this.state.classes} data={this.state.vendors} value={this.state.vendor} func={ this.changeVendor.bind(this) } label='Поставщик' />
          </Grid>
          <Grid item xs={12} sm={3}>
            <MyCheckBox classes={this.state.classes} value={this.state.allCity} func={ (event) => { this.setState({ allCity: event.target.checked }) } } label='На все города поставщика' />
          </Grid>
          <Grid item xs={12} sm={12}>
            <MyCheckBox classes={this.state.classes} value={this.state.isPrioriti} func={ (event) => { this.setState({ isPrioriti: event.target.checked }) } } label='Приоритетный постащик' />
          </Grid>
          
          <Grid item xs={12}>
            <Button onClick={this.save.bind(this)} variant="contained">Сохранить</Button>
          </Grid>
          
          
          <Grid item xs={12}>
              
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Позиция</TableCell>
                    <TableCell></TableCell>
                    <TableCell>Комментарий</TableCell>
                    <TableCell>Цена за упаковку</TableCell>
                    <TableCell>Объем упаковки</TableCell>
                    <TableCell>Цена за 1 ед.</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { this.state.items.map( (item, key) => 
                    <TableRow key={key}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.name_for_vendor}</TableCell>
                      <TableCell>
                        <MyTextInput label="" value={item.comment} func={ this.update.bind(this, item.item_id, 'comment') } />
                      </TableCell>
                      <TableCell>
                        <MyTextInput label="" value={item.full_price} func={ this.update.bind(this, item.item_id, 'full_price') } />
                      </TableCell>
                      <TableCell>
                        <MySelect classes={this.state.classes} data={item.pqs} value={item.rec_pq} func={ this.update.bind(this, item.item_id, 'rec_pq') } label='' />
                      </TableCell>
                      <TableCell>{item.price} / {item.ei_name}</TableCell>
                    </TableRow>
                  ) }
                </TableBody>
              </Table>
            </TableContainer>
            
          </Grid>
            
          
        </Grid>
      </>
    )
  }
}

export function VendorItemPrice () {
  const classes = useStyles();
  let history = useHistory();
  
  return (
    <VendorItemPrice_ classes={classes} history={history} />
  );
}