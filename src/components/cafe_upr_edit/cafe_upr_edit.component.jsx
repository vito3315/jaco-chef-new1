import React from 'react';

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
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import CloseIcon from '@mui/icons-material/Close';

import { MyTextInput, MyDatePickerNew, MyTimePicker, MySelect, MyAutocomplite, MyCheckBox } from '../../stores/elements';
import { alertTitleClasses } from '@mui/material';

const queryString = require('query-string');

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
    
class СafeUprEdit_ extends React.Component {
  constructor(props) {
    super(props);
        
    this.state = {
      module: 'cafe_upr_edit',
      module_name: '',
     
      modalStopReason   : false,
      modalStopZone     : false,
      modalAddTime      : false,
      showComment       : false,

      phone_upr           : '',
      phone_man           : '',
      summ_driver         : '',
      id                  : 0,
      is_active           : 0,
      points_list         : [],

      zone_list           : [],
      dop_time_list       : [],
      zones               : [],
      zone_id             : 0,
      nal_zone_id         : 0,
      
      time_start          : '17:00',
      time_end            : '17:30',

      add_time_list       : [],
      add_time_id         : 0,
      tables              : [],

      count_tables        : 0,

      cafe_handle_close   : '',
      cook_common_stol    : 0,
      summ_driver         : '',

      // old to del
      modalDialog: false,
      modalDialogNew: false, //todo

      description: '',
      promo: '',
      is_load: false,
      
      adv_actual: [],
      adv_old: [],

      is_сlosed_overload : 0,
      is_сlosed_technic : 0,
      comment : '',

      rangeDate: [formatDate(new Date()), formatDate(new Date())],
      date_start: formatDate(new Date()),
      date_end: formatDate(new Date()),

      point_id: 0,
      points: [],
      choosePoint: [],
      points_filter: [], // todo
     
      nameCat: '',
      editText: '',

      name: '',
      editTextNew: '',

      showItem: null
    };
  }
  
  async componentDidMount(){
    let res = await this.getData('get_stat', {point_id : this.state.point_id});
    
    this.setState({
        module_name         : res.module_info.name,
        points_list         : res.points,
        tables              : res.tables,
        zone_list           : res.point_zone,
        id                  : res.point_info.id,
        is_active           : res.point_info.is_active,
        phone_upr           : res.point_info.phone_upr,
        phone_man           : res.point_info.phone_man,
        count_tables        : res.point_info.count_tables,
        cafe_handle_close   : res.point_info.cafe_handle_close,
        cook_common_stol    : res.point_info.cook_common_stol,
        summ_driver         : res.point_info.summ_driver,
        add_time_list       : res.add_time_list,
        dop_time_list       : res.dop_time_list
    })

    document.title = res.module_info.name;
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
      console.log( err )
      this.setState({
        is_load: false
      })
    });
  }
   

  // сохранение после редактирования
  async save(){
     let data = {
        point_id            : this.state.point_id,
        phone_upr           : this.state.phone_upr,
        phone_man           : this.state.phone_man,
        count_tables        : this.state.count_tables,
        cafe_handle_close   : this.state.cafe_handle_close,
        cook_common_stol    : this.state.cook_common_stol,
        summ_driver         : this.state.summ_driver,
        is_active           : this.state.is_active,
      };
     
      // причина закрытия кафе
     
      console.log('save=', data);

      let res = await this.getData('save_edit', data);

      if (res.st === false) {
        alert(res.text)
      } else {
      
        this.getPoint();
        alert('Данные успешно сохранены!');
      }   
  }
  //saveNew
  

  addTimeDelivery(){  
    this.setState({ 
      modalAddTime: true, 
    })
    console.log('addTimeDelivery');
  }

  stopZone(){  
    this.setState({ 
      modalStopZone: true, 
    })
    console.log('stopZone');
  }

  // обычный чекбокс
  changeChekBox(type, event) {

      //  убираем галку закрытия кафе если в модалке ничего не нажали
      if(type == 'is_active' && event.target.checked  == false){
        this.setState({ 
          modalStopReason: true, 
        })
      }
     
      this.setState({
          [type]: event.target.checked 
      })

      if(type == 'is_сlosed_technic'){
        this.setState({
          showComment: event.target.checked ? true : false
        })
      }
     
  }

  // чекбокс дл зон
  changeChekBoxZone(type, key, event) {
 
    let zone =  this.state.zone_list ;
    zone[key].is_active = event.target.checked == true ? 1 : 0 ;
    this.setState({
      zone_list: zone 
    })
   
  }

  changeDateRange(data, val) {
    this.setState({
      [data]: formatDate(val)
    })
  }

  // смена точки
  changePoint(event) {
    this.setState({
        point_id: event.target.value
    })
  
    setTimeout(() => {
        this.getPoint();
    }, 250)
  }

  // дергаем данные точки
  async getPoint() {
    let data = {
        point_id: this.state.point_id,
    };
  
    let res = await this.getData('get_stat', data);
 
    this.setState({
        id                  : res.point_info.id,
        phone_upr           : res.point_info.phone_upr,
        is_active           : res.point_info.is_active,
        phone_man           : res.point_info.phone_man,
        count_tables        : res.point_info.count_tables,
        cafe_handle_close   : res.point_info.cafe_handle_close,
        cook_common_stol    : res.point_info.cook_common_stol,
        summ_driver         : res.point_info.summ_driver,
        zone_list           : res.point_zone,
        add_time_list       : res.add_time_list,
        dop_time_list       : res.dop_time_list
     })

      setTimeout( () => {
        console.log('zone', this.state.zone_list);
        console.log('add_time_list', this.state.add_time_list);
      }, 300 )
  }

  // смена зоны
  changeZone(event){
    console.log('changeZone');
    this.setState({
      zone_id:  event.target.value 
    })
  }

  // сохранение зоны
  async saveZone() {
      console.log('saveZone');
      if(confirm('Вы действительное хотите сохранить данные?')){

        let data = {
            zone_list: this.state.zone_list,
        };
        console.log('data=', data);

        let res = await this.getData('stop_zone', data);
        if (res.st === false) {
          alert(res.text)
        } else {
            console.log('ok');
              this.setState({ 
                modalStopZone: false, 
              })
        }

      }
  }

  closeModalCafe(){
    this.setState({ modalStopReason: false });

    // если не выбрали причину закрытия кафе, возвращем галку Кафе работает
    if( this.state.is_сlosed_overload == false &&
        this.state.is_сlosed_technic == false  &&
        this.state.comment == ''  ){
          this.setState({
            is_active: true
          })  
      }

      this.setState({
        is_сlosed_overload  : 0,
        is_сlosed_technic   : 0,
        comment             : '',
      }) 

  }

  // Cтоп кафе
  async stopCafe(){
    if(confirm('Вы действительное хотите сохранить данные?')){

      let data = {
        point_id            : this.state.point_id,
        is_сlosed_overload  : this.state.is_сlosed_overload ? 1 : 0 , 
        is_сlosed_technic   : this.state.is_сlosed_technic  ? 1 : 0 ,  
        comment             : this.state.comment 
      } 
      console.log('stopCafe ', data);

      let res = await this.getData('stop_cafe', data);

      if (res.st === false) {
        alert(res.text)
      } else {
          this.setState({ 
              modalStopReason: false, 
          })
          alert('Данные успешно сохранены!');
      }
    }
  }

  async saveAddTime() {
    if(confirm('Вы действительное хотите сохранить данные?')){

      let data = {
        nal_zone_id : this.state.nal_zone_id,
        add_time_id : this.state.add_time_id,
        time_start  : this.state.time_start,
        time_end    : this.state.time_end,
      };
     
      console.log('saveAddTime ', data);

      let res = await this.getData('add_time', data);

      if (res.st === false) {
        alert(res.text)
      } else {
          this.closeAddTime();
          this.getPoint();
          alert('Данные успешно сохранены!');
        }
    }
  }
  

  // очищаем форму добавления времени
  closeAddTime(){
      this.setState({ 
        modalAddTime: false,
        time_start    : '17:00',
        time_end      : '17:30',
        add_time_id   : 0,
       });
      
  } 

  render(){
    return (
      <>
        <Backdrop style={{ zIndex: 99 }} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>
    
        <Dialog
          open={this.state.modalStopReason}
                onClose={this.closeModalCafe.bind(this)  }
        >
          <DialogTitle>Причина закрытия кафе</DialogTitle>
          <DialogContent style={{ paddingTop: 10 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                     <MyCheckBox label='Закрыто из-за большого количества заказов' value={this.state.is_сlosed_overload == 1 ? true : false} func={this.changeChekBox.bind(this, 'is_сlosed_overload')} />
                </Grid>

                <Grid item xs={12} sm={6}>
                     <MyCheckBox label='Закрыто по техническим причинам'          value={this.state.is_сlosed_technic == 1 ? true : false}  func={this.changeChekBox.bind(this, 'is_сlosed_technic')} />
                </Grid>
               {this.state.showComment ? 
                  <Grid item xs={12} sm={12} >
                      <MyTextInput value={this.state.comment} func={(event) => { this.setState({ comment: event.target.value }) }} label='Другое'  />
                  </Grid>
                : null}
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button color="primary" onClick={this.stopCafe.bind(this)}  >Сохранить</Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.modalStopZone}
               onClose={() => { this.setState({ modalStopZone: false }) } }
        >
          <DialogTitle>Поставить зону на стоп</DialogTitle>
          <DialogContent style={{ paddingTop: 10 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  { this.state.zone_list.map((item, key) =>
                      <MyCheckBox key={key} label={item.name} value={parseInt(item.is_active) == 1 ? true : false} func={this.changeChekBoxZone.bind(this, 'zone_id', key)} />
                  )} 
                </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button color="primary" onClick={this.saveZone.bind(this)} >Сохранить</Button>
          </DialogActions>
        </Dialog>


        <Dialog
          open={this.state.modalAddTime}
          onClose={this.closeAddTime.bind(this)  }   
        >
          <DialogTitle>Доп время для курьера</DialogTitle>
          <DialogContent style={{ paddingTop: 10 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <MySelect data={this.state.zone_list} value={this.state.nal_zone_id} func={(event) => { this.setState({ nal_zone_id: event.target.value }) }} label='Зона' />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <MySelect data={this.state.add_time_list} value={this.state.add_time_id} func={(event) => { this.setState({ add_time_id: event.target.value }) }} label='Доп время, мин' />
                </Grid>
                <Grid item xs={6} sm={6}>
                    <MyTimePicker label="Время начала" value={this.state.time_start} func={(event) => { this.setState({ time_start: event.target.value }) }}  />
                </Grid>
                  <Grid item xs={6} sm={6}>
                    <MyTimePicker label="Время окончания" value={this.state.time_end}   func={(event) => { this.setState({ time_end: event.target.value }) }}  />
                </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button color="primary" onClick={this.saveAddTime.bind(this)}  >Поставить</Button>
          </DialogActions>
        </Dialog>
 

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
              <h1>{this.state.module_name}</h1>
          </Grid>

          <Grid item xs={12} sm={6}>
              <MySelect data={this.state.points_list} value={this.state.point_id} func={this.changePoint.bind(this)} label='Точка' />
          </Grid>

          <Grid item xs={12} sm={12}>
              <MySelect data={this.state.tables} value={this.state.count_tables} func={(event) => { this.setState({ name: event.target.value }) } }  label='Количество столов сборки' />
          </Grid> 

          <Grid item xs={12} sm={4}>
              <MyCheckBox label='Общий стол' value={this.state.cook_common_stol == 1 ? true : false} func={this.changeChekBox.bind(this, 'cook_common_stol')} />
          </Grid>

          <Grid item xs={12} sm={4}>
              <MyCheckBox  label='Кафе работает' value={this.state.is_active == 1 ? true : false}  func={this.changeChekBox.bind(this, 'is_active')} />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Button color="primary" onClick={this.stopZone.bind(this)}>Поставить зону на стоп</Button>
          </Grid>

          <Grid item xs={12} sm={6}>
              <MyTextInput value={this.state.phone_upr} func={(event) => { this.setState({ phone_upr: event.target.value }) } } label='Телефон управляющего' />
          </Grid>   

          <Grid item xs={12} sm={6}>
              <MyTextInput value={this.state.phone_man} func={(event) => { this.setState({ phone_man: event.target.value }) } } label='Телефон менеджера' />
          </Grid> 

          <Grid item xs={12} sm={6}>
              <MyTextInput value={this.state.summ_driver} func={(event) => { this.setState({ summ_driver: event.target.value }) } } label='Максимальная сумма нала для курьера' />
          </Grid> 
          
          <Grid item xs={12} sm={6}>
            <Button color="primary" onClick={this.addTimeDelivery.bind(this)}>Добавить время на доставку</Button>
          </Grid> 

          <Grid item xs={12} sm={6}>
            <Button color="primary" variant="contained" onClick={this.save.bind(this)}>Сохранить</Button>
          </Grid>   
          <div style={{width:'100%', overflow: 'scroll' }} >          
            <Table >
                  <TableHead>
                    <TableRow>
                      <TableCell>Зона</TableCell>
                      <TableCell>Промежуток</TableCell>
                      <TableCell>Время доставки</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                  { this.state.dop_time_list.map( (item, key) =>
                      <TableRow key={key}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.time_start} - {item.time_end}</TableCell>
                        <TableCell>{item.time_dev} мин.</TableCell>
                      </TableRow>
                    ) }
                </TableBody>
            </Table>
          </div>              
        </Grid>
      </>
    )
  }
}

export function СafeUprEdit() {
  return (
    <СafeUprEdit_ />
  );
}