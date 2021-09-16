import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
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

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import CloseIcon from '@material-ui/icons/Close';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { MySelect, MyCheckBox, MyTimePicker } from '../../stores/elements';
import { Typography } from '@material-ui/core';

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
      
      calendar: [],
      modalDialog: false,
      
      chooseDayHoly: '',
      events: [],
      chooseEvent: 0,
      
      eventPoint1: 0,
      everyYear1: false,
      timeStart2: '10:00',
      timeEnd2: '21:30',
      
      expanded: '',
      dayEvents: []
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
      m: this.state.mounth,
      y: this.state.year,
      point_id: this.state.point
    };
    
    let res = await this.getData('get_calendar', data);
    
    console.log( res )
    
    this.setState({
      calendar: res.year,
    })
  }
  
  async chooseDay(day){
    
    if( day.full_day ){
    
      let data = {
        date: day.full_day,
        point_id: this.state.point
      };
      
      let res = await this.getData('get_calendar_day', data);
      
      console.log( 'res', res )
      
      this.setState({
        chooseDay: day,
        chooseDayHoly: res.holy,
        events: res.events,
        dayEvents: res.this_events,
        modalDialog: true
      })
    }
  }
  
  changeEvent(event){
    let data = event.target.value;
    
    this.setState({
      chooseEvent: data
    })
  }
  
  changePoint1(event){
    let data = event.target.value;
    
    this.setState({
      eventPoint1: data
    })
  }
  
  changeEveryYear1(event){
    let data = event.target.checked;
    
    this.setState({
      everyYear1: data
    })
  }
  
  changeTimeStart2(event){
    let data = event.target.value;
    
    this.setState({
      timeStart2: data
    })
  }
  
  changeTimeEnd2(event){
    let data = event.target.value;
    
    this.setState({
      timeEnd2: data
    })
  }
  
  async save(){
    let data = {
      date: this.state.chooseDay.full_day,
      point_id: this.state.eventPoint1,
      event: this.state.chooseEvent,
      every_year: this.state.everyYear1 === true ? 1 : 0,
      
      time_start: this.state.timeStart2,
      time_end: this.state.timeEnd2,
    };
    
    let res = await this.getData('save_event', data);
    
    if( res.st === false ){
      alert(res.text)
    }else{
      this.setState({
        chooseDay: null,
        eventPoint1: 0,
        chooseEvent: 0,
        everyYear1: false,
        timeStart2: '10:00',
        timeEnd2: '10:00',
        modalDialog: false
      })
      
      setTimeout( () => {
        this.updateData();
      }, 300 )
    }
  }
  
  handleChange(data){
    this.setState({
      expanded: data
    })
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
          <DialogTitle id="alert-dialog-title">{this.state.chooseDay ? this.state.chooseDay.full_day : ''}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              
              <Grid container spacing={3}>
                
                {this.state.chooseDayHoly.length == 0 ? null :
                  <Grid item xs={12} sm={12}>
                    <Typography component="span">{this.state.chooseDayHoly}</Typography>
                  </Grid>
                }
                
                <Grid item xs={12} sm={12}>
                  <MySelect classes={this.state.classes} data={this.state.events} value={this.state.chooseEvent} func={ this.changeEvent.bind(this) } label='Событие' />
                </Grid>
                
                <Grid item xs={12} sm={12}>
                  <MySelect classes={this.state.classes} data={this.state.points} value={ this.state.eventPoint1 } func={ this.changePoint1.bind(this) } label='Точка' />
                </Grid>
                
                { parseInt(this.state.chooseEvent) !== 2 ? null :
                  <>
                    <Grid item xs={6} sm={6}>
                      <MyTimePicker classes={this.state.classes} value={ this.state.timeStart2 } func={ this.changeTimeStart2.bind(this) } label='Время начала работы' />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <MyTimePicker classes={this.state.classes} value={ this.state.timeEnd2 } func={ this.changeTimeEnd2.bind(this) } label='Время окончания работы' />
                    </Grid>
                  </>
                }
                
                <Grid item xs={12} sm={12}>
                  <MyCheckBox classes={this.state.classes} value={ this.state.everyYear1 } func={ this.changeEveryYear1.bind(this) } label='Каждый год' />
                </Grid>
                
              </Grid>
              
              <List component="nav">
                { this.state.dayEvents.map( (item, key) => 
                  <ListItem key={key}>
                    <ListItemText primary={item.title} />
                    <CloseIcon color="primary" style={{ cursor: 'pointer' }} />
                  </ListItem>
                )}
              </List>
              
              
              
              
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={ this.save.bind(this) } color="primary" autoFocus>Сохранить</Button>
          </DialogActions>
        </Dialog>
        
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
        
          
          
          
          <Grid container direction="row" justifyContent="center" style={{ paddingTop: 20 }}>
            
            { this.state.calendar.map( (item, key) =>
            
              <Grid item xs={12} sm={4} key={key} style={{ padding: 20 }}>
                <h1 style={{ textAlign: 'center' }}>{ item[0][0].mounth }</h1>
                <TableContainer component={Paper}>
                  <Table aria-label="a dense table" style={{ overflow: 'hidden' }}>
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
                      
                      { item.map( (mounth, m_key) =>
                        <TableRow key={m_key}>
                          { mounth.map( (day, k) =>
                            <TableCell 
                              key={k} 
                              onClick={ this.chooseDay.bind(this, day) } 
                              
                              style={{ color: day.holy ? '#c03' : '#000' }}
                              
                              className={ day.event ? this.state.classes.customCel : this.state.classes.tableCel }
                            > { day.day } </TableCell>
                          ) }
                        </TableRow>
                      ) }
                      
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            )}
            
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