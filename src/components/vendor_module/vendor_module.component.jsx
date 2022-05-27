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

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { MySelect, MyCheckBox, MyAutocomplite, MyTextInput } from '../../stores/elements';
import Typography from '@mui/material/Typography';

const queryString = require('query-string');

export class VendorModule extends React.Component {
  constructor(props) {
    super(props);
        
    this.state = {
      module: 'vendor_module',
      module_name: '',
      is_load: false,
      
      modalItems: false,
      modalVendor: false,
      modalVendorNew: false,
      
      vendors: [],
      
      allItems: [],
      vendor_items: [],
      openVendor: null,
      customAdd: 0,
      
      vendorCities: [],
      allCities: [],
      
      nds: [
        { id: -1, name: 'Без НДС' },
        { id: 10, name: '10% НДС' },
        { id: 20, name: '20% НДС' },
      ],
      nds_: [
        -1, 10, 20
      ],
      
      cities: [],
      city: -1
    };
  }
  
  async componentDidMount(){
    
    let data = await this.getData('get_all');
    
    this.setState({
      module_name: data.module_info.name,
      vendors: data.vendors,
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
   
  changeNDS(item_id, event){
    this.state.vendor_items.map( (item, key) => {
      if( parseInt(item.item_id) == parseInt(item_id) ){
        item.nds = event.target.value;
      }
    } )
    
    this.setState({
      vendor_items: this.state.vendor_items
    })
  }
  
  async openModalItems(vendor){
    let data = {
      vendor_id: vendor.id
    }
    
    let res = await this.getData('get_vendor_items', data);
    
    this.setState({
      modalItems: true,
      allItems: res.all_items,
      vendor_items: res.vendor_items,
      openVendor: vendor
    })
  }
  
  async openModalVendor(vendor){
    let data = {
      vendor_id: vendor.id
    }
    
    let res = await this.getData('get_vendor_info', data);
    
    this.setState({
      modalVendor: true,
      openVendor: res.vendor,
      vendorCities: res.vendor_cities,
      allCities: res.all_cities,
    })
  }
  
  async openModalVendorNew(){
    let data = {
      vendor_id: 0
    }
    
    let res = await this.getData('get_vendor_info', data);
    
    this.setState({
      modalVendorNew: true,
      openVendor: {
        addr: "",
        bill_ex: "0",
        email: "",
        email_2: "",
        inn: "",
        min_price: "",
        name: "",
        need_img_bill_ex: "0",
        ogrn: "",
        phone: "",
        text: "",
      },
      vendorCities: [],
      allCities: res.all_cities,
    })
  }
  
  async saveVendorItems(){
    let data = {
      vendor_id: this.state.openVendor.id,
      items: this.state.vendor_items
    }
    
    let check = data.items.filter( (item, key) => !this.state.nds_.includes( parseInt(item.nds) ) );
    
    if( check.length > 0 ){
      alert('У одной или нескольких позиций не заполнен НДС')
      
      return ;
    }
    
    let res = await this.getData('save_vendor_items', data);
    
    this.setState({
      modalItems: false,
      vendor_items: [],
      openVendor: null
    })
  }
  
  async saveVendor(){
    let data = {
      vendor: this.state.openVendor,
      vendor_cities: this.state.vendorCities,
      city: this.state.city
    }
    
    let res = await this.getData('update_vendor', data);
    
    this.setState({
      modalVendor: false,
      openVendor: null,
      vendorCities: [],
      allCities: [],
      vendors: res.vendors
    })
  }
  
  async addVendor(){
    let data = {
      vendor: this.state.openVendor,
      vendor_cities: this.state.vendorCities,
      city: this.state.city
    }
    
    let res = await this.getData('new_vendor', data);
    
    if( res.st === false ){
      alert(res.text);
      return ;
    }
    
    this.setState({
      modalVendorNew: false,
      openVendor: null,
      vendorCities: [],
      allCities: [],
      vendors: res.vendors
    })
  }
  
  delItem(item_id){
    let items = this.state.vendor_items;
    
    items = items.filter( (item) => parseInt(item.item_id) != parseInt(item_id) );
    
    this.setState({
      vendor_items: items
    })
  }
  
  addItem(item){
    let this_items = this.state.vendor_items;
    let check = this_items.find( (it) => parseInt(it.item_id) == parseInt(item.id) );
    
    if( !check ){
      this_items.push({
        item_id: item.id,
        item_name: item.name,
        nds: -2
      })
    }
    
    this.setState({
      vendor_items: this_items
    })
  }
  
  addItemCustom(){
    let item = this.state.allItems.find( (item1) => parseInt(item1.id) == parseInt(this.state.customAdd) );
    
    this.addItem(item);
  }
  
  testChange(data, event){
    let vendor = this.state.openVendor;
    
    if( data == 'bill_ex' || data == 'need_img_bill_ex' ){
      vendor[data] = event.target.checked === true ? 1 : 0;
    }else{
      vendor[data] = event.target.value;
    }
    
    this.setState({ 
      openVendor: vendor
    })
  }
  
  async changeCity(event){
    let data = {
      city: event.target.value
    }
    
    let res = await this.getData('get_vendors', data);
    
    this.setState({
      vendors: res,
      city: event.target.value
    })
  }
  
  changeSort(data, event){
    this.state.vendor_items.map( (item, key) => {
      if( parseInt(item.item_id) == parseInt(data) ){
        this.state.vendor_items[key]['sort'] = event.target.value;
      }
    })
    
    this.setState({
      vendor_items: this.state.vendor_items
    })
  }
  
  render(){
    return (
      <>
        <Backdrop style={{ zIndex: 99 }} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>
        
        <Dialog
          open={this.state.modalItems}
          fullWidth={true}
          maxWidth={'md'}
          onClose={ () => { this.setState({ modalItems: false }) } }
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Товары поставщика {this.state.openVendor ? this.state.openVendor.name : ''}</DialogTitle>
          <DialogContent style={{ paddingBottom: 10, paddingTop: 10 }}>
            
            <Grid container style={{ paddingTop: 20 }}>
              
              <Grid item xs={12} sm={5} style={{ paddingRight: 10 }}>
                
                <Table>
                  <TableBody>
                    <TableRow style={{ height: 75 }}>
                      <TableCell>
                        <MySelect data={this.state.allItems} value={this.state.customAdd} func={ (event) => { this.setState({ customAdd: event.target.value }) } } />
                      </TableCell>
                      <TableCell><AddIcon onClick={this.addItemCustom.bind(this)} style={{ cursor: 'pointer' }} /></TableCell>
                    </TableRow>
                    
                    { this.state.allItems.map( (item, key) => 
                      <TableRow key={key} style={{ height: 75 }}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell><AddIcon onClick={this.addItem.bind(this, item)} style={{ cursor: 'pointer' }} /></TableCell>
                      </TableRow>
                    ) }
                  </TableBody>
                </Table>
                
              </Grid>
              <Grid item xs={12} sm={7}>
                
                <Table>
                  <TableBody>
                    { this.state.vendor_items.map( (item, key) => 
                      <TableRow key={key} style={{ height: 75 }}>
                        <TableCell>{item.item_name}</TableCell>
                        <TableCell>
                          <MyTextInput label="" value={ item.sort } func={ this.changeSort.bind(this, item.item_id) } />
                        </TableCell>
                        <TableCell>
                          <MySelect data={this.state.nds} value={item.nds} func={ this.changeNDS.bind(this, item.item_id) } />
                        </TableCell>
                        <TableCell><CloseIcon onClick={ this.delItem.bind(this, item.item_id) } style={{ cursor: 'pointer' }} /></TableCell>
                      </TableRow>
                    ) }
                  </TableBody>
                </Table>
                
              </Grid>
              
            </Grid>
              
          </DialogContent>
          <DialogActions>
            <Button onClick={this.saveVendorItems.bind(this)} color="primary">Сохранить</Button>
          </DialogActions>
        </Dialog>
        
        <Dialog
          open={this.state.modalVendor}
          fullWidth={true}
          maxWidth={'md'}
          onClose={ () => { this.setState({ modalVendor: false }) } }
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Поставщик {this.state.openVendor ? this.state.openVendor.name : ''}</DialogTitle>
          <DialogContent style={{ paddingBottom: 10, paddingTop: 10 }}>
            
            <Grid container spacing={3}>
              
              {this.state.openVendor ?
                <>
                  <Grid item xs={12} sm={5}>
                    <MyTextInput label="Наименование" value={ this.state.openVendor.name } func={ this.testChange.bind(this, 'name') } />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MyTextInput label="Описание" value={ this.state.openVendor.text } func={ this.testChange.bind(this, 'text') } />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MyTextInput label="Мин. сумма заявки" value={ this.state.openVendor.min_price } func={ this.testChange.bind(this, 'min_price') } />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <MyTextInput label="ИНН" value={ this.state.openVendor.inn } func={ this.testChange.bind(this, 'inn') } disabled={true} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MyTextInput label="ОГРН" value={ this.state.openVendor.ogrn } func={ this.testChange.bind(this, 'ogrn') } />
                  </Grid>
                  
                  <Grid item xs={12} sm={8}>
                    <MyTextInput label="Адрес компании" value={ this.state.openVendor.addr } func={ this.testChange.bind(this, 'addr') } />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MyTextInput label="Контактное лицо" value={ this.state.openVendor.user } func={ this.testChange.bind(this, 'user') } />
                  </Grid>
                  
                  <Grid item xs={12} sm={4}>
                    <MyTextInput label="Телефон" value={ this.state.openVendor.phone } func={ this.testChange.bind(this, 'phone') } />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MyTextInput label="Почта" value={ this.state.openVendor.email } func={ this.testChange.bind(this, 'email') } />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MyTextInput label="Доп почта" value={ this.state.openVendor.email_2 } func={ this.testChange.bind(this, 'email_2') } />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <MyCheckBox label="Работа по счетам" value={ parseInt(this.state.openVendor.bill_ex) == 1 ? true : false } func={ this.testChange.bind(this, 'bill_ex') } />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MyCheckBox label="Необходима картинка" value={ parseInt(this.state.openVendor.need_img_bill_ex) == 1 ? true : false } func={ this.testChange.bind(this, 'need_img_bill_ex') } />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <MyAutocomplite multiple={true} label='Города' data={this.state.allCities} value={this.state.vendorCities} func={ (event, value) => { console.log(value); this.setState({ vendorCities: value }) } } />
                  </Grid>
                </>
                  :
                null
              }
            </Grid>
              
          </DialogContent>
          <DialogActions>
            <Button onClick={this.saveVendor.bind(this)} color="primary">Сохранить</Button>
          </DialogActions>
        </Dialog>
        
        <Dialog
          open={this.state.modalVendorNew}
          fullWidth={true}
          maxWidth={'md'}
          onClose={ () => { this.setState({ modalVendorNew: false }) } }
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Новый поставщик</DialogTitle>
          <DialogContent>
            
            <Grid container spacing={3}>
              
              {this.state.openVendor ?
                <>
                  <Grid item xs={12} sm={5}>
                    <MyTextInput label="Наименование" value={ this.state.openVendor.name } func={ this.testChange.bind(this, 'name') } />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MyTextInput label="Описание" value={ this.state.openVendor.text } func={ this.testChange.bind(this, 'text') } />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MyTextInput label="Мин. сумма заявки" value={ this.state.openVendor.min_price } func={ this.testChange.bind(this, 'min_price') } />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <MyTextInput label="ИНН" value={ this.state.openVendor.inn } func={ this.testChange.bind(this, 'inn') } />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MyTextInput label="ОГРН" value={ this.state.openVendor.ogrn } func={ this.testChange.bind(this, 'ogrn') } />
                  </Grid>
                  
                  <Grid item xs={12} sm={8}>
                    <MyTextInput label="Адрес компании" value={ this.state.openVendor.addr } func={ this.testChange.bind(this, 'addr') } />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MyTextInput label="Контактное лицо" value={ this.state.openVendor.user } func={ this.testChange.bind(this, 'user') } />
                  </Grid>
                  
                  <Grid item xs={12} sm={4}>
                    <MyTextInput label="Телефон" value={ this.state.openVendor.phone } func={ this.testChange.bind(this, 'phone') } />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MyTextInput label="Почта" value={ this.state.openVendor.email } func={ this.testChange.bind(this, 'email') } />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MyTextInput label="Доп почта" value={ this.state.openVendor.email_2 } func={ this.testChange.bind(this, 'email_2') } />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <MyCheckBox label="Работа по счетам" value={ parseInt(this.state.openVendor.bill_ex) == 1 ? true : false } func={ this.testChange.bind(this, 'bill_ex') } />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MyCheckBox label="Необходима картинка" value={ parseInt(this.state.openVendor.need_img_bill_ex) == 1 ? true : false } func={ this.testChange.bind(this, 'need_img_bill_ex') } />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <MyAutocomplite label='Города' data={this.state.allCities} value={this.state.vendorCities} func={ (event, value) => { this.setState({ vendorCities: value }) } } />
                  </Grid>
                </>
                  :
                null
              }
            </Grid>
              
          </DialogContent>
          <DialogActions>
            <Button onClick={this.addVendor.bind(this)} color="primary">Сохранить</Button>
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
            <Button onClick={this.openModalVendorNew.bind(this)} variant="contained">Добавить поставщика</Button>
          </Grid>
        
          <Grid item xs={12}>
          
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell component="th">Название</TableCell>
                    <TableCell component="th">Назначенные товары</TableCell>
                    <TableCell component="th"><VisibilityIcon /></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { this.state.vendors.map( (item, key) => 
                    <TableRow key={key}>
                      <TableCell><Typography onClick={ this.openModalVendor.bind(this, item) } style={{ cursor: 'pointer', width: 'max-content' }}>{item.name}</Typography></TableCell>
                      <TableCell><DirectionsCarIcon onClick={ this.openModalItems.bind(this, item) } style={{ cursor: 'pointer' }} /></TableCell>
                      <TableCell>{ parseInt(item.is_show) == 1 ? <VisibilityIcon /> : <VisibilityOffIcon /> }</TableCell>
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