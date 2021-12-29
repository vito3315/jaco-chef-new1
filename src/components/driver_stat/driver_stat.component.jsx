import React from 'react';
import { useHistory } from "react-router-dom";

import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableFooter from '@mui/material/TableFooter';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { MySelect, MyTextInput, MyDaterange } from '../../stores/elements';

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

class DriverStat_ extends React.Component {
  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
      history: this.props.history,
      module: 'driver_stat',
      module_name: '',
      is_load: false,
      
      points: [],
      point: '0',
      
      date_start: formatDate(new Date()),
      date_end: formatDate(new Date()),
      rangeDate: [formatDate(new Date()), formatDate(new Date())],

      modalDialog: false,

      drive_stat_full: [],
      drive_stat_date: null,
      summ: 0,
      choose_driver_id: 0,
      check_cash: 0
    };
  }
  
  async componentDidMount(){
    
    let data = await this.getData('get_all');
    
    console.log( data )
    
    this.setState({
      points: data.points,
      point: data.points[0].id,
      module_name: data.module_info.name,
    })
    
    document.title = data.module_info.name;
    
    setTimeout( () => {
      this.updateData();
    }, 50 )
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
    });
  }
   
  async updateData(){
    let data = {
      point_id: this.state.point,
      date_start: this.state.rangeDate[0],
      date_end: this.state.rangeDate[1],
    };
    
    let res = await this.getData('get_data', data);
    
    console.log( res )
    
    this.setState({
      drive_stat_full: res.drive_stat_full,
      drive_stat_date: res.stat_drive_date
    })
  }
  
  changeDateRange(data){
    let dateStart = data[0] ? formatDate(data[0]) : '';
    let dateEnd = data[1] ? formatDate(data[1]) : '';
    
    this.setState({
      rangeDate: [dateStart, dateEnd]
    })
  }

  changePoint(event){
    let data = event.target.value;
    
    this.setState({
      point: data
    })
  }

  giveCash(driver_id, check_cash){
    this.setState({
      modalDialog: true,
      choose_driver_id: driver_id,
      check_cash: check_cash
    })
  }

  changeSumm(event){
    this.setState({
      summ: event.target.value,
    })
  }

  async saveGivePrice(){

    if( parseInt( this.state.summ ) > parseInt( this.state.check_cash ) ){
      alert('Нельзя сдать денег больше, чем есть у курьера');
      return;
    }


    let data = {
      point_id: this.state.point,
      price: this.state.summ,
      driver_id: this.state.choose_driver_id,
    };
    
    let res = await this.getData('save_give', data);

    console.log( res )

    if( res['st'] == true ){
      this.setState({
        modalDialog: false,
        check_cash: 0,
        choose_driver_id: 0,
        summ: 0
      })

      this.updateData();
    }else{
      alert(res['text'])
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
          onClose={ () => { this.setState({ modalDialog: false, check_cash: 0, choose_driver_id: 0, summ: 0 }) } }
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>Какую сумму сдает курьер</DialogTitle>
          <DialogContent style={{ paddingBottom: 10, paddingTop: 10 }}>
            
            <MyTextInput label="" value={this.state.summ} func={this.changeSumm.bind(this)} />

          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.saveGivePrice.bind(this)}>Сохранить</Button>
          </DialogActions>
        </Dialog>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>
          
          <Grid item xs={12} sm={6} className="MyDaterange">
            <MyDaterange startText="Дата от" endText="Дата до" value={this.state.rangeDate} func={ this.changeDateRange.bind(this) } />
          </Grid>

          <Grid item xs={12} sm={6}>
            <MySelect classes={this.state.classes} data={this.state.points} value={this.state.point} func={ this.changePoint.bind(this) } label='Точка' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" onClick={this.updateData.bind(this)}>Обновить данные</Button>
          </Grid>
        
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                
                <TableHead>
                  <TableRow>
                    <TableCell>Имя</TableCell>
                    <TableCell>Вся сумма</TableCell>
                    <TableCell>Сумма по налу</TableCell>
                    <TableCell>Сумма по безналу</TableCell>
                    <TableCell>Кол-во по налу</TableCell>
                    <TableCell>Кол-во по безналу</TableCell>
                    <TableCell>К сдаче</TableCell>

                    <TableCell>Сдал за период</TableCell>

                    <TableCell>Довозы</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>Заказы</TableCell>
                    <TableCell>Заработал</TableCell>
                    <TableCell>Налички на руках</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  
                  { this.state.drive_stat_full.map( (item, key) =>
                    <TableRow key={key}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.full_sum}</TableCell>
                      <TableCell>{item.full_cash}</TableCell>
                      <TableCell>{item.full_bank}</TableCell>
                      <TableCell>{item.count_cash}</TableCell>
                      <TableCell>{item.count_bank}</TableCell>
                      <TableCell>{item.sdacha}</TableCell>

                      <TableCell>{item.give_by_date}</TableCell>

                      <TableCell>{item.dop_price ? item.dop_price : 0}</TableCell>
                      <TableCell>{item.my_price ? item.my_price : 0}</TableCell>
                      <TableCell>{item.my_orders}</TableCell>
                      <TableCell>{item.my}</TableCell>
                      <TableCell>{item.ost_cash}</TableCell>
                      <TableCell>
                        <Button variant="contained" onClick={this.giveCash.bind(this, item.driver_id, item.ost_cash)}>Сдать</Button>
                      </TableCell>
                    </TableRow>
                  ) }
                
                </TableBody>
              
              </Table>
            </TableContainer>
          </Grid>

          { this.state.drive_stat_date == null ? null :
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table>
                  
                  <TableHead>
                    <TableRow>
                      <TableCell>Курьер</TableCell>

                      { this.state.drive_stat_date.orders.map( (item, key) =>
                        <TableCell key={key} colSpan={4} style={{textAlign: 'center'}}>{item.date}</TableCell>
                      ) }
                    </TableRow>
                    <TableRow>
                      <TableCell></TableCell>

                      { this.state.drive_stat_date.orders.map( (item, key) =>
                        <>
                          <TableCell key={key+'_1'} style={{textAlign: 'center'}}>Наличка</TableCell>
                          <TableCell key={key+'_2'} style={{textAlign: 'center'}}>Безнал</TableCell>
                          <TableCell key={key+'_3'} style={{textAlign: 'center'}}>Сдача</TableCell>
                          <TableCell key={key+'_4'} style={{textAlign: 'center'}}>Заработал</TableCell>
                        </>
                      ) }

                    </TableRow>
                  </TableHead>

                  <TableBody>
                    
                    { this.state.drive_stat_date.unic_users.map( (item, key) =>
                      <TableRow key={key}>
                        <TableCell style={{borderRight: '1px solid #eee'}}>{item.short_name}</TableCell>

                        { this.state.drive_stat_date.orders.map( function(order, order_k){

                          let check = false,
                            data = {};
    
                          order['new_users'].map(function(it, k){
                            if(parseInt(it['driver_id']) == parseInt(item['driver_id']) && it['date'] == order['date']){
                              check = true;
                              data = it;
                            }
                          })

                          if(check == false){
                            return (
                              <TableCell key={order_k} colSpan={4} style={{borderRight: '1px solid #eee'}}></TableCell>
                            )
                          }else{
                            return (
                              <>
                                <TableCell key={order_k+'_1'} style={{textAlign: 'center'}}>{data.full_cash}</TableCell>
                                <TableCell key={order_k+'_2'} style={{textAlign: 'center'}}>{data.full_bank}</TableCell>
                                <TableCell key={order_k+'_3'} style={{textAlign: 'center'}}>{data.sdacha}</TableCell>
                                <TableCell key={order_k+'_4'} style={{borderRight: '1px solid #eee', textAlign: 'center'}}>{data.my}</TableCell>
                              </>
                            )
                          }

                        })}

                      </TableRow>
                    )}
                  </TableBody>
                
                  <TableFooter>
                    
                    <TableRow>
                      <TableCell style={{borderRight: '1px solid #eee'}}></TableCell>

                      { this.state.drive_stat_date.orders.map( (item, key) =>
                        <>
                          <TableCell key={key+'_1'} style={{textAlign: 'center'}}>{item.full_cash}</TableCell>
                          <TableCell key={key+'_2'} style={{textAlign: 'center'}}>{item.full_bank}</TableCell>
                          <TableCell key={key+'_3'} style={{textAlign: 'center'}}>{item.sdacha}</TableCell>
                          <TableCell key={key+'_4'} style={{borderRight: '1px solid #eee', textAlign: 'center'}}>{item.my}</TableCell>
                        </>
                      )}
                        

                    </TableRow>
                    
                  </TableFooter>

                </Table>
              </TableContainer>
            </Grid>
          }

          
        </Grid>
      </>
    )
  }
}

export function DriverStat () {
  const classes = useStyles();
  let history = useHistory();
  
  return (
    <DriverStat_ classes={classes} history={history} />
  );
}