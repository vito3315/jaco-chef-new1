import React from 'react';

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

import { MySelect, MyCheckBox, MyTextInput, MyAutocomplite } from '../../stores/elements';

const queryString = require('query-string');

class VendorItemPrice_ extends React.Component {
  constructor(props) {
    super(props);
        
    this.state = {
      module: 'vendor_item_price',
      module_name: '',
      is_load: false,
      
      modalDialog: false,
      
      vendors: [],
      vendor: null,
      
      items: [],
      
      cities: [],
      city: '',
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
        window.location.pathname = '/';
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
      vendor: null,
      items: []
    })
  }
  
  async changeVendor(event, value){

    console.log( event.target.value, value )

    let data = {
      city: this.state.city,
      vendor_id: value.id,
    }
    
    let res = await this.getData('get_vendor_items', data);
    
    this.setState({
      items: res,
      vendor: value,
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
        <Backdrop style={{ zIndex: 999 }} open={this.state.is_load}>
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
            <MySelect data={this.state.cities} value={this.state.city} func={ this.changeCity.bind(this) } label='Город' />
          </Grid>
          <Grid item xs={12} sm={3}>
            <MyAutocomplite data={this.state.vendors} value={this.state.vendor} func={ this.changeVendor.bind(this) } multiple={false} label='Поставщик' />
          </Grid>
          <Grid item xs={12} sm={3}>
            <MyCheckBox value={this.state.allCity} func={ (event) => { this.setState({ allCity: event.target.checked }) } } label='На все города поставщика' />
          </Grid>
          <Grid item xs={12} sm={12}>
            <MyCheckBox value={this.state.isPrioriti} func={ (event) => { this.setState({ isPrioriti: event.target.checked }) } } label='Приоритетный постащик' />
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
                        <MySelect data={item.pqs} value={ parseInt(item.rec_pq) == 0 ? '' : item.rec_pq } func={ this.update.bind(this, item.item_id, 'rec_pq') } label='' />
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

export function VendorItemPrice() {
  return (
    <VendorItemPrice_ />
  );
}