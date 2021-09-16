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
  tableCel: {
    width: 100,
    height: 100,
    textAlign: 'center'
  },
  tableCelHead: {
    textAlign: 'center'
  }
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
      year: '0',
      
      days: [],
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
      mounth: data.this_m,
      years: data.years,
      year: data.this_y,
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
  
  async getCalendar(){
    //get_calendar
  }
  
  async updateData(){
    let data = {
      m: this.state.mounth,
      y: this.state.year
    };
    
    let res = await this.getData('get_calendar', data);
    
    console.log( res )
    
    this.setState({
      days: res.days,
    })
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
          
          <Grid item xs={12} sm={3}>
            <MySelect classes={this.state.classes} data={this.state.points} value={this.state.point} func={ this.changePoint.bind(this) } label='Точка' />
          </Grid>
          <Grid item xs={12} sm={3}>
            <MySelect classes={this.state.classes} data={this.state.mounths} value={this.state.mounth} func={ this.changeMounth.bind(this) } label='Месяц' />
          </Grid>
          <Grid item xs={12} sm={3}>
            <MySelect classes={this.state.classes} data={this.state.years} value={this.state.year} func={ this.changeYear.bind(this) } label='Год' />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button variant="contained" onClick={this.updateData.bind(this)}>Обновить данные</Button>
          </Grid>
        
          
          
          
          <Grid container direction="row" justifyContent="center" alignItems="center" style={{ paddingTop: 20 }}>
            
            <TableContainer component={Paper} style={{ width: 700 }}>
              <Table aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell className={this.state.classes.tableCelHead}>Пн</TableCell>
                    <TableCell className={this.state.classes.tableCelHead}>Вт</TableCell>
                    <TableCell className={this.state.classes.tableCelHead}>Ср</TableCell>
                    <TableCell className={this.state.classes.tableCelHead}>Чт</TableCell>
                    <TableCell className={this.state.classes.tableCelHead}>Пт</TableCell>
                    <TableCell className={this.state.classes.tableCelHead}>Сб</TableCell>
                    <TableCell className={this.state.classes.tableCelHead}>Вс</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  
                  { this.state.days.map( (item, key) =>
                    <TableRow key={key}>
                      <TableCell className={this.state.classes.tableCel}> { item.dow == 1 ? item.day : '' } </TableCell>
                      <TableCell className={this.state.classes.tableCel}> { item.dow == 2 ? item.day : '' } </TableCell>
                      <TableCell className={this.state.classes.tableCel}> { item.dow == 3 ? item.day : '' } </TableCell>
                      <TableCell className={this.state.classes.tableCel}> { item.dow == 4 ? item.day : '' } </TableCell>
                      <TableCell className={this.state.classes.tableCel}> { item.dow == 5 ? item.day : '' } </TableCell>
                      <TableCell className={this.state.classes.tableCel}> { item.dow == 6 ? item.day : '' } </TableCell>
                      <TableCell className={this.state.classes.tableCel}> { item.dow == 7 ? item.day : '' } </TableCell>
                    </TableRow>
                  ) }
                  
                  
                    <TableRow >
                      <TableCell className={this.state.classes.tableCel}>Пн</TableCell>
                      <TableCell className={this.state.classes.tableCel}>Вт</TableCell>
                      <TableCell className={this.state.classes.tableCel}>Ср</TableCell>
                      <TableCell className={this.state.classes.tableCel}>Чт</TableCell>
                      <TableCell className={this.state.classes.tableCel}>Пт</TableCell>
                      <TableCell className={this.state.classes.tableCel}>Сб</TableCell>
                      <TableCell className={this.state.classes.tableCel}>Вс</TableCell>
                    </TableRow>
                    <TableRow >
                      <TableCell className={this.state.classes.tableCel}>Пн</TableCell>
                      <TableCell className={this.state.classes.tableCel}>Вт</TableCell>
                      <TableCell className={this.state.classes.tableCel}>Ср</TableCell>
                      <TableCell className={this.state.classes.tableCel}>Чт</TableCell>
                      <TableCell className={this.state.classes.tableCel}>Пт</TableCell>
                      <TableCell className={this.state.classes.tableCel}>Сб</TableCell>
                      <TableCell className={this.state.classes.tableCel}>Вс</TableCell>
                    </TableRow>
                    <TableRow >
                      <TableCell className={this.state.classes.tableCel}>Пн</TableCell>
                      <TableCell className={this.state.classes.tableCel}>Вт</TableCell>
                      <TableCell className={this.state.classes.tableCel}>Ср</TableCell>
                      <TableCell className={this.state.classes.tableCel}>Чт</TableCell>
                      <TableCell className={this.state.classes.tableCel}>Пт</TableCell>
                      <TableCell className={this.state.classes.tableCel}>Сб</TableCell>
                      <TableCell className={this.state.classes.tableCel}>Вс</TableCell>
                    </TableRow>
                    <TableRow >
                      <TableCell className={this.state.classes.tableCel}>Пн</TableCell>
                      <TableCell className={this.state.classes.tableCel}>Вт</TableCell>
                      <TableCell className={this.state.classes.tableCel}>Ср</TableCell>
                      <TableCell className={this.state.classes.tableCel}>Чт</TableCell>
                      <TableCell className={this.state.classes.tableCel}>Пт</TableCell>
                      <TableCell className={this.state.classes.tableCel}>Сб</TableCell>
                      <TableCell className={this.state.classes.tableCel}>Вс</TableCell>
                    </TableRow>
                  
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