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

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { MySelect, MyCheckBox, MyAutocomplite, MyTextInput } from '../../stores/elements';

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

class SkladItemsModule_ extends React.Component {
  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
      history: this.props.history,
      module: 'sklad_items_module',
      module_name: '',
      is_load: false,
      
      cats: [],
      allItems: [],
      vendor_items: [],

      modalItemEdit: false,
      modalItemNew: false,

      itemEdit: null,
      itemName: '',

      checkArtDialog: false,
      checkArtList: [],

      freeItems: []
    };
  }
  
  async componentDidMount(){
    
    let data = await this.getData('get_all');
    
    console.log(data)

    this.setState({
      module_name: data.module_info.name,
      cats: data.cats,
      freeItems: data.items_free
    })
    
    document.title = data.module_info.name;
  }
  
  getData = (method, data = {}, is_load = true) => {
    
    if( is_load == true ){
      this.setState({
        is_load: true
      })
    }
    
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
  
  changeItem(data, event){
    let vendor = this.state.itemEdit;
    
    if( data == 'two_user' || data == 'w_item' || data == 'w_trash' || data == 'w_pf' || data == 'is_show' ){
      vendor.item[data] = event.target.checked === true ? 1 : 0;
    }else{
      vendor.item[data] = event.target.value;
    }
    
    this.setState({ 
      itemEdit: vendor
    })
  }

  async showEditItem(id){
    let data = {
      item_id: id
    }
    
    let res = await this.getData('get_one', data);

    this.setState({
      modalItemEdit: true,
      itemEdit: res,
      itemName: res.item.name
    })
  }

  async saveEditItem(main_item_id = 0){
    let data = {
      id: this.state.itemEdit.item.id,
      item: this.state.itemEdit,
      storages: this.state.itemEdit.this_storages,
      main_item_id: parseInt(main_item_id) == 0 ? this.state.itemEdit.item.id : parseInt(main_item_id)
    }
    
    let res = await this.getData('saveEditItem', data);
    
    if( res.st === false ){
      alert(res.text);
    }else{
      this.setState({ 
        modalItemEdit: false, 
        itemEdit: null,
        checkArtDialog: false,
        checkArtList: []
      })

      res = await this.getData('get_all');
    
      this.setState({
        cats: res.cats,
        freeItems: res.items_free
      })
    }
  }

  async saveNewItem(main_item_id = 0){
    let data = {
      id: this.state.itemEdit.item.id,
      item: this.state.itemEdit,
      storages: this.state.itemEdit.this_storages,
      main_item_id: parseInt(main_item_id) == 0 ? this.state.itemEdit.item.id : parseInt(main_item_id)
    }
    
    let res = await this.getData('saveNewItem', data);
    
    if( res.st === false ){
      alert(res.text);
    }else{
      this.setState({ 
        modalItemNew: false, 
        itemEdit: null,
        checkArtDialog: false,
        checkArtList: []
      })

      res = await this.getData('get_all');
    
      this.setState({
        cats: res.cats,
        freeItems: res.items_free
      })
    }
  }

  async checkArt(){
    let data = {
      id: this.state.itemEdit.item.id,
      art: this.state.itemEdit.item.art,
    }
    
    let res = await this.getData('checkArt', data);

    if( res.st === false ){
      this.setState({ 
        checkArtDialog: true, 
        checkArtList: res.data
      })
    }else{
      this.saveEditItem(0);
    }
  }

  async checkArtNew(){
    let data = {
      id: this.state.itemEdit.item.id,
      art: this.state.itemEdit.item.art,
    }
    
    let res = await this.getData('checkArt', data);

    if( res.st === false ){

      res.data.push({ id: -1, name: this.state.itemEdit.item.name })

      this.setState({ 
        checkArtDialog: true, 
        checkArtList: res.data
      })
    }else{
      this.saveNewItem(0);
    }
  }

  chooseArt(item_id){
    if( this.state.modalItemNew === true ){
      this.saveNewItem(item_id);
    }else{
      this.saveEditItem(item_id);
    }
  }

  async openModalItemNew(){
    let res = await this.getData('get_all_for_new');

    console.log( res )

    this.setState({
      modalItemNew: true,
      itemEdit: res,
    })
  }

  async saveItem(item_id, type, value){
    let data = {
      item_id: item_id,
      type: type,
      value: value
    };

    let res = await this.getData('saveItem', data, false);

    if( res.st === false ){
      alert(res.text);
    }else{
      this.setState({ 
        modalItemNew: false,
        modalItemEdit: false, 
        itemEdit: null,
        checkArtDialog: false,
        checkArtList: []
      })

      res = await this.getData('get_all');
    
      this.setState({
        cats: res.cats,
        freeItems: res.items_free
      })
    }
  }

  changeTableItem(item_id, type, event){
    
    if( parseInt(type) == 1 ){
      let data = event.target.checked;

      let items = this.state.cats;

      items.map( (item, key) => {
        item.cats.map( (cat, key_cat) => {
          cat.items.map( (it, k) => {
            if( parseInt( it.id ) == parseInt( item_id ) ){
              items[ key ]['cats'][ key_cat ]['items'][ k ]['show_in_rev'] = data == true ? 1 : 0;
            }
          } )
        } )
      } )

      this.setState({
        cats: items
      })

      this.saveItem(item_id, 'show_in_rev', data == true ? 1 : 0);
    }

    if( parseInt(type) == 3 ){
      let data = event.target.value;

      let items = this.state.cats;

      items.map( (item, key) => {
        item.cats.map( (cat, key_cat) => {
          cat.items.map( (it, k) => {
            if( parseInt( it.id ) == parseInt( item_id ) ){
              items[ key ]['cats'][ key_cat ]['items'][ k ]['handle_price'] = data;
            }
          } )
        } )
      } )

      this.setState({
        cats: items
      })

      this.saveItem(item_id, 'handle_price', data);
    }



    if( parseInt(type) == 2 ){
      let data = event.target.value;
      
      let items = this.state.freeItems;

      items.map( (item, key) => {
        if( parseInt( item.id ) == parseInt( item_id ) ){
          items[ key ]['show_in_rev'] = data == true ? 1 : 0;
        }
      } )

      this.setState({
        freeItems: items
      })

      this.saveItem(item_id, 'show_in_rev', data == true ? 1 : 0);
    }

    if( parseInt(type) == 4 ){
      let data = event.target.value;
      
      let items = this.state.freeItems;

      items.map( (item, key) => {
        if( parseInt( item.id ) == parseInt( item_id ) ){
          items[ key ]['handle_price'] = data;
        }
      } )

      this.setState({
        freeItems: items
      })

      this.saveItem(item_id, 'handle_price', data);
    }
    
  }

  render(){
    return (
      <>
        <Backdrop className={this.state.classes.backdrop} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>
        
        <Dialog onClose={ () => { this.setState({ checkArtDialog: false, checkArtList: [] }) } } open={this.state.checkArtDialog}>
          <DialogTitle>Такой код 1с уже задан у следующих позиций:</DialogTitle>
          <List sx={{ pt: 0 }}>
            {this.state.checkArtList.map((item, key) => (
              <ListItem button onClick={this.chooseArt.bind(this, item.id)} key={key}>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
        </Dialog>

        <Dialog
          open={this.state.modalItemEdit}
          fullWidth={true}
          maxWidth={'md'}
          onClose={ () => { this.setState({ modalItemEdit: false, itemEdit: null, checkArtDialog: false }) } }
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>Редактирвоание товара {this.state.itemName}</DialogTitle>
          <DialogContent style={{ paddingBottom: 10, paddingTop: 10 }}>
            
            <Grid container spacing={3}>
              
              {this.state.itemEdit ?
                <>
                  <Grid item xs={12}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <MyTextInput label="Название товара" value={ this.state.itemEdit.item.name } func={ this.changeItem.bind(this, 'name') } />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <MySelect classes={this.state.classes} data={this.state.itemEdit.pf_list} value={this.state.itemEdit.item.pf_id} func={ this.changeItem.bind(this, 'pf_id') } label='Заготовка' />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <MyTextInput label="Название товара для поставщика" value={ this.state.itemEdit.item.name_for_vendor } func={ this.changeItem.bind(this, 'name_for_vendor') } />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <MyTextInput label="Код для 1с" value={ this.state.itemEdit.item.art } func={ this.changeItem.bind(this, 'art') } />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <MyTextInput label="Максимальное количество заказов в месяц (0 - без ограничений)" value={ this.state.itemEdit.item.max_count_in_m } func={ this.changeItem.bind(this, 'max_count_in_m') } />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <MySelect classes={this.state.classes} data={this.state.itemEdit.cats} value={this.state.itemEdit.item.cat_id} func={ this.changeItem.bind(this, 'cat_id') } label='Категория' />
                      </Grid>
                    </Grid>
                  </Grid>

                  
                  <Grid item xs={12} sm={4}>
                    <MyTextInput label="Количество в упаковке" value={ this.state.itemEdit.item.pq } func={ this.changeItem.bind(this, 'pq') } />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MySelect classes={this.state.classes} data={this.state.itemEdit.ed_izmer} value={this.state.itemEdit.item.ed_izmer_id} func={ this.changeItem.bind(this, 'ed_izmer_id') } label='Ед измер' />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MySelect classes={this.state.classes} data={this.state.itemEdit.apps} value={this.state.itemEdit.item.app_id} func={ this.changeItem.bind(this, 'app_id') } label='Должность на кухне' />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <MyTextInput label="Время приготовления ММ:SS (15:20)" value={ this.state.itemEdit.item.time_min } func={ this.changeItem.bind(this, 'time_min') } />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MyTextInput label="Дополнительное время ММ:SS (15:20)" value={ this.state.itemEdit.item.time_dop_min } func={ this.changeItem.bind(this, 'time_dop_min') } />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MyTextInput label="Время разгрузки ММ:SS.iiii (00:20.004)" value={ this.state.itemEdit.item.time_min_other } func={ this.changeItem.bind(this, 'time_min_other') } />
                  </Grid>
                  
                  <Grid item xs={12} sm={4}>
                    <MyTextInput label="% потерь" value={ this.state.itemEdit.item.los_percent } func={ this.changeItem.bind(this, 'los_percent') } />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MyTextInput label="% заявки" value={ this.state.itemEdit.item.percent } func={ this.changeItem.bind(this, 'percent') } />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MyTextInput label="% повышения ценника" value={ this.state.itemEdit.item.vend_percent } func={ this.changeItem.bind(this, 'vend_percent') } />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <MyCheckBox label="Вес заготовки" value={ parseInt(this.state.itemEdit.item.w_pf) == 1 ? true : false } func={ this.changeItem.bind(this, 'w_pf') } />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MyCheckBox label="Вес отхода" value={ parseInt(this.state.itemEdit.item.w_trash) == 1 ? true : false } func={ this.changeItem.bind(this, 'w_trash') } />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MyCheckBox label="Вес товара" value={ parseInt(this.state.itemEdit.item.w_item) == 1 ? true : false } func={ this.changeItem.bind(this, 'w_item') } />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MyCheckBox label="Два сотрудника" value={ parseInt(this.state.itemEdit.item.two_user) == 1 ? true : false } func={ this.changeItem.bind(this, 'two_user') } />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <MyAutocomplite label='Места хранения' multiple={true} data={this.state.itemEdit.storages} value={this.state.itemEdit.this_storages} func={ (event, value) => { let this_storages = this.state.itemEdit; this_storages.this_storages = value; this.setState({ itemEdit: this_storages }) } } />
                  </Grid>

                  <Grid item xs={12}>
                    <MyCheckBox label="Активность" value={ parseInt(this.state.itemEdit.item.is_show) == 1 ? true : false } func={ this.changeItem.bind(this, 'is_show') } />
                  </Grid>
                </>
                  :
                null
              }
            </Grid>
              
          </DialogContent>
          <DialogActions>
            <Button onClick={this.checkArt.bind(this)} color="primary">Сохранить</Button>
          </DialogActions>
        </Dialog>
        
        <Dialog
          open={this.state.modalItemNew}
          fullWidth={true}
          maxWidth={'md'}
          onClose={ () => { this.setState({ modalItemNew: false, itemEdit: null, checkArtDialog: false }) } }
        >
          <DialogTitle>Новый товар</DialogTitle>
          <DialogContent style={{ paddingBottom: 10, paddingTop: 10 }}>
            
            <Grid container spacing={3}>
              
              {this.state.itemEdit ?
                <>
                  <Grid item xs={12}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <MyTextInput label="Название товара" value={ this.state.itemEdit.item.name } func={ this.changeItem.bind(this, 'name') } />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <MySelect classes={this.state.classes} data={this.state.itemEdit.pf_list} value={this.state.itemEdit.item.pf_id} func={ this.changeItem.bind(this, 'pf_id') } label='Заготовка' />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <MyTextInput label="Название товара для поставщика" value={ this.state.itemEdit.item.name_for_vendor } func={ this.changeItem.bind(this, 'name_for_vendor') } />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <MyTextInput label="Код для 1с" value={ this.state.itemEdit.item.art } func={ this.changeItem.bind(this, 'art') } />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <MyTextInput label="Максимальное количество заказов в месяц (0 - без ограничений)" value={ this.state.itemEdit.item.max_count_in_m } func={ this.changeItem.bind(this, 'max_count_in_m') } />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <MySelect classes={this.state.classes} data={this.state.itemEdit.cats} value={this.state.itemEdit.item.cat_id} func={ this.changeItem.bind(this, 'cat_id') } label='Категория' />
                      </Grid>
                    </Grid>
                  </Grid>

                  
                  <Grid item xs={12} sm={4}>
                    <MyTextInput label="Количество в упаковке" value={ this.state.itemEdit.item.pq } func={ this.changeItem.bind(this, 'pq') } />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MySelect classes={this.state.classes} data={this.state.itemEdit.ed_izmer} value={this.state.itemEdit.item.ed_izmer_id} func={ this.changeItem.bind(this, 'ed_izmer_id') } label='Ед измер' />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MySelect classes={this.state.classes} data={this.state.itemEdit.apps} value={this.state.itemEdit.item.app_id} func={ this.changeItem.bind(this, 'app_id') } label='Должность на кухне' />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <MyTextInput label="Время приготовления ММ:SS (15:20)" value={ this.state.itemEdit.item.time_min } func={ this.changeItem.bind(this, 'time_min') } />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MyTextInput label="Дополнительное время ММ:SS (15:20)" value={ this.state.itemEdit.item.time_dop_min } func={ this.changeItem.bind(this, 'time_dop_min') } />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MyTextInput label="Время разгрузки ММ:SS.iiii (00:20.004)" value={ this.state.itemEdit.item.time_min_other } func={ this.changeItem.bind(this, 'time_min_other') } />
                  </Grid>
                  
                  <Grid item xs={12} sm={4}>
                    <MyTextInput label="% потерь" value={ this.state.itemEdit.item.los_percent } func={ this.changeItem.bind(this, 'los_percent') } />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MyTextInput label="% заявки" value={ this.state.itemEdit.item.percent } func={ this.changeItem.bind(this, 'percent') } />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MyTextInput label="% повышения ценника" value={ this.state.itemEdit.item.vend_percent } func={ this.changeItem.bind(this, 'vend_percent') } />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <MyCheckBox label="Вес заготовки" value={ parseInt(this.state.itemEdit.item.w_pf) == 1 ? true : false } func={ this.changeItem.bind(this, 'w_pf') } />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MyCheckBox label="Вес отхода" value={ parseInt(this.state.itemEdit.item.w_trash) == 1 ? true : false } func={ this.changeItem.bind(this, 'w_trash') } />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MyCheckBox label="Вес товара" value={ parseInt(this.state.itemEdit.item.w_item) == 1 ? true : false } func={ this.changeItem.bind(this, 'w_item') } />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MyCheckBox label="Два сотрудника" value={ parseInt(this.state.itemEdit.item.two_user) == 1 ? true : false } func={ this.changeItem.bind(this, 'two_user') } />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <MyAutocomplite label='Места хранения' multiple={true} data={this.state.itemEdit.storages} value={this.state.itemEdit.this_storages} func={ (event, value) => { let this_storages = this.state.itemEdit; this_storages.this_storages = value; this.setState({ itemEdit: this_storages }) } } />
                  </Grid>
                </>
                  :
                null
              }
            </Grid>
              
          </DialogContent>
          <DialogActions>
            <Button onClick={this.checkArtNew.bind(this)} color="primary">Сохранить</Button>
          </DialogActions>
        </Dialog>
        
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>
          
          <Grid item xs={12} sm={3}>
            <Button onClick={this.openModalItemNew.bind(this)} variant="contained">Добавить товар</Button>
          </Grid>
        
          <Grid item xs={12}>
          
            { this.state.cats.map( (item, key) =>
              <Accordion key={key}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography>{item.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  { item.cats.map( (cat, key_cat) => 
                    <Accordion key={key_cat}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                      >
                        <Typography>{cat.name}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        
                        <Table>
                  
                          <TableHead>
                            <TableRow>
                              <TableCell style={{ width: '2%' }}>#</TableCell>
                  
                              <TableCell style={{ width: '2%' }}></TableCell>
                              <TableCell style={{ width: '3%' }}>Ревизия</TableCell>
                  
                              <TableCell style={{ width: '15%' }}>Товар</TableCell>
                              <TableCell style={{ width: '10%' }}>% потерь</TableCell>
                              <TableCell style={{ width: '10%' }}>% заявки</TableCell>
                              <TableCell style={{ width: '15%' }}>Заготовка</TableCell>
                  
                              <TableCell style={{ width: '5%' }}>Ед. измер</TableCell>
                  
                              <TableCell style={{ width: '9%' }}>Место хранения</TableCell>
                              <TableCell style={{ width: '9%' }}>Моя цена</TableCell>
                            </TableRow>
                          </TableHead>
                  
                          <TableBody>
                            
                            { cat.items.map( (it, k) =>
                              <TableRow key={k}>
                                <TableCell>{k+1}</TableCell>
                                <TableCell> 
                                  { parseInt(it.is_show) == 1 ? <VisibilityIcon /> : <VisibilityOffIcon /> } 
                                </TableCell>
                                <TableCell>
                                  <MyCheckBox label="" value={ parseInt(it.show_in_rev) == 1 ? true : false } func={ this.changeTableItem.bind(this, it.id, 1) } />
                                </TableCell>
                                <TableCell style={{ cursor: 'pointer' }} onClick={this.showEditItem.bind(this, it.id)}>{it.name}</TableCell>
                                <TableCell>{it.los_percent} %</TableCell>
                                <TableCell>{it.percent} %</TableCell>
                                <TableCell>{it.pf_name}</TableCell>
                  
                                <TableCell>{it.ei_name}</TableCell>
                                <TableCell>{it.storage_name}</TableCell>
                                <TableCell>
                                  <MyTextInput label="" value={it.handle_price} func={ this.changeTableItem.bind(this, it.id, 3) } />
                                </TableCell>
                              </TableRow>           
                            ) }
                          
                          </TableBody>
                        
                        </Table>

                      </AccordionDetails>
                    </Accordion>
                  ) }
                </AccordionDetails>
              </Accordion>
            ) }
            
            { this.state.freeItems.length == 0 ? null :

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography>Без категории</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  
                  <Table>
                  
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ width: '2%' }}>#</TableCell>
            
                        <TableCell style={{ width: '2%' }}></TableCell>
                        <TableCell style={{ width: '3%' }}>Ревизия</TableCell>
            
                        <TableCell style={{ width: '15%' }}>Товар</TableCell>
                        <TableCell style={{ width: '10%' }}>% потерь</TableCell>
                        <TableCell style={{ width: '10%' }}>% заявки</TableCell>
                        <TableCell style={{ width: '15%' }}>Заготовка</TableCell>
            
                        <TableCell style={{ width: '5%' }}>Ед. измер</TableCell>
            
                        <TableCell style={{ width: '9%' }}>Место хранения</TableCell>
                        <TableCell style={{ width: '9%' }}>Моя цена</TableCell>
                      </TableRow>
                    </TableHead>
            
                    <TableBody>
                      
                      { this.state.freeItems.map( (it, k) =>
                        <TableRow key={k}>
                          <TableCell>{k+1}</TableCell>
                          <TableCell> 
                            { parseInt(it.is_show) == 1 ? <VisibilityIcon /> : <VisibilityOffIcon /> } 
                          </TableCell>
                          <TableCell>
                            <MyCheckBox label="" value={ parseInt(it.show_in_rev) == 1 ? true : false } func={ this.changeTableItem.bind(this, it.id, 2) } />
                          </TableCell>
                          <TableCell style={{ cursor: 'pointer' }} onClick={this.showEditItem.bind(this, it.id)}>{it.name}</TableCell>
                          <TableCell>{it.los_percent} %</TableCell>
                          <TableCell>{it.percent} %</TableCell>
                          <TableCell>{it.pf_name}</TableCell>
            
                          <TableCell>{it.ei_name}</TableCell>
                          <TableCell>{it.storage_name}</TableCell>
                          <TableCell>
                            <MyTextInput label="" value={it.handle_price} func={ this.changeTableItem.bind(this, it.id, 4) } />
                          </TableCell>
                        </TableRow>           
                      ) }
                    
                    </TableBody>
                  
                  </Table>

                </AccordionDetails>
              </Accordion>
            }

          </Grid>
          
          
        </Grid>
      </>
    )
  }
}

export function SkladItemsModule () {
  const classes = useStyles();
  let history = useHistory();
  
  return (
    <SkladItemsModule_ classes={classes} history={history} />
  );
}