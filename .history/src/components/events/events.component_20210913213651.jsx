import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { MySelect, MyCheckBox } from '../../stores/elements';

const queryString = require('query-string');

const useStyles = makeStyles((theme) => ({
  formControl: {
    //margin: theme.spacing(1),
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

class Events_ extends React.Component {
  constructor(props) {
    super(props);
        
    this.state = {
      classes: this.props.classes,
      history: this.props.history,
      module: 'events',
      module_name: '',
      is_load: false,
      
      points: [],
      point: '0',
      mounth: '0',
      mounths: [],
      years: [],
      years: '0',
      
      
      showReady: false,
      read: [],
      onstol: [],
      ordersQueue: []
    };
  }
  
  async componentDidMount(){
    
    let data = await this.getData('get_all');
    
    console.log( data )
    
    this.setState({
      points: data.points,
      point: data.points[0].id,
      module_name: data.module_info.name,
      mounths: data.mounth,
      mounth: data.mounth[0].id,
      years: data.years,
      year: data.years[0].id,
    })
    
    document.title = data.module_info.name;
    
    setTimeout( () => {
      this.updateData();
    }, 100 )
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
   
  changePoint(event){
    let data = event.target.value;
    
    this.setState({
      point: data
    })
    
    setTimeout( () => {
      this.updateData();
    }, 50 )
  }
  
  changeMounth(event){
    let data = event.target.value;
    
    this.setState({
      mounth: data
    })
    
    setTimeout( () => {
      //this.updateData();
    }, 50 )
  }
  
  changeYear(event){
    let data = event.target.value;
    
    this.setState({
      year: data
    })
  }
  
  changeCheckOrders(event){
    let data = event.target.checked;
    
    this.setState({
      showReady: data
    })
  }
  
  async updateData(){
    let data = {
      point_id: this.state.point,
      showReady: this.state.showReady === true ? 1 : 0
    };
    
    let res = await this.getData('get_orders', data);
    
    this.setState({
      read: res.read,
      onstol: res.onstol,
      ordersQueue: res.prestol_new
    })
  }
  
  render(){
    
    /*
    <Grid item xs={12} sm={3}>
            <MySelect classes={this.state.classes} data={this.state.years} value={this.state.year} func={ this.changeYear.bind(this) } label='Месяц' />
          </Grid>
    */
    
    return (
      <>
        <Backdrop className={this.state.classes.backdrop} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>
          
          <Grid item xs={12} sm={3}>
            <MySelect classes={this.state.classes} data={this.state.points} value={this.state.point} func={ this.changePoint.bind(this) } label='Точка' />
          </Grid>
          <Grid item xs={12} sm={3}>
            <MySelect classes={this.state.classes} data={this.state.mounths} value={this.state.mounth} func={ this.changeMounth.bind(this) } label='Месяц' />
          </Grid>
          
          <Grid item xs={12} sm={3}>
            <Button variant="contained" onClick={this.updateData.bind(this)}>Обновить данные</Button>
          </Grid>
          <Grid item xs={12} sm={12}>
            <MyCheckBox classes={this.state.classes} value={this.state.showReady} func={ this.changeCheckOrders.bind(this) } label='Показывать готовые' />
          </Grid>
            
          
          
          
          <Grid item xs={12} sm={12}>
            
            <TableContainer component={Paper}>
              <Table aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Тип</TableCell>
                    <TableCell>Время заказа</TableCell>
                    <TableCell>Время предзакза</TableCell>
                    
                    <TableCell>Время выхода на стол</TableCell>
                    <TableCell>Во сколько собрали</TableCell>
                    <TableCell>Закрыли</TableCell>
                    
                    <TableCell>Приготовили</TableCell>
                    <TableCell>Отдали</TableCell>
                    <TableCell>Обещали</TableCell>
                    
                    <TableCell>Статус</TableCell>
                    <TableCell>Стол</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  
                  {this.state.read.map( (item, key) => (
                    <TableRow key={key}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.type_order}</TableCell>
                      <TableCell>{ parseInt(item.preorder) == 1 ? '' : item.date_time_order }</TableCell>
                      <TableCell>{ parseInt(item.preorder) == 1 ? item.date_time_preorder_ : '' }</TableCell>
                      
                      <TableCell>{item.unix_start_stol_or}</TableCell>
                      <TableCell>{item.give_data_time_}</TableCell>
                      <TableCell>{item.close_date_time_order}</TableCell>
                      
                      <TableCell style = {{backgroundColor: parseInt(item.type_) == 1 ? '' : item.color}}>{item.time_}</TableCell>
                      <TableCell style = {{backgroundColor: parseInt(item.type_) != 1 ? '' : item.color}}>{item.test_time}</TableCell>
                      <TableCell>{ parseInt(item.preorder) == 0 ? item.unix_time_to_client : '' }</TableCell>
                      
                      <TableCell>{item.status}</TableCell>
                      <TableCell>{item.stol_sborki}</TableCell>
                    </TableRow>
                  ))}
                  
                  {this.state.onstol.map( (item, key) => (
                    <TableRow key={key} style = {{backgroundColor: 'yellow'}}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.type_order}</TableCell>
                      <TableCell>{ parseInt(item.preorder) == 1 ? '' : item.date_time_order }</TableCell>
                      <TableCell>{ parseInt(item.preorder) == 1 ? item.date_time_preorder_ : '' }</TableCell>
                      
                      <TableCell>{item.unix_start_stol_or}</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell>{ parseInt(item.preorder) == 0 ? item.unix_time_to_client : '' }</TableCell>
                      
                      <TableCell>{item.status}</TableCell>
                      <TableCell>{item.stol_sborki}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            
            <TableContainer component={Paper}>
              <Table aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Пред</TableCell>
                    <TableCell>Время оформления</TableCell>
                    <TableCell>Время выхода на стол</TableCell>
                    <TableCell>Время закрытия</TableCell>
                    <TableCell>Обещали</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  
                  {this.state.ordersQueue.map( (item, key) => (
                    <TableRow key={key}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{ parseInt(item.is_preorder) == 1 ? item.date_time_preorder : '' }</TableCell>
                      <TableCell>{ parseInt(item.is_preorder) == 0 ? item.date_time_order : '' }</TableCell>
                      
                      <TableCell>{item.time_start_order}</TableCell>
                      <TableCell>{item.time_end_order}</TableCell>
                      
                      <TableCell>{ parseInt(item.is_preorder) == 0 ? item.unix_time_to_client : '' }</TableCell>
                    </TableRow>
                  ))}
                  
                </TableBody>
              </Table>
            </TableContainer>
            
          </Grid>
        </Grid>
      </>
    )
  }
}

export function Events () {
  const classes = useStyles();
  let history = useHistory();
  
  return (
    <Events_ classes={classes} history={history} />
  );
}