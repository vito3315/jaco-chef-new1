import React from 'react';
import { useHistory } from "react-router-dom";

import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { MyTextInput, MyCheckBox, MySelect, MyTimePicker, MyAutocomplite } from '../../stores/elements';

const queryString = require('query-string');

const theme = createTheme({
  palette: {
    primary: {
      main: '#c03',
    },
    def: {
      main: '#353b48',
      secondary: '#fff'
    },
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

class AppWork_ extends React.Component {
  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
      history: this.props.history,
      module: 'app_work',
      module_name: '',
      is_load: false,
      
      items: [],
      items_min: [],
      modalDialog: false,
      modalDialogNew: false,

      dows: [
        {id: 1, name: 'Понедельник'},
        {id: 2, name: 'Вторник'},
        {id: 3, name: 'Среда'},
        {id: 4, name: 'Четверг'},
        {id: 5, name: 'Пятница'},
        {id: 6, name: 'Суббота'},
        {id: 7, name: 'Воскресенье'},

        {id: 10, name: 'Другое'},
	      {id: 11, name: 'Каждый день'},
	      {id: 12, name: 'Каждый день в конце смены'},
        {id: 13, name: 'Ручное добавление'},
        {id: 14, name: 'После выполнение уборки'},
      ],
      types: [
        {id: 0, name: 'Другое'},
        {id: 1, name: 'Только 1 активная'},
        {id: 2, name: 'Добавление без ограничений'},
      ],

      itemsEdit: null,
      nameWork: '',

      itemsNew: null,
      chengeItem1: null,
      chengeItemNew1: null
    };
  }
  
  async componentDidMount(){
    let data = await this.getData('get_all');
    
    data.items.map( (item, key) => {
      data.items[key]['dow_name'] = this.state.dows.find( (it) => parseInt(it.id) == parseInt(item.dow) )['name'];
    } )

    this.setState({
      module_name: data.module_info.name,
      items: data.items,
      items_min: data.items_min
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
   
  openCat(item){
    this.setState({
      modalDialog: true,
      showCat: item,
      nameCat: item.name,
      editText: item.text
    })
  }

  async saveEdit(){
    let data = {
      work: this.state.itemsEdit.item,
      times_add: this.state.itemsEdit.times_add,
      times_close: this.state.itemsEdit.times_close,
    };

    let res = await this.getData('save_edit', data);

    console.log( res )

    if( res.st === false ){
      alert(res.text)
    }else{
      this.setState({ 
        modalDialog: false, 
        itemsEdit: null,
        nameWork: ''
      })

      let data = await this.getData('get_all');
    
      data.items.map( (item, key) => {
        data.items[key]['dow_name'] = this.state.dows.find( (it) => parseInt(it.id) == parseInt(item.dow) )['name'];
      } )

      this.setState({
        items: data.items,
        items_min: data.items_min
      })
    }
  }

  async saveNew(){
    let data = {
      work: this.state.itemsNew.item,
      times_add: this.state.itemsNew.times_add,
      times_close: this.state.itemsNew.times_close,
    };

    let res = await this.getData('save_new', data);

    console.log( res )

    if( res.st === false ){
      alert(res.text)
    }else{
      this.setState({ 
        modalDialogNew: false, 
        itemsNew: null
      })

      let data = await this.getData('get_all');
    
      data.items.map( (item, key) => {
        data.items[key]['dow_name'] = this.state.dows.find( (it) => parseInt(it.id) == parseInt(item.dow) )['name'];
      } )

      this.setState({
        items: data.items,
        items_min: data.items_min
      })
    }
  }

  async openWork(id){
    let data = {
      id: id
    };

    let res = await this.getData('get_one', data);

    console.log( res )

    this.setState({
      itemsEdit: res,
      modalDialog: true,
      nameWork: res.item.name,
      chengeItem1: this.state.items_min.find( (item, key) => parseInt( item.id ) == parseInt( res.item.work_id ) )
    })
  }

  async openNewWork(){
    let res = await this.getData('get_all_for_new');

    console.log( res )

    this.setState({
      itemsNew: res,
      modalDialogNew: true
    })
  }

  chengeItem(type, event){
    let data = event.target.value;
    let item = this.state.itemsEdit;

    item.item[ [type] ] = data;

    if( type == 'dow' && data == 12 ){
      item.times_add = [{ time_action: '19:00' }];
      item.times_close = '23:00';
    }

    this.setState({
      itemsEdit: item
    })
  }

  chengeItem1(type, event, data){
    let item = this.state.itemsEdit;

    item.item[ [type] ] = data.id;

    this.setState({
      itemsEdit: item,
      chengeItem1: data
    })
  }

  chengeItemNew(type, event){
    let data = event.target.value;
    let item = this.state.itemsNew;

    item.item[ [type] ] = data;

    if( type == 'dow' && data == 12 ){
      item.times_add = [{ time_action: '19:00' }];
      item.times_close = '23:00';
    }

    this.setState({
      itemsNew: item
    })
  }

  chengeItemNew1(type, event, data){
    let item = this.state.itemsNew;

    item.item[ [type] ] = data.id;

    this.setState({
      itemsNew: item,
      chengeItemNew1: data
    })
  }

  chengeTime(key, event){
    let data = event.target.value;
    let item = this.state.itemsEdit;

    item.times_add[ key ]['time_action'] = data;

    this.setState({
      itemsEdit: item
    })
  }

  chengeTimeNew(key, event){
    let data = event.target.value;
    let item = this.state.itemsNew;

    item.times_add[ key ]['time_action'] = data;

    this.setState({
      itemsNew: item
    })
  }

  delTime(key){
    let item = this.state.itemsEdit;

    let newArr = [];

    item.times_add.map( (it, k) => {
      if( parseInt( k ) != parseInt( key ) ){
        newArr.push(it)
      }
    } )

    item.times_add = newArr;

    this.setState({
      itemsEdit: item
    })
  }

  delTimeNew(key){
    let item = this.state.itemsNew;

    let newArr = [];

    item.times_add.map( (it, k) => {
      if( parseInt( k ) != parseInt( key ) ){
        newArr.push(it)
      }
    } )

    item.times_add = newArr;

    this.setState({
      itemsNew: item
    })
  }

  addTime(event){
    let data = document.getElementById('timePikerNew').value;
    let item = this.state.itemsEdit;

    if( data != '' ){
      item.times_add.push({
        time_action: data
      });

      this.setState({
        itemsEdit: item
      })
    }
  }

  addTimeNew(event){
    let data = document.getElementById('timePikerNew').value;
    let item = this.state.itemsNew;

    if( data != '' ){
      item.times_add.push({
        time_action: data
      });
  
      this.setState({
        itemsNew: item
      })
    }
  }

  chengeTimeClose(event){
    let data = event.target.value;
    let item = this.state.itemsEdit;

    item.times_close = data;

    this.setState({
      itemsEdit: item
    })
  }

  chengeTimeCloseNew(event){
    let data = event.target.value;
    let item = this.state.itemsNew;

    item.times_close = data;

    this.setState({
      itemsNew: item
    })
  }

  async changeCheck(key, type, event){
    let items = this.state.items;

    items[ key ][ [type] ] = event.target.checked ? 1 : 0;

    let data = {
      type: type,
      value: event.target.checked ? 1 : 0,
      id: items[ key ].id
    };

    let res = await this.getData('save_check', data);
    

    this.setState({
      items: items
    })
  }

  render(){
    return (
      <>
        <Backdrop className={this.state.classes.backdrop} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>
        
        { !this.state.itemsEdit ? null :
          <Dialog
            open={this.state.modalDialog}
            maxWidth={'md'}
            onClose={ () => { this.setState({ modalDialog: false, itemsEdit: null, nameWork: '' }) } }
          >
            <DialogTitle>Уборка "{this.state.nameWork}"</DialogTitle>
            <DialogContent style={{ paddingTop: 10 }}>
              
              <Grid container spacing={3}>
                
                <Grid item xs={12} sm={4}>
                  <MyTextInput classes={this.state.classes} value={ this.state.itemsEdit.item.name } func={ this.chengeItem.bind(this, 'name') } label='Название уборки' />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <MySelect classes={this.state.classes} data={this.state.itemsEdit.cats} value={this.state.itemsEdit.item.type_new} func={ this.chengeItem.bind(this, 'type_new') } label='Категория уборки' />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <MyTextInput classes={this.state.classes} value={ this.state.itemsEdit.item.time_min } func={ this.chengeItem.bind(this, 'time_min') } label='Время уборки (в минутах)' />
                </Grid>


                <Grid item xs={12} sm={3}>
                  <MyTextInput classes={this.state.classes} value={ this.state.itemsEdit.item.max_count } func={ this.chengeItem.bind(this, 'max_count') } label='Количество активаций' />
                </Grid>

                <Grid item xs={12} sm={9}>
                  <MyTextInput multiline={true} maxRows={2} classes={this.state.classes} value={this.state.itemsEdit.item.description} func={ this.chengeItem.bind(this, 'description') } label='Описание (для внутренного использования)'/>
                </Grid>
                

                <Grid item xs={12} sm={4}>
                  <MySelect classes={this.state.classes} data={this.state.itemsEdit.apps} value={this.state.itemsEdit.item.app_id} func={ this.chengeItem.bind(this, 'app_id') } label='Должность' />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <MySelect classes={this.state.classes} data={this.state.dows} value={this.state.itemsEdit.item.dow} func={ this.chengeItem.bind(this, 'dow') } label='День недели' />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <MySelect classes={this.state.classes} data={this.state.types} value={this.state.itemsEdit.item.type_time} func={ this.chengeItem.bind(this, 'type_time') } label='Тип добавления' />
                </Grid>
                
                { parseInt(this.state.itemsEdit.item.dow) != 14 ? null :
                  <Grid item xs={12}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <MyAutocomplite classes={this.state.classes} data={this.state.items_min} value={this.state.chengeItem1} func={ this.chengeItem1.bind(this, 'work_id') } multiple={false} label='Если эта уборка завершена' />
                      </Grid>
                    </Grid>
                  </Grid>
                }

                <Grid item xs={12} sm={6}>
                  <List>
                    <ListItem style={{ borderBottom: '1px solid #e5e5e5' }}>
                      <ListItemText primary={ 'Время добавления уборки' } />
                    </ListItem>

                    { this.state.itemsEdit.times_add.map( (item, key) =>
                      <ListItem key={key} style={{ borderBottom: '1px solid #e5e5e5' }}>
                        <MyTimePicker classes={this.state.classes} label={''} value={item.time_action} func={ this.chengeTime.bind(this, key) } />
                        <CloseIcon style={{ cursor: 'pointer' }} onClick={ this.delTime.bind(this, key) } />
                      </ListItem>
                    ) }

                    <ListItem style={{ borderBottom: '1px solid #e5e5e5' }}>
                      <MyTimePicker id="timePikerNew" classes={this.state.classes} label={''} value={'00:00'} onBlur={ this.addTime.bind(this) } />
                    </ListItem>
                  </List>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <List>
                    <ListItem style={{ borderBottom: '1px solid #e5e5e5' }}>
                      <ListItemText primary={ 'Время автоматического удаления' } />
                    </ListItem>

                    <ListItem style={{ borderBottom: '1px solid #e5e5e5' }}>
                      <MyTimePicker classes={this.state.classes} label={''} value={this.state.itemsEdit.times_close} func={ this.chengeTimeClose.bind(this) } />
                    </ListItem>
                  </List>
                </Grid>

              </Grid>

            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={this.saveEdit.bind(this)}>Сохранить</Button>
            </DialogActions>
          </Dialog>
        }

        { !this.state.itemsNew ? null :
          <Dialog
            open={this.state.modalDialogNew}
            maxWidth={'md'}
            onClose={ () => { this.setState({ modalDialogNew: false }) } }
          >
            <DialogTitle>Новая уборка</DialogTitle>
            <DialogContent style={{ paddingTop: 10 }}>
              
              <Grid container spacing={3}>
                
                <Grid item xs={12} sm={4}>
                  <MyTextInput classes={this.state.classes} value={ this.state.itemsNew.item.name } func={ this.chengeItemNew.bind(this, 'name') } label='Название уборки' />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <MySelect classes={this.state.classes} data={this.state.itemsNew.cats} value={this.state.itemsNew.item.type_new} func={ this.chengeItemNew.bind(this, 'type_new') } label='Категория уборки' />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <MyTextInput classes={this.state.classes} value={ this.state.itemsNew.item.time_min } func={ this.chengeItemNew.bind(this, 'time_min') } label='Время уборки (в минутах)' />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <MyTextInput classes={this.state.classes} value={ this.state.itemsNew.item.max_count } func={ this.chengeItemNew.bind(this, 'max_count') } label='Количество активаций' />
                </Grid>

                <Grid item xs={12} sm={9}>
                  <MyTextInput multiline={true} maxRows={2} classes={this.state.classes} value={this.state.itemsNew.item.description} func={ this.chengeItemNew.bind(this, 'description') } label='Описание (для внутренного использования)'/>
                </Grid>
                
                <Grid item xs={12} sm={4}>
                  <MySelect classes={this.state.classes} data={this.state.itemsNew.apps} value={this.state.itemsNew.item.app_id} func={ this.chengeItemNew.bind(this, 'app_id') } label='Должность' />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <MySelect classes={this.state.classes} data={this.state.dows} value={this.state.itemsNew.item.dow} func={ this.chengeItemNew.bind(this, 'dow') } label='День недели' />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <MySelect classes={this.state.classes} data={this.state.types} value={this.state.itemsNew.item.type_time} func={ this.chengeItemNew.bind(this, 'type_time') } label='Тип добавления' />
                </Grid>
                
                { parseInt(this.state.itemsNew.item.dow) != 14 ? null :
                  <Grid item xs={12}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <MyAutocomplite classes={this.state.classes} data={this.state.items_min} value={this.state.chengeItemNew1} func={ this.chengeItemNew1.bind(this, 'work_id') } multiple={false} label='Если эта уборка завершена' />
                      </Grid>
                    </Grid>
                  </Grid>
                }

                <Grid item xs={12} sm={6}>
                  <List>
                    <ListItem style={{ borderBottom: '1px solid #e5e5e5' }}>
                      <ListItemText primary={ 'Время добавления уборки' } />
                    </ListItem>

                    { this.state.itemsNew.times_add.map( (item, key) =>
                      <ListItem key={key} style={{ borderBottom: '1px solid #e5e5e5' }}>
                        <MyTimePicker classes={this.state.classes} label={''} value={item.time_action} func={ this.chengeTimeNew.bind(this, key) } />
                        <CloseIcon style={{ cursor: 'pointer' }} onClick={ this.delTimeNew.bind(this, key) } />
                      </ListItem>
                    ) }

                    <ListItem style={{ borderBottom: '1px solid #e5e5e5' }}>
                      <MyTimePicker id="timePikerNew" classes={this.state.classes} label={''} value={'00:00'} onBlur={ this.addTimeNew.bind(this) } />
                    </ListItem>
                  </List>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <List>
                    <ListItem style={{ borderBottom: '1px solid #e5e5e5' }}>
                      <ListItemText primary={ 'Время автоматического удаления' } />
                    </ListItem>

                    <ListItem style={{ borderBottom: '1px solid #e5e5e5' }}>
                      <MyTimePicker classes={this.state.classes} label={''} value={this.state.itemsNew.times_close} func={ this.chengeTimeCloseNew.bind(this) } />
                    </ListItem>
                  </List>
                </Grid>

              </Grid>

            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={this.saveNew.bind(this)}>Сохранить</Button>
            </DialogActions>
          </Dialog>
        }
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Button variant="contained" color="primary" onClick={ this.openNewWork.bind(this) }>Добавить уборку</Button>
          </Grid>
          
          <Grid item xs={12} sm={12}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Работа</TableCell>
                  <TableCell>Должность</TableCell>
                  <TableCell>Время</TableCell>
                  <TableCell>День недели</TableCell>
                  <TableCell>Время открытия</TableCell>
                  
                  <TableCell>Время автоматического удаления</TableCell>
                  <TableCell>Не удалять в конце смены</TableCell>
                  <TableCell>Обязательна к выполнению в особый день</TableCell>
                  <TableCell><VisibilityIcon /></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                
                { this.state.items.map( (item, key) =>
                  <TableRow key={key}>
                    <TableCell onClick={ this.openWork.bind(this, item.id) } style={{ color: '#c03', cursor: 'pointer', fontWeight: 'bold' }}>{item.work_name}</TableCell>
                    <TableCell>{item.app_name}</TableCell>
                    <TableCell>{item.time_min ? item.time_min + 'мин.' : ''}</TableCell>
                    <TableCell>{item.dow_name}</TableCell>
                    <TableCell>{item.times_open}</TableCell>

                    <TableCell>{item.times_close}</TableCell>

                    <TableCell>
                      <MyCheckBox classes={this.state.classes} value={ parseInt(item.is_not_del) == 1 ? true : false } func={ this.changeCheck.bind(this, key, 'is_not_del') } label='' />
                    </TableCell>
                    <TableCell>
                      <MyCheckBox classes={this.state.classes} value={ parseInt(item.is_need) == 1 ? true : false } func={ this.changeCheck.bind(this, key, 'is_need') } label='' />
                    </TableCell>
                    <TableCell>
                      <MyCheckBox classes={this.state.classes} value={ parseInt(item.is_active) == 1 ? true : false } func={ this.changeCheck.bind(this, key, 'is_active') } label='' />
                    </TableCell>
                  </TableRow>
                ) }
              
              </TableBody>
            
            </Table>
          </Grid>
        
        </Grid>
      </>
    )
  }
}

export function AppWork () {
  const classes = useStyles();
  let history = useHistory();
  
  return (
    <AppWork_ classes={classes} history={history} />
  );
}